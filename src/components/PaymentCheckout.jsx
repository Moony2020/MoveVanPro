import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertCircle, Check, CheckCircle2, CreditCard, Lock,
  Printer, RefreshCw, ShieldCheck,
} from 'lucide-react';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const currency = (import.meta.env.VITE_PAYMENT_CURRENCY || import.meta.env.VITE_PAYPAL_CURRENCY || 'USD').toUpperCase();
const pendingCheckoutKey = 'movevanpro_pending_stripe_checkout';

async function apiRequest(path, options = {}) {
  let response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
  } catch {
    throw new Error('Payment server is not reachable. Restart the backend on port 5000, then try again.');
  }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (payload.error === 'PayPal is not configured') {
      throw new Error('PayPal credentials are not loaded by the backend yet. Restart the payment server and refresh the page.');
    }
    throw new Error(payload.error || 'The payment service returned an error');
  }
  return payload;
}

function createReceipt({ provider, method, transactionId, status, amount, receiptCurrency, date }) {
  return {
    txnId: transactionId,
    provider,
    method,
    amount: Number(amount),
    currency: (receiptCurrency || currency).toUpperCase(),
    date: date || new Date().toLocaleString('en-GB'),
    status,
  };
}

function PayPalButton({ amount, bookingDetails, disabled, onProcessing, onSuccess, onError }) {
  const containerRef = useRef(null);
  const renderedRef = useRef(false);
  const handlersRef = useRef({ onProcessing, onSuccess, onError });
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const paypalConfigured = Boolean(clientId && !clientId.includes('your_paypal') && !clientId.includes('sample'));

  useEffect(() => {
    handlersRef.current = { onProcessing, onSuccess, onError };
  }, [onError, onProcessing, onSuccess]);

  useEffect(() => {
    if (!paypalConfigured) return undefined;

    let cancelled = false;
    const scriptId = 'movevanpro-paypal-sdk';
    let script = document.getElementById(scriptId);

    const renderButton = () => {
      if (cancelled || renderedRef.current || !window.paypal || !containerRef.current) return;
      renderedRef.current = true;
      window.paypal.Buttons({
        style: { layout: 'horizontal', shape: 'rect', label: 'paypal', height: 48, tagline: false },
        createOrder: async () => {
          handlersRef.current.onProcessing('Opening PayPal...');
          const order = await apiRequest('/paypal/create-order', {
            method: 'POST',
            body: JSON.stringify({ amount, currency, bookingDetails }),
          });
          return order.id;
        },
        onApprove: async ({ orderID }) => {
          handlersRef.current.onProcessing('Capturing approved PayPal payment...');
          const result = await apiRequest('/paypal/capture-order', {
            method: 'POST',
            body: JSON.stringify({ orderId: orderID }),
          });
          if (result.status !== 'COMPLETED' || result.capture?.status !== 'COMPLETED') {
            throw new Error(`PayPal capture status: ${result.capture?.status || result.status}`);
          }
          handlersRef.current.onSuccess(createReceipt({
            provider: 'PayPal',
            method: result.payerEmail ? `PayPal (${result.payerEmail})` : 'PayPal',
            transactionId: result.capture.id,
            status: result.capture.status,
            amount: result.capture.amount.value,
            receiptCurrency: result.capture.amount.currency_code,
            date: result.capture.createTime ? new Date(result.capture.createTime).toLocaleString('en-GB') : undefined,
          }));
        },
        onCancel: () => handlersRef.current.onError('PayPal checkout was cancelled. No payment was captured.'),
        onError: (error) => handlersRef.current.onError(error.message || 'PayPal checkout failed.'),
      }).render(containerRef.current);
    };

    if (window.paypal) renderButton();
    else if (script) script.addEventListener('load', renderButton, { once: true });
    else {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=${encodeURIComponent(currency)}&intent=capture`;
      script.async = true;
      script.addEventListener('load', renderButton, { once: true });
      script.addEventListener('error', () => handlersRef.current.onError('Unable to load PayPal Checkout.'), { once: true });
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      script?.removeEventListener('load', renderButton);
    };
  }, [amount, bookingDetails, clientId, paypalConfigured]);

  if (!paypalConfigured) {
    return <button type="button" onClick={() => onError('Add your PayPal Client ID to VITE_PAYPAL_CLIENT_ID.')} className="h-12 rounded-lg bg-[#ffc439] text-[#111] font-bold text-[13px]">Pay securely with PayPal</button>;
  }

  return <div className={disabled ? 'pointer-events-none opacity-60' : ''} ref={containerRef} />;
}

function Receipt({ receipt, onCancel }) {
  return (
    <div className="bg-white border-2 border-emerald-500 rounded-3xl p-5 sm:p-7 shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><CheckCircle2 className="w-6 h-6" /></div>
          <div><span className="text-[10px] font-bold uppercase text-emerald-600">Payment verified</span><h3 className="text-lg font-black">Transaction Receipt</h3></div>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold text-xs rounded-full border border-emerald-200">{receipt.status}</span>
      </div>
      <div className="bg-[#0b1c30] text-white rounded-2xl p-5 mb-5 space-y-4 shadow-xl">
        <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
          <div className="min-w-0"><span className="text-[10px] text-gray-400 uppercase block">Transaction ID</span><span className="text-xs sm:text-sm font-mono font-black text-emerald-400 break-all">{receipt.txnId}</span></div>
          <div className="text-right shrink-0"><span className="text-[10px] text-gray-400 uppercase block">Total paid</span><span className="text-xl font-black">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: receipt.currency }).format(receipt.amount)}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div><span className="text-gray-400 block text-[10px]">Provider</span><strong>{receipt.provider}</strong></div>
          <div><span className="text-gray-400 block text-[10px]">Method</span><strong>{receipt.method}</strong></div>
          <div className="col-span-2"><span className="text-gray-400 block text-[10px]">Timestamp</span><strong>{receipt.date}</strong></div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2.5">
        <button onClick={() => window.print()} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-xs flex items-center justify-center gap-2"><Printer className="w-4 h-4" />Print receipt</button>
        <button onClick={onCancel} className="flex-1 py-3 bg-[#0058be] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"><Check className="w-4 h-4" />Return to booking</button>
      </div>
    </div>
  );
}

export default function PaymentCheckout({ totalAmount = 608, bookingDetails = {}, onPaymentSuccess, onCancel }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [receipt, setReceipt] = useState(null);

  const finishPayment = useCallback((paymentReceipt) => {
    setReceipt(paymentReceipt);
    setIsProcessing(false);
    setProcessingStep('');
    setErrorMessage('');
    localStorage.removeItem(pendingCheckoutKey);
    onPaymentSuccess?.(paymentReceipt);
  }, [onPaymentSuccess]);

  const failPayment = useCallback((error) => {
    setIsProcessing(false);
    setProcessingStep('');
    setErrorMessage(typeof error === 'string' ? error : error.message || 'Payment failed. Please try again.');
  }, []);

  const verifyStripeSession = useCallback(async (sessionId) => {
    try {
      setIsProcessing(true);
      setProcessingStep('Verifying Stripe payment...');
      const session = await apiRequest(`/checkout-session/${sessionId}`);
      if (session.status !== 'complete' || session.paymentStatus !== 'paid') {
        throw new Error(`Stripe payment status: ${session.paymentStatus || session.status}`);
      }
      finishPayment(createReceipt({
        provider: 'Stripe Checkout',
        method: session.customerEmail ? `Card (${session.customerEmail})` : 'Credit / debit card',
        transactionId: session.paymentIntentId || session.id,
        status: session.paymentStatus.toUpperCase(),
        amount: session.amountTotal / 100,
        receiptCurrency: session.currency,
        date: new Date(session.created * 1000).toLocaleString('en-GB'),
      }));
    } catch (error) {
      failPayment(error);
    }
  }, [failPayment, finishPayment]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('stripe_session_id');
    const checkoutStatus = params.get('stripe_checkout');

    if (checkoutStatus === 'cancelled') {
      failPayment('Stripe checkout was cancelled. No payment was captured.');
    }

    if (sessionId) {
      verifyStripeSession(sessionId);
    }

    if (checkoutStatus || sessionId) {
      params.delete('stripe_checkout');
      params.delete('stripe_session_id');
      const cleanUrl = `${window.location.pathname}${params.toString() ? `?${params}` : ''}${window.location.hash}`;
      window.history.replaceState({}, '', cleanUrl);
    }
  }, [failPayment, verifyStripeSession]);

  const openStripeCheckout = useCallback(async () => {
    if (!stripePublicKey) {
      failPayment('Add VITE_STRIPE_PUBLIC_KEY to the frontend .env file.');
      return;
    }

    try {
      setIsProcessing(true);
      setProcessingStep('Opening Stripe checkout...');
      setErrorMessage('');
      localStorage.setItem(pendingCheckoutKey, JSON.stringify({ amount: totalAmount, bookingDetails }));
      const session = await apiRequest('/create-hosted-checkout-session', {
        method: 'POST',
        body: JSON.stringify({
          amount: totalAmount,
          currency,
          bookingDetails,
          returnUrl: window.location.href,
        }),
      });
      window.location.assign(session.url);
    } catch (error) {
      failPayment(error);
    }
  }, [bookingDetails, failPayment, totalAmount]);

  if (receipt) return <Receipt receipt={receipt} onCancel={onCancel} />;

  return (
    <div className="space-y-4 pt-2 font-['Plus_Jakarta_Sans',Inter,ui-sans-serif,system-ui,sans-serif]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#c2c6d6]/60">
        <div>
          <h3 className="text-[18px] font-bold tracking-normal text-[#0b1c30]">Choose payment provider</h3>
          <p className="text-[12px] leading-5 text-[#565e74]">The provider's official checkout will open securely.</p>
        </div>
        <span className="w-fit px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-semibold rounded-full flex items-center gap-1"><Lock className="w-3 h-3" />Secure payment</span>
      </div>

      {errorMessage && <div className="flex gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold"><AlertCircle className="w-4 h-4 shrink-0" /><span>{errorMessage}</span></div>}
      {isProcessing && <div className="flex items-center gap-2 p-3 bg-blue-50 text-[#0058be] rounded-xl text-xs font-bold"><RefreshCw className="w-4 h-4 animate-spin" />{processingStep}</div>}

      <div className="grid sm:grid-cols-2 gap-3 items-start">
        <button
          type="button"
          onClick={openStripeCheckout}
          disabled={isProcessing}
          className="h-12 px-5 rounded-lg bg-[#635bff] hover:bg-[#5147e5] text-white font-bold text-[13px] tracking-normal flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
        >
          <CreditCard className="w-5 h-5" />Pay securely with Stripe
        </button>
        <PayPalButton amount={totalAmount} bookingDetails={bookingDetails} disabled={isProcessing} onProcessing={(step) => { setIsProcessing(true); setProcessingStep(step); setErrorMessage(''); }} onSuccess={finishPayment} onError={failPayment} />
      </div>

      <div className="pt-3 border-t border-[#c2c6d6]/60 flex items-center justify-end text-[10px] text-[#424754]"><span className="flex items-center gap-1 text-emerald-700 font-bold"><ShieldCheck className="w-3.5 h-3.5" />Card details stay with Stripe</span></div>
    </div>
  );
}
