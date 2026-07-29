import React, { useState, useEffect } from 'react';
import { X, User, Lock, Mail, Phone, ShieldCheck, ArrowRight, Truck, LayoutDashboard, KeyRound, CheckCircle2 } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('customer'); // 'customer' | 'staff' | 'track'
  const [isRegistering, setIsRegistering] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [staffId, setStaffId] = useState('');
  const [jobRef, setJobRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (activeTab === 'customer') {
        if (!emailOrPhone) {
          setErrorMsg('Please enter your email or phone number.');
          return;
        }
        onLoginSuccess({
          name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Customer',
          email: emailOrPhone,
          role: 'customer'
        });
        onClose();
      } else if (activeTab === 'staff') {
        if (!staffId) {
          setErrorMsg('Please enter your Employee / Dispatcher ID.');
          return;
        }
        onLoginSuccess({
          name: `Dispatcher ${staffId || '#12'}`,
          id: staffId,
          role: 'dispatcher'
        });
        onClose();
      } else if (activeTab === 'track') {
        if (!jobRef) {
          setErrorMsg('Please enter a valid Job Reference Number (e.g. MVP-9824).');
          return;
        }
        setTrackResult({
          ref: jobRef.toUpperCase(),
          status: 'Tow Truck #12 Dispatched',
          eta: '12 Mins',
          driver: 'Robert T.',
          location: 'A40 Westway, London W12'
        });
      }
    }, 600);
  };

  const handleQuickDemoCustomer = () => {
    onLoginSuccess({
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      role: 'customer'
    });
    onClose();
  };

  const handleQuickDemoDispatcher = () => {
    onLoginSuccess({
      name: 'Dispatcher Robert T.',
      id: 'EMP-4029',
      role: 'dispatcher'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white border border-[#c2c6d6] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#f8fafc] border-b border-slate-200 text-slate-900 p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#0058be] flex items-center justify-center text-white shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">MoveVan<span className="text-[#0058be]">Pro</span> Portal</h2>
              <p className="text-xs text-slate-500">Sign in to manage your moves & dispatch requests</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-slate-200/80 p-1 rounded-xl mt-4 border border-slate-300/70 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setActiveTab('customer'); setErrorMsg(''); setTrackResult(null); }}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'customer' ? 'bg-[#0058be] text-white shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('staff'); setErrorMsg(''); setTrackResult(null); }}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'staff' ? 'bg-[#0058be] text-white shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Driver / Staff
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('track'); setErrorMsg(''); setTrackResult(null); }}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'track' ? 'bg-[#0058be] text-white shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Track Job
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="bg-[#ffdad6] text-[#93000a] text-xs font-bold p-3 rounded-xl border border-[#ffb4ab]">
              {errorMsg}
            </div>
          )}

          {activeTab === 'customer' && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">Email or Mobile Number</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#727785] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. alex@example.com or 07123456789"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0058be] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#727785] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0058be] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-[11px] pt-1">
                <label className="flex items-center gap-1.5 text-[#424754] cursor-pointer">
                  <input type="checkbox" className="rounded text-[#0058be]" defaultChecked />
                  Remember me
                </label>
                <button type="button" className="text-[#0058be] font-bold hover:underline">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0058be] hover:bg-[#2170e4] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? 'Signing in...' : isRegistering ? 'Create Customer Account' : 'Sign In to My Account'}
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Demo Login */}
              <div className="pt-2 border-t border-[#c2c6d6]/40">
                <button
                  type="button"
                  onClick={handleQuickDemoCustomer}
                  className="w-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0058be] py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>⚡ Quick Demo Customer Sign In</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'staff' && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">Employee / Dispatcher ID</label>
                <div className="relative">
                  <ShieldCheck className="w-4 h-4 text-[#727785] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. EMP-4029 or DISPATCH-12"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0058be] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">Security Access PIN</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#727785] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••"
                    maxLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0058be] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0b1c30] hover:bg-[#1a2b42] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? 'Authenticating Staff...' : 'Access Staff Command Center'}
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              </button>

              {/* Quick Demo Staff Login */}
              <div className="pt-2 border-t border-[#c2c6d6]/40">
                <button
                  type="button"
                  onClick={handleQuickDemoDispatcher}
                  className="w-full bg-[#e6f4ea] hover:bg-[#ceebd6] text-[#137333] py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>⚡ Quick Demo Dispatcher Sign In</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'track' && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">Booking / Job Reference #</label>
                <div className="relative">
                  <Truck className="w-4 h-4 text-[#727785] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. MVP-98241"
                    value={jobRef}
                    onChange={(e) => setJobRef(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0058be] focus:outline-none uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#825100] hover:bg-[#a36700] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Searching Job System...' : 'Track Live Towing / Move Status'}
                <ArrowRight className="w-4 h-4" />
              </button>

              {trackResult && (
                <div className="bg-[#eff4ff] border border-[#0058be]/30 rounded-2xl p-4 space-y-2 mt-4 animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0058be]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Booking {trackResult.ref} Active</span>
                  </div>
                  <div className="text-xs space-y-1 text-[#0b1c30]">
                    <div className="flex justify-between"><span>Status:</span> <strong>{trackResult.status}</strong></div>
                    <div className="flex justify-between"><span>ETA:</span> <strong className="text-[#825100]">{trackResult.eta}</strong></div>
                    <div className="flex justify-between"><span>Assigned Driver:</span> <strong>{trackResult.driver}</strong></div>
                    <div className="flex justify-between"><span>Current Location:</span> <strong>{trackResult.location}</strong></div>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
