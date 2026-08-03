import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import Stripe from 'stripe';

const app = express();
const port = Number(process.env.PORT || 5000);
const dataDir = path.join(process.cwd(), 'data');
const usersFile = path.join(dataDir, 'users.json');
const bookingsFile = path.join(dataDir, 'bookings.json');
const passwordResetsFile = path.join(dataDir, 'password-resets.json');
const passwordResetAttempts = new Map();
const configuredFrontendOrigins = (process.env.FRONTEND_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const frontendOrigins = new Set([
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...configuredFrontendOrigins,
]);

app.disable('x-powered-by');
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const paypalBaseUrl = process.env.PAYPAL_ENVIRONMENT === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

app.use(cors({
  origin(origin, callback) {
    if (!origin || frontendOrigins.has(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS'));
  },
}));

const authRateLimits = new Map();
app.use('/api/auth', (req, res, next) => {
  const key = `${req.ip}:${req.path}`;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const limit = 30;
  const current = authRateLimits.get(key);
  const entry = !current || current.resetAt <= now ? { count: 0, resetAt: now + windowMs } : current;
  entry.count += 1;
  authRateLimits.set(key, entry);
  if (entry.count > limit) {
    res.setHeader('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
    return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
  }
  return next();
});

// Stripe requires the unparsed request body to verify the webhook signature.
app.post('/api/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(503).json({ error: 'Stripe webhook is not configured' });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    return res.status(400).send(`Webhook signature verification failed: ${error.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      console.info('Stripe Checkout completed:', event.data.object.id);
      break;
    case 'payment_intent.succeeded':
      console.info('Stripe payment succeeded:', event.data.object.id);
      break;
    case 'payment_intent.payment_failed':
      console.warn('Stripe payment failed:', event.data.object.id);
      break;
    default:
      console.info('Unhandled Stripe event:', event.type);
  }

  return res.json({ received: true });
});

app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    stripeConfigured: Boolean(stripe),
    stripeWebhookConfigured: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    paypalConfigured: Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET),
    authConfigured: Boolean(process.env.ADMIN_ALLOWED_EMAIL && process.env.AUTH_TOKEN_SECRET),
  });
});

function normalizeIdentifier(value) {
  return String(value || '').trim().toLowerCase();
}

function assertPassword(value) {
  const password = String(value || '');
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
  return password;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, passwordHash) {
  const [salt, expectedHash] = String(passwordHash || '').split(':');
  if (!salt || !expectedHash) return false;
  const actualHash = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHash, 'hex');
  return expected.length === actualHash.length && crypto.timingSafeEqual(expected, actualHash);
}

