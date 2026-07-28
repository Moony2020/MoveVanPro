import React, { useState } from 'react';
import { 
  CreditCard, Lock, ShieldCheck, CheckCircle2, Sparkles, 
  RefreshCw, Check, ArrowRight, Printer
} from 'lucide-react';

export default function PaymentCheckout({ 
  totalAmount = 608, 
  bookingDetails = {}, 
  onPaymentSuccess,
  onCancel 
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Handle Payment Execution
  const handlePayment = (provider) => {
    setIsProcessing(true);

    if (provider === 'stripe') {
      setProcessingStep('Connecting to Stripe Secure Gateway...');
      
      setTimeout(() => {
        setProcessingStep('Authorizing 256-bit SSL Card Payment...');
      }, 700);

      setTimeout(() => {
        const txnId = `TXN-STP-${Math.floor(100000 + Math.random() * 900000)}`;
        const receipt = {
          txnId,
          provider: 'Stripe Payments Inc.',
          method: 'Visa / Mastercard / Amex (Credit / Debit)',
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
      }, 1600);

    } else if (provider === 'paypal') {
      setProcessingStep('Connecting to PayPal Express Checkout...');

      setTimeout(() => {
        setProcessingStep('Authorizing PayPal Account Balance...');
      }, 700);

      setTimeout(() => {
        const txnId = `TXN-PYP-${Math.floor(100000 + Math.random() * 900000)}`;
        const receipt = {
          txnId,
          provider: 'PayPal Express Checkout',
          method: 'PayPal Authorized Account',
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
      }, 1600);
    }
  };

  // Render Receipt when Payment is Completed
  if (paymentCompleted && receiptData) {
    return (
      <div className="bg-white border-2 border-emerald-500 rounded-3xl p-5 sm:p-7 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">Payment Confirmed</span>
              <h3 className="text-lg font-black text-gray-900">Transaction Receipt</h3>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold text-xs rounded-full border border-emerald-200">
            {receiptData.status}
          </span>
        </div>

        {/* Receipt Box */}
        <div className="bg-[#0b1c30] text-white rounded-2xl p-4 sm:p-5 mb-5 space-y-3.5 shadow-xl border border-gray-800">
          <div className="flex justify-between items-start border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block mb-1">Transaction Ref</span>
              <span className="text-sm sm:text-base font-mono font-black text-emerald-400">{receiptData.txnId}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block mb-1">Total Paid</span>
              <span className="text-xl sm:text-2xl font-black text-white">${receiptData.amount}.00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-gray-400 block text-[10px]">Payment Provider</span>
              <strong className="text-white text-[11px]">{receiptData.provider}</strong>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Payment Method</span>
              <strong className="text-white text-[11px]">{receiptData.method}</strong>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Auth Code</span>
              <strong className="text-emerald-300 font-mono text-[11px]">{receiptData.authCode}</strong>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Timestamp</span>
              <strong className="text-white text-[11px]">{receiptData.date}</strong>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
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
            Return to Booking Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-1">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#c2c6d6]/60">
        <div>
          <h3 className="text-base font-black text-[#0b1c30]">Select Express Payment Method</h3>
          <p className="text-[11px] text-[#424754] mt-0.5">Click your preferred secure checkout option below to authorize payment.</p>
        </div>
        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full flex items-center gap-1 border border-emerald-300 shrink-0">
          <Lock className="w-3 h-3 text-emerald-600" /> 256-Bit SSL Secured
        </span>
      </div>

      {isProcessing ? (
        <div className="bg-[#f8f9ff] border border-[#c2c6d6] rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-3 animate-pulse">
          <RefreshCw className="w-8 h-8 text-[#0058be] animate-spin" />
          <p className="text-xs font-black text-[#0b1c30]">{processingStep}</p>
          <p className="text-[10px] text-[#424754]">Encrypted SSL authorization in progress...</p>
        </div>
      ) : (
        <div className="space-y-3 pt-1">
          {/* Button 1: Credit / Debit Card (Stripe) */}
          <button
            type="button"
            onClick={() => handlePayment('stripe')}
            className="w-full bg-[#0058be] hover:bg-[#2170e4] text-white p-4 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-between cursor-pointer shadow-lg transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <span className="block font-black text-white text-xs sm:text-sm">Pay with Credit / Debit Card</span>
                <span className="block text-[10px] text-blue-100 font-normal">Visa, Mastercard, American Express via Stripe</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-emerald-300">${totalAmount}.00</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </button>

          {/* Button 2: PayPal Express Checkout */}
          <button
            type="button"
            onClick={() => handlePayment('paypal')}
            className="w-full bg-[#ffc439] hover:bg-[#e0ab2b] text-[#111] p-4 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-between cursor-pointer shadow-lg transition-all active:scale-[0.99] border border-amber-400"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-black text-sm">
                PP
              </div>
              <div className="text-left">
                <span className="block font-black text-gray-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <span className="font-serif italic text-blue-900 text-sm">PayPal</span> Express Checkout
                </span>
                <span className="block text-[10px] text-gray-700 font-normal">Fast & secure one-click checkout</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-blue-950">${totalAmount}.00</span>
              <ArrowRight className="w-4 h-4 text-[#111]" />
            </div>
          </button>

          {/* Accepted Payment Logos & Security */}
          <div className="pt-3 border-t border-[#c2c6d6]/60 flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#424754]">
            <div className="flex items-center gap-2 font-bold text-[#0b1c30]">
              <span>Accepted:</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-200">Visa</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-200">Mastercard</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-200">Amex</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-200">PayPal</span>
            </div>

            <div className="flex items-center gap-1 text-emerald-700 font-bold shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> PCI-DSS Compliant
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
