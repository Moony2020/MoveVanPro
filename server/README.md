# MoveVan Pro payments API

## Configure

Copy `.env.example` to `.env` and enter Stripe **test-mode** and PayPal **Sandbox** credentials. The frontend public credentials remain in the repository root `.env`:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_PAYPAL_CLIENT_ID=...
VITE_API_BASE_URL=http://localhost:5000/api
```

Never place `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, or `PAYPAL_CLIENT_SECRET` in a `VITE_` variable. Vite variables are delivered to the browser.

## Run locally

From the repository root, use two terminals:

```powershell
npm run dev:server
npm run dev
```

Check the API at `http://localhost:5000/api/health`.

## Stripe webhook testing

After signing in with the Stripe CLI, forward test events to the local webhook:

```powershell
stripe listen --forward-to localhost:5000/api/webhook
```

Copy the displayed `whsec_...` value into `server/.env` as `STRIPE_WEBHOOK_SECRET`, then restart the server. Selecting Stripe opens its official Embedded Checkout. Stripe's standard successful test card is `4242 4242 4242 4242`, with any future expiry and any three-digit CVC.

## Production note

The current API accepts the checkout amount because this prototype has no booking database. Before enabling live mode, look up the booking and calculate its final price on the server; never trust an amount supplied by the browser. Persist webhook event IDs and payment/order state so webhook processing is idempotent.
