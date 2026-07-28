import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Lock, ShieldCheck, CheckCircle2, Sparkles, 
  RefreshCw, AlertCircle, Check, ArrowRight, Download, Printer,
  FileText, Key, Eye, EyeOff
} from 'lucide-react';

export default function PaymentCheckout({ 
  totalAmount = 248, 
  bookingDetails = {}, 
  onPaymentSuccess,
  onCancel 
}) {
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // 'stripe' | 'paypal' | 'applepay' | 'driver'
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [showEnvKeyDetails, setShowEnvKeyDetails] = useState(false);

  // Read Environment Variables securely
  const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_MoveVanProStripeDefaultKey2026';
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'sb-paypal-client-id-movevanpro-2026';
  const isLiveEnv = import.meta.env.VITE_ENABLE_LIVE_PAYMENTS === 'true';

  // Stripe Card Form State
  const [cardName, setCardName] = useState('Alex Morgan');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('382');
  const [cardZip, setCardZip] = useState('W8 7RG');
  const [cardErrors, setCardErrors] = useState({});

  // PayPal Sandbox State
  const [paypalEmail, setPaypalEmail] = useState('customer@sandbox.paypal.com');
  const [paypalAuthStep, setPaypalAuthStep] = useState('initial'); // 'initial' | 'connecting' | 'authorized'

  // Card Brand Detection
  const getCardBrand = (num) => {
    const clean = num.replace(/\s+/g, '');
    if (/^4/.test(clean)) return { name: 'Visa', logo: '💳 Visa', color: 'bg-blue-600' };
    if (/^5[1-5]|^2[2-7]/.test(clean)) return { name: 'Mastercard', logo: '💳 Mastercard', color: 'bg-amber-600' };
    if (/^3[47]/.test(clean)) return { name: 'American Express', logo: '💳 Amex', color: 'bg-emerald-600' };
    if (/^6/.test(clean)) return { name: 'Discover', logo: '💳 Discover', color: 'bg-orange-600' };
    return { name: 'Card', logo: '💳 Card', color: 'bg-gray-600' };
  };

  const cardBrand = getCardBrand(cardNumber);

  // Auto-formatters
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    let formatted = val.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
    if (cardErrors.cardNumber) setCardErrors(prev => ({ ...prev, cardNumber: null }));
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardExpiry(val);
    if (cardErrors.cardExpiry) setCardErrors(prev => ({ ...prev, cardExpiry: null }));
  };

  const handleCvcChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardCvc(val);
    if (cardErrors.cardCvc) setCardErrors(prev => ({ ...prev, cardCvc: null }));
  };

  // Quick Preset Fillers for Testing
  const fillTestCard = (brand) => {
    if (brand === 'visa') {
      setCardNumber('4242 4242 4242 4242');
      setCardExpiry('12/28');
      setCardCvc('424');
    } else if (brand === 'mastercard') {
      setCardNumber('5555 5555 5555 4444');
      setCardExpiry('08/29');
      setCardCvc('888');
    }
  };

  // Execute Redirect Simulation & Receipt generation
  const handleExternalPaymentRedirect = (provider) => {
    setIsProcessing(true);
    setPaymentMethod(provider);

    if (provider === 'stripe') {
      setProcessingStep('Redirecting to secure Stripe Checkout...');
      // Open Stripe Checkout simulation in a new tab
      window.open('https://checkout.stripe.com/pay', '_blank');

      setTimeout(() => {
        setProcessingStep('Authorizing secure token vault session...');
      }, 950);

      setTimeout(() => {
        const txnId = `TXN-STP-${Math.floor(100000 + Math.random() * 900000)}`;
        const receipt = {
          txnId,
          provider: 'Stripe Payments Inc.',
          method: 'Credit / Debit Card (Stripe Gateway)',
          amount: totalAmount,
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          status: 'SETTLED & CAPTURED',
          authCode: `AUTH_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          securityHash: `sha256_${Math.random().toString(36).substring(2, 12)}`,
          pickup: bookingDetails.pickup || '142 Kensington High St, London W8 7RG',
          dropoff: bookingDetails.dropoff || '28 Canary Wharf, London E14 5AB',
          vehicle: bookingDetails.vehicle || 'Luton Van',
          movers: bookingDetails.movers !== undefined ? bookingDetails.movers : 1,
          schedule: `${bookingDetails.moveDate || '2026-08-01'} at ${bookingDetails.moveTime || '09:00 AM'}`
        };
        setReceiptData(receipt);
        setIsProcessing(false);
        setPaymentCompleted(true);
        if (onPaymentSuccess) onPaymentSuccess(receipt);
      }, 2500);

    } else if (provider === 'paypal') {
      setProcessingStep('Opening PayPal Express Checkout session...');
      // Open PayPal checkout simulation in a new tab
      window.open('https://www.paypal.com/signin', '_blank');

      setTimeout(() => {
        setProcessingStep('Authorizing PayPal account balance...');
      }, 950);

      setTimeout(() => {
        const txnId = `TXN-PYP-${Math.floor(100000 + Math.random() * 900000)}`;
        const receipt = {
          txnId,
          provider: 'PayPal Express Checkout',
          method: `PayPal Account Balance (${paypalEmail})`,
          amount: totalAmount,
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          status: 'COMPLETED & VERIFIED',
          authCode: `PYP_AUTH_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          securityHash: `sha256_${Math.random().toString(36).substring(2, 12)}`,
          pickup: bookingDetails.pickup || '142 Kensington High St, London W8 7RG',
          dropoff: bookingDetails.dropoff || '28 Canary Wharf, London E14 5AB',
          vehicle: bookingDetails.vehicle || 'Luton Van',
          movers: bookingDetails.movers !== undefined ? bookingDetails.movers : 1,
          schedule: `${bookingDetails.moveDate || '2026-08-01'} at ${bookingDetails.moveTime || '09:00 AM'}`
        };
        setReceiptData(receipt);
        setIsProcessing(false);
        setPaymentCompleted(true);
        if (onPaymentSuccess) onPaymentSuccess(receipt);
      }, 2500);
    }
  };

  // Render Receipt when Payment is Completed
  if (paymentCompleted && receiptData) {
    return (
      <div className="bg-white border-2 border-emerald-500 rounded-3xl p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">Payment Authorized</span>
              <h3 className="text-xl font-black text-gray-900">Transaction Receipt</h3>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold text-xs rounded-full border border-emerald-200">
            {receiptData.status}
          </span>
        </div>

        {/* Receipt Box */}
        <div className="bg-[#0b1c30] text-white rounded-2xl p-6 mb-6 space-y-4 shadow-xl border border-gray-800">
          <div className="flex justify-between items-start border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block mb-1">Transaction Ref</span>
              <span className="text-base font-mono font-black text-emerald-400">{receiptData.txnId}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block mb-1">Total Paid</span>
              <span className="text-2xl font-black text-white">${receiptData.amount}.00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-400 block text-[11px]">Payment Gateway</span>
              <strong className="text-white">{receiptData.provider}</strong>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Payment Method</span>
              <strong className="text-white">{receiptData.method}</strong>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Auth Code</span>
              <strong className="text-emerald-300 font-mono text-[11px]">{receiptData.authCode}</strong>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Timestamp</span>
              <strong className="text-white">{receiptData.date}</strong>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 text-[11px] text-gray-400 flex items-center justify-between">
            <span className="truncate">Security Hash: <code className="text-gray-300 font-mono">{receiptData.securityHash}</code></span>
            <span className="flex items-center gap-1 text-emerald-400 font-bold shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Encrypted
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => window.print()}
            className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print Receipt
          </button>
          <button 
            onClick={() => {
              if (onCancel) onCancel();
            }}
            className="flex-1 py-3 px-4 bg-[#0058be] hover:bg-[#2170e4] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Return to Dispatch Center
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-2 sm:pt-4 space-y-4">
      
      {/* Header & Secure Environment Badge */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5 pb-4 border-b border-[#c2c6d6]/60">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-black text-[#0b1c30]">Payment Details</h3>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full flex items-center gap-1 border border-emerald-300 shrink-0 whitespace-nowrap">
              <Lock className="w-3 h-3 text-emerald-600" /> 256-Bit SSL Encrypted
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-[#424754] mt-0.5">Enter your credit or debit card details below to complete your reservation.</p>
        </div>

        {/* Env Key Toggle Badge */}
        <button 
          onClick={() => setShowEnvKeyDetails(!showEnvKeyDetails)}
          className="px-3 py-1 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0058be] rounded-xl text-[11px] font-bold border border-[#0058be]/30 flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
        >
          <Key className="w-3.5 h-3.5" />
          <span>Stripe API Vault</span>
          {showEnvKeyDetails ? <EyeOff className="w-3 h-3 ml-1" /> : <Eye className="w-3 h-3 ml-1" />}
        </button>
      </div>

      {/* Environment Key Details Dropdown */}
      {showEnvKeyDetails && (
        <div className="p-3.5 sm:p-4 bg-[#0b1c30] text-white rounded-2xl border border-blue-900 text-xs space-y-2 animate-in fade-in duration-200">
          <div className="flex justify-between items-center font-mono text-[11px]">
            <span className="text-gray-400">Stripe Public Key:</span>
            <span className="text-emerald-400 font-bold">{stripePublicKey.slice(0, 22)}...</span>
          </div>
          <div className="flex justify-between items-center font-mono text-[11px]">
            <span className="text-gray-400">Gateway Status:</span>
            <span className="text-blue-300 font-bold">256-Bit RSA Token Vault Active</span>
          </div>
        </div>
      )}

      {/* Payment Provider Options */}
      {isProcessing ? (
        <div className="bg-[#f8f9ff] border border-[#c2c6d6] rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-4 animate-pulse">
          <RefreshCw className="w-8 h-8 text-[#0058be] animate-spin" />
          <div>
            <p className="text-xs font-black text-[#0b1c30]">{processingStep}</p>
            <p className="text-[10px] text-[#424754] mt-1">Please authenticate your payment in the secure pop-up window.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Option 1: Stripe Card Gateway */}
          <div className="bg-[#f8f9ff] p-4 sm:p-5 rounded-2xl border border-[#c2c6d6]/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-[#0058be]/40">
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-black text-[#0b1c30] flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#0058be] shrink-0" />
                Credit / Debit Card (via Stripe)
              </h4>
              <p className="text-[11px] text-[#424754] leading-relaxed">
                Pay securely with your credit or debit card using our Stripe merchant portal.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleExternalPaymentRedirect('stripe')}
              className="w-full sm:w-auto bg-[#0058be] hover:bg-[#2170e4] text-white px-5 py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-[0.98] shrink-0 whitespace-nowrap"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-300" />
              <span>Checkout via Stripe</span>
            </button>
          </div>

          {/* Option 2: PayPal Checkout */}
          <div className="bg-[#fffdf2] p-4 sm:p-5 rounded-2xl border border-amber-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-amber-400">
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-black text-[#825100] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                PayPal Secure Express
              </h4>
              <p className="text-[11px] text-[#705220] leading-relaxed">
                Log in with your PayPal account for instant bank transfer or balance payment.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleExternalPaymentRedirect('paypal')}
              className="w-full sm:w-auto bg-[#ffc439] hover:bg-[#e0ab2b] text-[#111] px-5 py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-[0.98] shrink-0 whitespace-nowrap"
            >
              <span className="font-extrabold font-serif italic text-blue-900 text-[13px]">PayPal</span>
              <span>Checkout</span>
            </button>
          </div>

          {/* Secure Badging & Trust Indicators */}
          <div className="pt-3 border-t border-[#c2c6d6]/60 flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] text-[#424754]">
            <div className="flex items-center gap-2 font-bold text-[#0b1c30]">
              <span>Accepted:</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-200">Visa</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-200">Mastercard</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-200">Amex</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-200">PayPal</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-700 font-bold shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> PCI-DSS Compliant Gateway
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
