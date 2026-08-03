import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CheckCircle2, Eye, EyeOff, KeyRound, LayoutDashboard, Lock,
  Mail, ShieldCheck, Truck, User, X,
} from 'lucide-react';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');

async function authRequest(path, body, token = '') {
  let response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Login server is not reachable. Restart the backend and try again.');
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Unable to sign in');
  return payload;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess, initialTab = 'customer', initialMode = 'sign-in', adminMode = false }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isRegistering, setIsRegistering] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordResetStep, setPasswordResetStep] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetNotice, setResetNotice] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [staffId, setStaffId] = useState('');
  const [jobRef, setJobRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setErrorMsg('');
      setTrackResult(null);
      setLoading(false);
      setPasswordVisible(false);
      setPasswordResetStep('');
      setChangePasswordMode(initialMode === 'change-password');
      setCurrentPassword('');
      setResetCode('');
      setNewPassword('');
      setResetNotice('');
      const previousBodyOverflow = document.body.style.overflow;
      const previousHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousBodyOverflow;
        document.documentElement.style.overflow = previousHtmlOverflow;
      };
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return undefined;
  }, [initialMode, initialTab, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLoading(false);
        setErrorMsg('');
        setTrackResult(null);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const switchTab = (tab) => {
    setActiveTab(tab);
    setErrorMsg('');
    setTrackResult(null);
    setLoading(false);
    setPasswordVisible(false);
    setPasswordResetStep('');
    setChangePasswordMode(false);
    setResetCode('');
    setNewPassword('');
    setResetNotice('');
  };

  const closeModal = () => {
    setLoading(false);
    setErrorMsg('');
    setTrackResult(null);
    onClose();
  };

  const beginPasswordReset = () => {
    setPasswordResetStep('request');
    setPassword('');
    setResetCode('');
    setNewPassword('');
    setErrorMsg('');
    setResetNotice('');
  };

  const cancelPasswordReset = () => {
    setPasswordResetStep('');
    setResetCode('');
    setNewPassword('');
    setErrorMsg('');
    setResetNotice('');
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    const identity = activeTab === 'driver' ? staffId : emailOrPhone;
    const role = activeTab === 'driver' ? 'driver' : 'customer';
    setErrorMsg('');
    setResetNotice('');
    setLoading(true);
    try {
      if (passwordResetStep === 'request') {
        const payload = await authRequest('/auth/request-password-reset', { emailOrPhone: identity, role });
        setResetNotice(payload.message);
        setPasswordResetStep('confirm');
      } else {
        const payload = await authRequest('/auth/reset-password', {
          emailOrPhone: identity,
          role,
          code: resetCode,
          newPassword,
        });
        setResetNotice(payload.message);
        setPasswordResetStep('');
        setPassword('');
      }
    } catch (error) {
      setErrorMsg(error.message || 'Unable to reset password');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setErrorMsg('');
    setResetNotice('');
    setLoading(true);
    try {
      const token = localStorage.getItem('movevanpro_auth_token');
      if (!token) throw new Error('Please sign in again before changing your password');
      const payload = await authRequest('/auth/change-password', {
        currentPassword,
        newPassword,
      }, token);
      setResetNotice(payload.message || 'Your password has been changed.');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      setErrorMsg(error.message || 'Unable to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      if (activeTab === 'customer') {
        if (!emailOrPhone) {
          setErrorMsg('Please enter your email or mobile number.');
          return;
        }
        const payload = await authRequest(isRegistering ? '/auth/customer/register' : '/auth/customer/login', {
          emailOrPhone,
          password,
        });
        localStorage.setItem('movevanpro_auth_token', payload.token);
        onLoginSuccess(payload.user);
        onClose();
        return;
      }

      if (activeTab === 'driver') {
        if (!staffId) {
          setErrorMsg('Please enter your driver email.');
          return;
        }
        const payload = await authRequest('/auth/driver/login', {
          staffId,
          password,
        });
        localStorage.setItem('movevanpro_auth_token', payload.token);
        onLoginSuccess(payload.user);
        onClose();
        return;
      }

      if (!jobRef) {
        setErrorMsg('Please enter the complete booking reference from your confirmation.');
        return;
      }
      const payload = await authRequest('/bookings/track', { bookingId: jobRef });
      setTrackResult(payload.booking);
    } catch (error) {
      setErrorMsg(error.message || 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/80 backdrop-blur-md animate-in fade-in duration-200 font-['Plus_Jakarta_Sans',Inter,ui-sans-serif,system-ui,sans-serif] overflow-y-auto"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <div
        className="bg-white border border-[#c2c6d6] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative flex flex-col my-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-[#f8fafc] border-b border-slate-200 text-slate-900 p-6 relative">
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#0058be] flex items-center justify-center text-white shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[22px] font-bold tracking-normal text-slate-900">
                MoveVan<span className="text-[#0058be]">Pro</span> {adminMode ? 'Admin' : 'Portal'}
              </h2>
              <p className="text-[12px] leading-5 text-slate-500">
                {adminMode ? 'Admin account security.' : 'Customer = person requesting a move. Driver = a MoveVan Pro driver. Admin sign-in is separate.'}
              </p>
            </div>
          </div>

          {!adminMode && <div className="flex bg-slate-200/80 p-1 rounded-xl mt-4 border border-slate-300/70 text-xs font-bold">
            <button
              type="button"
              onClick={() => switchTab('customer')}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'customer' ? 'bg-[#0058be] text-white shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => switchTab('driver')}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'driver' ? 'bg-[#0058be] text-white shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Driver
            </button>
            <button
              type="button"
              onClick={() => switchTab('track')}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'track' ? 'bg-[#0058be] text-white shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Track Booking
            </button>
          </div>}
        </div>

        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="bg-[#ffdad6] text-[#93000a] text-xs font-bold p-3 rounded-xl border border-[#ffb4ab]">
              {errorMsg}
            </div>
          )}

          {resetNotice && (
            <div className="bg-[#dcfce7] text-[#166534] text-xs font-bold p-3 rounded-xl border border-[#86efac]">
              {resetNotice}
            </div>
          )}

          {changePasswordMode ? (
            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <h3 className="text-sm font-bold text-[#0b1c30]">Change password</h3>
                <p className="text-[11px] leading-5 text-[#565e74]">Use your current MoveVan Pro password, then choose a new one.</p>
              </div>
              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">Current password</label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0058be] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">New password</label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  minLength={8}
                  required
                  placeholder="At least 8 characters"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0058be] focus:outline-none"
                />
              </div>
              <button type="button" onClick={() => setPasswordVisible((visible) => !visible)} className="text-[11px] font-bold text-[#0058be] hover:underline">
                {passwordVisible ? 'Hide passwords' : 'Show passwords'}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0058be] hover:bg-[#2170e4] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Please wait...' : 'Change password'}
                <KeyRound className="w-4 h-4" />
              </button>
              <button type="button" onClick={closeModal} className="w-full text-[11px] font-bold text-[#0058be] hover:underline">Close</button>
            </form>
          ) : passwordResetStep && activeTab !== 'track' ? (
            <form onSubmit={handlePasswordReset} className="space-y-3">
              <div>
                <h3 className="text-sm font-bold text-[#0b1c30]">
                  {passwordResetStep === 'request' ? 'Reset your password' : 'Enter your reset code'}
                </h3>
                <p className="text-[11px] leading-5 text-[#565e74]">
                  {passwordResetStep === 'request'
                    ? 'We will email a six-digit code to the address on your account.'
                    : 'Enter the code from the email, then choose a new password.'}
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">Account Email</label>
                <input
                  type="email"
                  required
                  placeholder={activeTab === 'driver' ? 'driver@movevanpro.com' : 'alex@example.com'}
                  value={activeTab === 'driver' ? staffId : emailOrPhone}
                  onChange={(event) => (activeTab === 'driver' ? setStaffId(event.target.value) : setEmailOrPhone(event.target.value))}
                  className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0058be] focus:outline-none"
                />
              </div>

              {passwordResetStep === 'confirm' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-[#0b1c30] block mb-1">Six-digit reset code</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      required
                      placeholder="123456"
                      value={resetCode}
                      onChange={(event) => setResetCode(event.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0058be] focus:outline-none tracking-[0.3em]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#0b1c30] block mb-1">New password</label>
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      minLength={8}
                      required
                      placeholder="At least 8 characters"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0058be] focus:outline-none"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0058be] hover:bg-[#2170e4] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Please wait...' : passwordResetStep === 'request' ? 'Email me a reset code' : 'Save new password'}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button type="button" onClick={cancelPasswordReset} className="w-full text-[11px] font-bold text-[#0058be] hover:underline">
                Back to sign in
              </button>
            </form>
          ) : (
            <>

          {activeTab === 'customer' && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-[#0b1c30]">
                    {isRegistering ? 'Create customer account' : 'Customer sign in'}
                  </h3>
                  <p className="text-[11px] text-[#565e74]">For customers who request a move or hire a van.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRegistering((value) => !value)}
                  className="text-[11px] font-bold text-[#0058be] hover:underline"
                >
                  {isRegistering ? 'I have an account' : 'Create account'}
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">Email or Mobile Number</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#727785] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="alex@example.com or 07123456789"
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
                    type={passwordVisible ? 'text' : 'password'}
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0058be] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible((visible) => !visible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727785] hover:text-[#0b1c30]"
                    aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                  >
                    {passwordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {!isRegistering && (
                  <button type="button" onClick={beginPasswordReset} className="mt-2 text-[11px] font-bold text-[#0058be] hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0058be] hover:bg-[#2170e4] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? 'Please wait...' : isRegistering ? 'Create Customer Account' : 'Sign In to My Account'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] leading-5 text-[#565e74]">
                Customer accounts are created with the email or mobile number and password you enter here.
              </p>
            </form>
          )}

          {activeTab === 'driver' && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <div>
                  <h3 className="text-sm font-bold text-[#0b1c30]">Driver sign in</h3>
                  <p className="text-[11px] text-[#565e74]">For drivers whose account has been created by the company.</p>
                </div>
              </div>

              <div className="bg-[#eff4ff] border border-[#dce9ff] rounded-2xl p-3 text-[11px] leading-5 text-[#424754]">
                This area is only for authorised MoveVan Pro drivers. It does not open the Admin Dashboard.
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">Driver Email</label>
                <div className="relative">
                  <ShieldCheck className="w-4 h-4 text-[#727785] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="driver@movevanpro.com"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0058be] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">Password</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#727785] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    required
                    placeholder="Driver password"
                    maxLength={32}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0058be] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible((visible) => !visible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727785] hover:text-[#0b1c30]"
                    aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                  >
                    {passwordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button type="button" onClick={beginPasswordReset} className="mt-2 text-[11px] font-bold text-[#0058be] hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0b1c30] hover:bg-[#1a2b42] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? 'Please wait...' : 'Sign in as Driver'}
                <Truck className="w-4 h-4 text-emerald-400" />
              </button>

              <p className="text-[11px] leading-5 text-[#565e74]">
                If you do not have driver access yet, contact the MoveVan Pro administrator.
              </p>
            </form>
          )}

          {activeTab === 'track' && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="bg-[#fff7ed] border border-[#ffddb8] rounded-2xl p-3 text-[11px] leading-5 text-[#424754]">
                Enter the complete booking reference shown on your confirmation screen or receipt.
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">Booking Reference Number</label>
                <div className="relative">
                  <Truck className="w-4 h-4 text-[#727785] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="MVP-XXXXXXXXXXXX"
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
                {loading ? 'Searching booking...' : 'Track Booking Status'}
                <ArrowRight className="w-4 h-4" />
              </button>

              {trackResult && (
                <div className="bg-[#eff4ff] border border-[#0058be]/30 rounded-2xl p-4 space-y-2 mt-4 animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0058be]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Booking {trackResult.id}</span>
                  </div>
                  <div className="text-xs space-y-1 text-[#0b1c30]">
                    <div className="flex justify-between"><span>Status:</span> <strong>{trackResult.status}</strong></div>
                    <div className="flex justify-between"><span>Scheduled:</span> <strong>{trackResult.moveDate || 'To be confirmed'} {trackResult.moveTime ? `at ${trackResult.moveTime}` : ''}</strong></div>
                    <div className="flex justify-between"><span>Vehicle:</span> <strong className="capitalize">{trackResult.vehicle}</strong></div>
                    <div className="flex justify-between"><span>Assigned Driver:</span> <strong>{trackResult.driver}</strong></div>
                  </div>
                </div>
              )}
            </form>
          )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
