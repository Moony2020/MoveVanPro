import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import Stripe from 'stripe';

const app = express();
const port = Number(process.env.PORT || 5000);
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
  });
});

function parseAmount(amount) {
  const parsed = Number(amount);
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 100000) {
    throw new Error('Amount must be between 0.01 and 100,000.00');
  }
  return Math.round(parsed * 100);
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
    const amount = parseAmount(req.body.amount);
    const currency = String(req.body.currency || 'usd').toLowerCase();
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
    const amount = parseAmount(req.body.amount);
    const currency = String(req.body.currency || 'usd').toLowerCase();
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
    const amount = parseAmount(req.body.amount);
    const currency = String(req.body.currency || 'usd').toLowerCase();
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

app.post('/api/paypal/create-order', async (req, res) => {
  try {
    const amountInCents = parseAmount(req.body.amount);
    const currency = String(req.body.currency || 'USD').toUpperCase();
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