function signToken(payload) {
  const secret = process.env.AUTH_TOKEN_SECRET;
  if (!secret) throw new Error('Auth token secret is not configured');
  const body = Buffer.from(JSON.stringify({
    ...payload,
    exp: Date.now() + (1000 * 60 * 60 * 8),
  })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('base64url');
  return `${body}.${signature}`;
}

function verifyToken(token) {
  const secret = process.env.AUTH_TOKEN_SECRET;
  if (!secret) throw new Error('Auth token secret is not configured');
  const [body, signature] = String(token || '').split('.');
  if (!body || !signature) return null;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('base64url');
  const actual = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null;
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  if (!payload.exp || payload.exp < Date.now()) return null;
  return payload;
}

function getBearerToken(req) {
  const header = String(req.headers.authorization || '');
  return header.startsWith('Bearer ') ? header.slice(7) : '';
}

async function readUsers() {
  try {
    const data = await fs.readFile(usersFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeUsers(users) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
}

async function readPasswordResets() {
  try {
    const data = await fs.readFile(passwordResetsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writePasswordResets(resets) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(passwordResetsFile, JSON.stringify(resets, null, 2));
}

function makeResetCode() {
  return String(crypto.randomInt(100000, 1000000));
}

async function sendPasswordResetEmail({ to, code }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PASSWORD_RESET_FROM;
  if (!apiKey || !from) {
    throw new Error('Password reset email is not configured yet');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: 'Your MoveVan Pro password reset code',
      text: `Your MoveVan Pro password reset code is ${code}. It expires in 15 minutes. If you did not request this, you can ignore this email.`,
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || 'Unable to send the password reset email');
  }
}

async function readBookings() {
  try {
    const data = await fs.readFile(bookingsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeBookings(bookings) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(bookingsFile, JSON.stringify(bookings, null, 2));
}

function requireDispatcher(req, res) {
  const tokenPayload = verifyToken(getBearerToken(req));
  if (!tokenPayload || tokenPayload.role !== 'dispatcher') {
    res.status(401).json({ error: 'Admin sign-in is required' });
    return null;
  }
  return tokenPayload;
}

function makeBookingId(existingBookings) {
  const existingIds = new Set(existingBookings.map((booking) => booking.id));
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const id = `MVP-${crypto.randomBytes(9).toString('base64url').toUpperCase()}`;
    if (!existingIds.has(id)) return id;
  }
  return `MVP-${crypto.randomUUID().replaceAll('-', '').slice(0, 18).toUpperCase()}`;
}

function normalizeBookingForDashboard(booking) {
  const details = booking.bookingDetails || {};
  return {
    id: booking.id,
    type: booking.serviceType || 'moving',
    customer: booking.customerName || booking.customerEmail || 'Customer',
    date: `${details.moveDate || booking.createdAt?.slice(0, 10) || ''}${details.moveTime ? ` - ${details.moveTime}` : ''}`,
    amount: booking.amount,
    currency: booking.currency || 'GBP',
    status: booking.status || 'Confirmed',
    provider: booking.paymentProvider,
    transactionId: booking.transactionId,
    driver: booking.driver || 'Unassigned',
    location: details.pickup || 'Pickup address not provided',
    bookingDetails: details,
    createdAt: booking.createdAt,
  };
}

function authResponse(user) {
  return {
    token: signToken({ sub: user.id, role: user.role }),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

app.get('/api/auth/me', async (req, res) => {
  try {
    const tokenPayload = verifyToken(getBearerToken(req));
    if (!tokenPayload) return res.status(401).json({ error: 'Please sign in again' });
    const users = await readUsers();
    const user = users.find((candidate) => candidate.id === tokenPayload.sub);
    if (!user) return res.status(401).json({ error: 'Your account is no longer available' });
    return res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    return res.status(401).json({ error: error.message || 'Please sign in again' });
  }
});

app.post('/api/auth/customer/register', async (req, res) => {
  try {
    const email = normalizeIdentifier(req.body.emailOrPhone);
    const password = assertPassword(req.body.password);
    if (!email) return res.status(400).json({ error: 'Email or mobile number is required' });

    const users = await readUsers();
    if (users.some((user) => user.email === email)) {
      return res.status(409).json({ error: 'This customer account already exists' });
    }

    const user = {
      id: `cus_${crypto.randomUUID()}`,
      name: email.includes('@') ? email.split('@')[0] : 'Customer',
      email,
      role: 'customer',
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await writeUsers(users);
    return res.status(201).json(authResponse(user));
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Unable to create account' });
  }
});

app.post('/api/auth/customer/login', async (req, res) => {
  try {
    const email = normalizeIdentifier(req.body.emailOrPhone);
    const password = String(req.body.password || '');
    const users = await readUsers();
    const user = users.find((candidate) => candidate.email === email && candidate.role === 'customer');
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ error: 'Invalid customer email or password' });
    }
    return res.json(authResponse(user));
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Unable to sign in' });
  }
});

app.post('/api/auth/driver/login', async (req, res) => {
  try {
    const email = normalizeIdentifier(req.body.emailOrPhone || req.body.driverId);
    const password = String(req.body.password || '');
    const users = await readUsers();
    const user = users.find((candidate) => candidate.email === email && candidate.role === 'driver');
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ error: 'Invalid driver email or password' });
    }
    return res.json(authResponse(user));
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Unable to sign in' });
  }
});

app.post('/api/auth/team/register', async (req, res) => {
  try {
    const email = normalizeIdentifier(req.body.emailOrPhone || req.body.staffId);
    const password = assertPassword(req.body.password);
    const allowedAdminEmail = normalizeIdentifier(process.env.ADMIN_ALLOWED_EMAIL);

    if (!allowedAdminEmail || !process.env.AUTH_TOKEN_SECRET) {
      return res.status(503).json({ error: 'Admin account creation is not configured' });
    }

    if (email !== allowedAdminEmail) {
      return res.status(403).json({ error: 'This email is not allowed to create the admin account' });
    }

    const users = await readUsers();
    if (users.some((user) => user.role === 'dispatcher')) {
      return res.status(409).json({ error: 'Admin account already exists. Please sign in.' });
    }

    const user = {
      id: 'admin_primary',
      name: 'MoveVan Pro Admin',
      email,
      role: 'dispatcher',
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await writeUsers(users);
    return res.status(201).json(authResponse(user));
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Unable to create admin account' });
  }
});

app.post('/api/auth/team/login', async (req, res) => {
  try {
    const email = normalizeIdentifier(req.body.emailOrPhone || req.body.staffId);
    const password = String(req.body.password || '');
    const users = await readUsers();
    const user = users.find((candidate) => candidate.email === email && candidate.role === 'dispatcher');

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ error: 'Invalid admin email or password' });
    }

    return res.json(authResponse(user));
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Unable to sign in' });
  }
});

app.post('/api/auth/request-password-reset', async (req, res) => {
  try {
    const email = normalizeIdentifier(req.body.emailOrPhone || req.body.email);
    const role = ['dispatcher', 'driver'].includes(req.body.role) ? req.body.role : 'customer';
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Enter the email address used for your MoveVan Pro account' });
    }

    const lastRequestAt = passwordResetAttempts.get(`${role}:${email}`) || 0;
    if (Date.now() - lastRequestAt < 60 * 1000) {
      return res.status(429).json({ error: 'Please wait one minute before requesting another code' });
    }

    const users = await readUsers();
    const user = users.find((candidate) => candidate.email === email && candidate.role === role);
    // Keep the public response the same whether the email exists or not.
    if (user) {
      const code = makeResetCode();
      const resets = (await readPasswordResets()).filter((reset) => (
        reset.expiresAt > Date.now() && reset.userId !== user.id
      ));
      resets.push({
        userId: user.id,
        codeHash: hashPassword(code),
        expiresAt: Date.now() + (15 * 60 * 1000),
        createdAt: new Date().toISOString(),
      });
      await sendPasswordResetEmail({ to: user.email, code });
      await writePasswordResets(resets);
      passwordResetAttempts.set(`${role}:${email}`, Date.now());
    }

    return res.json({ ok: true, message: 'If that account exists, a six-digit reset code has been sent to its email address.' });
  } catch (error) {
    console.error('Password reset request error:', error);
    return res.status(503).json({ error: error.message || 'Unable to send a password reset email' });
  }
});

app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const email = normalizeIdentifier(req.body.emailOrPhone || req.body.email);
    const role = ['dispatcher', 'driver'].includes(req.body.role) ? req.body.role : 'customer';
    const code = String(req.body.code || '').trim();
    const newPassword = assertPassword(req.body.newPassword);
    if (!email || !email.includes('@') || !/^\d{6}$/.test(code)) {
      return res.status(400).json({ error: 'Enter your account email and the six-digit reset code' });
    }

    const users = await readUsers();
    const userIndex = users.findIndex((candidate) => candidate.email === email && candidate.role === role);
    if (userIndex === -1) return res.status(400).json({ error: 'The reset code is invalid or has expired' });

    const resets = await readPasswordResets();
    const resetIndex = resets.findIndex((reset) => (
      reset.userId === users[userIndex].id
      && reset.expiresAt > Date.now()
      && verifyPassword(code, reset.codeHash)
    ));
    if (resetIndex === -1) return res.status(400).json({ error: 'The reset code is invalid or has expired' });

    users[userIndex].passwordHash = hashPassword(newPassword);
    users[userIndex].updatedAt = new Date().toISOString();
    resets.splice(resetIndex, 1);
    await Promise.all([writeUsers(users), writePasswordResets(resets.filter((reset) => reset.expiresAt > Date.now()))]);
    return res.json({ ok: true, message: 'Your password has been reset. You can sign in now.' });
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Unable to reset password' });
  }
});

app.post('/api/auth/change-password', async (req, res) => {
  try {
    const tokenPayload = verifyToken(getBearerToken(req));
    if (!tokenPayload) return res.status(401).json({ error: 'Please sign in again' });

    const currentPassword = String(req.body.currentPassword || '');
    const newPassword = assertPassword(req.body.newPassword);
    const users = await readUsers();
    const index = users.findIndex((user) => user.id === tokenPayload.sub);
    if (index === -1 || !verifyPassword(currentPassword, users[index].passwordHash)) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    users[index].passwordHash = hashPassword(newPassword);
    users[index].updatedAt = new Date().toISOString();
    await writeUsers(users);
    return res.json({ ok: true, message: 'Your password has been changed.' });
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Unable to change password' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const receipt = req.body.receipt || {};
    const verifiedPayment = await verifyPaidReceipt(receipt);
    const bookingDetails = req.body.bookingDetails || {};
    const bookings = await readBookings();
    const existingBooking = bookings.find((booking) => booking.transactionId === verifiedPayment.transactionId);
    if (existingBooking) return res.json({ booking: normalizeBookingForDashboard(existingBooking) });

    const booking = {
      id: makeBookingId(bookings),
      serviceType: String(req.body.serviceType || 'moving').toLowerCase(),
      status: 'Confirmed',
      amount: verifiedPayment.amount,
      currency: verifiedPayment.currency,
      paymentProvider: verifiedPayment.provider,
      transactionId: verifiedPayment.transactionId,
      customerName: req.body.customerName || receipt.customerName || '',
      customerEmail: req.body.customerEmail || '',
      bookingDetails: {
        pickup: bookingDetails.pickup || '',
        dropoff: bookingDetails.dropoff || '',
        vehicle: bookingDetails.vehicle || '',
        movers: Number(bookingDetails.movers || 0),
        moveDate: bookingDetails.moveDate || '',
        moveTime: bookingDetails.moveTime || '',
        durationHours: Number(bookingDetails.durationHours || 0),
      },
      receipt,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    bookings.unshift(booking);
    await writeBookings(bookings);
    return res.status(201).json({ booking: normalizeBookingForDashboard(booking) });
  } catch (error) {
    console.error('Booking save error:', error);
    return res.status(400).json({ error: error.message || 'Unable to save booking' });
  }
});

app.get('/api/bookings/:bookingId', async (req, res) => {
  if (!requireDispatcher(req, res)) return;
  const bookingId = String(req.params.bookingId || '').replace(/^#/, '').toUpperCase();
  const bookings = await readBookings();
  const booking = bookings.find((candidate) => candidate.id.toUpperCase() === bookingId);
  if (!booking) return res.status(404).json({ error: 'Booking was not found' });
  return res.json({ booking: normalizeBookingForDashboard(booking) });
});

app.post('/api/bookings/track', async (req, res) => {
  const bookingId = String(req.body.bookingId || '').replace(/^#/, '').toUpperCase();
  if (!bookingId || bookingId.length < 10) {
    return res.status(400).json({ error: 'Enter the complete booking reference from your confirmation.' });
  }
  const bookings = await readBookings();
  const booking = bookings.find((candidate) => candidate.id.toUpperCase() === bookingId);
  if (!booking) return res.status(404).json({ error: 'Booking not found. Check the reference and try again.' });

  const details = booking.bookingDetails || {};
  return res.json({
    booking: {
      id: booking.id,
      status: booking.status || 'Confirmed',
      serviceType: booking.serviceType || 'moving',
      moveDate: details.moveDate || '',
      moveTime: details.moveTime || '',
      vehicle: details.vehicle || 'Vehicle pending allocation',
      movers: Number(details.movers || 0),
      driver: booking.driver || 'Not assigned yet',
    },
  });
});

app.get('/api/admin/bookings/summary', async (req, res) => {
  try {
    if (!requireDispatcher(req, res)) return;

    const bookings = await readBookings();
    const today = new Date().toISOString().slice(0, 10);
    const todayBookings = bookings.filter((booking) => (
      booking.createdAt?.slice(0, 10) === today || booking.bookingDetails?.moveDate === today
    ));
    const movingJobs = todayBookings.filter((booking) => booking.serviceType !== 'towing').length;
    const towTruckJobs = todayBookings.filter((booking) => booking.serviceType === 'towing').length;
    const completedJobs = todayBookings.filter((booking) => (
      ['Completed', 'Confirmed', 'Paid'].includes(booking.status)
    )).length;
    const totalRevenue = todayBookings.reduce((sum, booking) => sum + Number(booking.amount || 0), 0);
    const recentBookings = bookings.slice(0, 20).map(normalizeBookingForDashboard);

    return res.json({
      totals: {
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        movingJobs,
        towTruckJobs,
        completedJobs,
        activeJobs: movingJobs + towTruckJobs,
        totalJobsToday: todayBookings.length,
        fleetConnected: false,
      },
      statusCounts: {
        pending: todayBookings.filter((booking) => booking.status === 'Pending').length,
        confirmed: todayBookings.filter((booking) => booking.status === 'Confirmed').length,
        driverAssigned: todayBookings.filter((booking) => booking.status === 'Driver Assigned').length,
        onTheWay: todayBookings.filter((booking) => booking.status === 'On The Way').length,
        completed: todayBookings.filter((booking) => ['Completed', 'Paid'].includes(booking.status)).length,
      },
      recentBookings,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    return res.status(400).json({ error: error.message || 'Unable to load dashboard summary' });
  }
});

function parseAmount(amount) {
  const parsed = Number(amount);
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 100000) {
    throw new Error('Amount must be between 0.01 and 100,000.00');
  }
  return Math.round(parsed * 100);
}

function calculateMovingAmount(bookingDetails = {}) {
  const vehicleRates = { small: 45, medium: 55, luton: 65, truck: 85 };
  const vehicle = String(bookingDetails.vehicle || '').toLowerCase();
  const movers = Number(bookingDetails.movers);
  const durationHours = Number(bookingDetails.durationHours);
  const distanceKm = Number(bookingDetails.distanceKm);
  const inventory = bookingDetails.inventory || {};
  if (!vehicleRates[vehicle] || !Number.isInteger(movers) || movers < 0 || movers > 2
    || !Number.isInteger(durationHours) || durationHours < 1 || durationHours > 24
    || !Number.isFinite(distanceKm) || distanceKm < 0 || distanceKm > 500
    || !inventory || typeof inventory !== 'object') {
    throw new Error('The booking details are invalid. Refresh the quote and try again.');
  }
  const itemTotalCount = Object.values(inventory).reduce((total, value) => {
    const count = Number(value);
    if (!Number.isInteger(count) || count < 0 || count > 100) throw new Error('Inventory quantities are invalid');
    return total + count;
  }, 0);
  const subtotal = (vehicleRates[vehicle] + (movers * 25)) * durationHours
    + Math.round(distanceKm * 1.8)
    + (Math.ceil(itemTotalCount / 5) * 10);
  return Math.round((subtotal + Math.round(subtotal * 0.20)) * 100);
}

function paymentAmountForRequest(req) {
  if (req.body.bookingDetails?.vehicle) return calculateMovingAmount(req.body.bookingDetails);
  return parseAmount(req.body.amount);
}

function cleanMetadata(metadata = {}) {
  return Object.fromEntries(
    Object.entries(metadata)
      .filter(([, value]) => ['string', 'number', 'boolean'].includes(typeof value))
      .slice(0, 20)
      .map(([key, value]) => [key.slice(0, 40), String(value).slice(0, 500)]),
  );
}

function getReturnUrl(url) {
  const fallbackOrigin = configuredFrontendOrigins[0] || 'http://localhost:3000';
  const fallbackUrl = new URL(fallbackOrigin);
  const parsedUrl = url ? new URL(url) : fallbackUrl;
  const origin = parsedUrl.origin;

  if (!frontendOrigins.has(origin)) {
    throw new Error('Return URL is not allowed');
  }

  return parsedUrl;
}

app.post('/api/create-payment-intent', async (req, res) => {
  if (!stripe) return res.status(503).json({ error: 'Stripe is not configured' });

  try {
    const amount = paymentAmountForRequest(req);
    const currency = String(req.body.currency || 'gbp').toLowerCase();
    if (!/^[a-z]{3}$/.test(currency)) {
      return res.status(400).json({ error: 'Invalid currency' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: cleanMetadata(req.body.bookingDetails),
    });

    return res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Stripe PaymentIntent error:', error);
    return res.status(400).json({ error: error.message || 'Unable to create payment' });
  }
});

app.post('/api/create-checkout-session', async (req, res) => {
  if (!stripe) return res.status(503).json({ error: 'Stripe is not configured' });

  try {
    const amount = paymentAmountForRequest(req);
    const currency = String(req.body.currency || 'gbp').toLowerCase();
    if (!/^[a-z]{3}$/.test(currency)) {
      return res.status(400).json({ error: 'Invalid currency' });
    }

    const metadata = cleanMetadata(req.body.bookingDetails);
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      redirect_on_completion: 'never',
      payment_method_types: ['card'],
      line_items: [{
        quantity: 1,
        price_data: {
          currency,
          unit_amount: amount,
          product_data: { name: 'MoveVan Pro booking' },
        },
      }],
      metadata,
      payment_intent_data: { metadata },
    });

    return res.json({ clientSecret: session.client_secret, sessionId: session.id });
  } catch (error) {
    console.error('Stripe Checkout Session error:', error);
    return res.status(400).json({ error: error.message || 'Unable to open Stripe Checkout' });
  }
});

app.post('/api/create-hosted-checkout-session', async (req, res) => {
  if (!stripe) return res.status(503).json({ error: 'Stripe is not configured' });

  try {
    const amount = paymentAmountForRequest(req);
    const currency = String(req.body.currency || 'gbp').toLowerCase();
    if (!/^[a-z]{3}$/.test(currency)) {
      return res.status(400).json({ error: 'Invalid currency' });
    }

    const returnUrl = getReturnUrl(req.body.returnUrl);
    returnUrl.searchParams.set('stripe_checkout', 'success');
    returnUrl.searchParams.set('stripe_session_id', '{CHECKOUT_SESSION_ID}');
    const successUrl = returnUrl.toString().replace('%7BCHECKOUT_SESSION_ID%7D', '{CHECKOUT_SESSION_ID}');

    const cancelUrl = getReturnUrl(req.body.returnUrl);
    cancelUrl.searchParams.set('stripe_checkout', 'cancelled');

    const metadata = cleanMetadata(req.body.bookingDetails);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        quantity: 1,
        price_data: {
          currency,
          unit_amount: amount,
          product_data: { name: 'MoveVan Pro booking' },
        },
      }],
      metadata,
      payment_intent_data: { metadata },
      success_url: successUrl,
      cancel_url: cancelUrl.toString(),
    });

    return res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe hosted Checkout Session error:', error);
    return res.status(400).json({ error: error.message || 'Unable to open Stripe Checkout' });
  }
});

app.get('/api/checkout-session/:sessionId', async (req, res) => {
  if (!stripe) return res.status(503).json({ error: 'Stripe is not configured' });
  if (!/^cs_(test_|live_)?[A-Za-z0-9]+$/.test(req.params.sessionId)) {
    return res.status(400).json({ error: 'Invalid Stripe Checkout Session ID' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    return res.json({
      id: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
      paymentIntentId: session.payment_intent,
      amountTotal: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details?.email,
      created: session.created,
    });
  } catch (error) {
    console.error('Stripe Checkout retrieval error:', error);
    return res.status(400).json({ error: error.message || 'Unable to retrieve Stripe Checkout' });
  }
});

async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error('PayPal is not configured');

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(`${paypalBaseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error_description || 'PayPal authentication failed');
  return payload.access_token;
}

async function paypalRequest(path, options = {}) {
  const accessToken = await getPayPalAccessToken();
  const response = await fetch(`${paypalBaseUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const payload = await response.json();
  if (!response.ok) {
    const detail = payload.details?.[0]?.description;
    throw new Error(detail || payload.message || 'PayPal request failed');
  }
  return payload;
}

async function verifyPaidReceipt(receipt = {}) {
  const provider = String(receipt.provider || '');
  const transactionId = String(receipt.txnId || '').trim();
  if (!transactionId) throw new Error('A verified payment transaction is required before creating a booking');

  if (provider.toLowerCase().includes('stripe')) {
    if (!stripe || !/^pi_[A-Za-z0-9]+$/.test(transactionId)) {
      throw new Error('The Stripe payment reference is invalid');
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(transactionId);
    if (paymentIntent.status !== 'succeeded') throw new Error('The Stripe payment has not succeeded');
    return {
      transactionId: paymentIntent.id,
      provider: 'Stripe Checkout',
      amount: paymentIntent.amount_received / 100,
      currency: String(paymentIntent.currency || 'usd').toUpperCase(),
    };
  }

  if (provider.toLowerCase().includes('paypal')) {
    if (!/^[A-Z0-9]+$/i.test(transactionId)) throw new Error('The PayPal payment reference is invalid');
    const capture = await paypalRequest(`/v2/payments/captures/${transactionId}`);
    if (capture.status !== 'COMPLETED') throw new Error('The PayPal payment has not completed');
    return {
      transactionId: capture.id,
      provider: 'PayPal',
      amount: Number(capture.amount?.value),
      currency: String(capture.amount?.currency_code || 'GBP').toUpperCase(),
    };
  }

  throw new Error('Unsupported payment provider');
}

app.post('/api/paypal/create-order', async (req, res) => {
  try {
    const amountInCents = paymentAmountForRequest(req);
    const currency = String(req.body.currency || 'GBP').toUpperCase();
    if (!/^[A-Z]{3}$/.test(currency)) {
      return res.status(400).json({ error: 'Invalid currency' });
    }

    const order = await paypalRequest('/v2/checkout/orders', {
      method: 'POST',
      headers: { 'PayPal-Request-Id': crypto.randomUUID() },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: { currency_code: currency, value: (amountInCents / 100).toFixed(2) },
          description: 'MoveVan Pro booking',
          custom_id: String(req.body.bookingDetails?.bookingId || '').slice(0, 127) || undefined,
        }],
      }),
    });
    return res.json({ id: order.id, status: order.status });
  } catch (error) {
    console.error('PayPal create order error:', error);
    return res.status(400).json({ error: error.message || 'Unable to create PayPal order' });
  }
});

app.post('/api/paypal/capture-order', async (req, res) => {
  const orderId = String(req.body.orderId || '');
  if (!/^[A-Z0-9]+$/i.test(orderId)) {
    return res.status(400).json({ error: 'A valid PayPal order ID is required' });
  }

  try {
    const order = await paypalRequest(`/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: { 'PayPal-Request-Id': crypto.randomUUID() },
    });
    const capture = order.purchase_units?.[0]?.payments?.captures?.[0];
    return res.json({
      orderId: order.id,
      status: order.status,
      payerEmail: order.payer?.email_address,
      capture: capture && {
        id: capture.id,
        status: capture.status,
        amount: capture.amount,
        createTime: capture.create_time,
      },
    });
  } catch (error) {
    console.error('PayPal capture order error:', error);
    return res.status(400).json({ error: error.message || 'Unable to capture PayPal order' });
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.info(`MoveVan Pro payments API listening on http://localhost:${port}`);
});
