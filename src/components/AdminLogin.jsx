import React, { useState } from 'react';
import { Eye, EyeOff, LayoutDashboard, Lock, Mail, X } from 'lucide-react';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');

export default function AdminLogin({ onClose, onLoginSuccess, standalone = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [resetStep, setResetStep] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/auth/team/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffId: email, password }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Unable to sign in as Admin');
      localStorage.setItem('movevanpro_auth_token', payload.token);
      onLoginSuccess(payload.user);
    } catch (requestError) {
      setError(requestError.message || 'Unable to sign in as Admin');
    } finally {
      setLoading(false);
    }
  };

  const submitReset = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');
    setLoading(true);
    try {
      const path = resetStep === 'request' ? '/auth/request-password-reset' : '/auth/reset-password';
      const body = resetStep === 'request'
        ? { emailOrPhone: email, role: 'dispatcher' }
        : { emailOrPhone: email, role: 'dispatcher', code: resetCode, newPassword };
      const response = await fetch(`${apiBaseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Unable to reset the admin password');
      setNotice(payload.message);
      if (resetStep === 'request') {
        setResetStep('confirm');
      } else {
        setResetStep('');
        setResetCode('');
        setNewPassword('');
      }
    } catch (requestError) {
      setError(requestError.message || 'Unable to reset the admin password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${standalone ? 'min-h-screen' : 'fixed inset-0 z-50'} bg-[#0b1c30]/80 backdrop-blur-md flex items-center justify-center p-4`}>
      <form onSubmit={resetStep ? submitReset : submit} className="w-full max-w-md rounded-3xl border border-[#c2c6d6] bg-white p-6 shadow-2xl space-y-4 font-['Plus_Jakarta_Sans',Inter,ui-sans-serif,system-ui,sans-serif]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#0058be] mb-2"><LayoutDashboard className="w-5 h-5" /><span className="text-xs font-extrabold uppercase tracking-wider">Admin only</span></div>
            <h2 className="text-xl font-extrabold text-[#0b1c30]">{resetStep ? 'Reset admin password' : 'MoveVan Pro Admin'}</h2>
            <p className="text-xs text-[#565e74] mt-1">{resetStep ? 'Receive a secure six-digit code by email.' : 'Separate access for the business owner and authorised office staff.'}</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-[#727785] hover:bg-slate-100" aria-label="Close Admin sign in"><X className="w-5 h-5" /></button>
        </div>

        {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-700">{error}</div>}
        {notice && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-semibold text-emerald-700">{notice}</div>}

        <div>
          <label className="mb-1 block text-xs font-bold text-[#0b1c30]">Admin Email</label>
          <div className="relative"><Mail className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-[#727785]" /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@movevanpro.com" className="w-full rounded-xl border border-[#c2c6d6] bg-[#f8f9ff] py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0058be]" /></div>
        </div>
        {!resetStep && <div>
          <label className="mb-1 block text-xs font-bold text-[#0b1c30]">Password</label>
          <div className="relative"><Lock className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-[#727785]" /><input required type={visible ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Admin password" className="w-full rounded-xl border border-[#c2c6d6] bg-[#f8f9ff] py-2.5 pl-9 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-[#0058be]" /><button type="button" onClick={() => setVisible((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727785]" aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
        </div>}

        {resetStep === 'confirm' && <>
          <div>
            <label className="mb-1 block text-xs font-bold text-[#0b1c30]">Six-digit code</label>
            <input required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={resetCode} onChange={(event) => setResetCode(event.target.value.replace(/\D/g, ''))} placeholder="000000" className="w-full rounded-xl border border-[#c2c6d6] bg-[#f8f9ff] px-3 py-2.5 text-xs tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-[#0058be]" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-[#0b1c30]">New password</label>
            <div className="relative"><Lock className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-[#727785]" /><input required minLength={8} type={visible ? 'text' : 'password'} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="At least 8 characters" className="w-full rounded-xl border border-[#c2c6d6] bg-[#f8f9ff] py-2.5 pl-9 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-[#0058be]" /><button type="button" onClick={() => setVisible((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727785]" aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
          </div>
        </>}

        <button disabled={loading} className="w-full rounded-xl bg-[#0b1c30] py-3 text-xs font-extrabold text-white shadow-md hover:bg-[#1a2b42] disabled:opacity-60">
          {loading ? 'Please wait...' : resetStep === 'request' ? 'Email reset code' : resetStep === 'confirm' ? 'Save new password' : 'Open Admin Dashboard'}
        </button>
        {!resetStep ? (
          <button type="button" onClick={() => { setResetStep('request'); setError(''); setNotice(''); }} className="w-full text-xs font-bold text-[#0058be] hover:underline">Forgot password?</button>
        ) : (
          <button type="button" onClick={() => { setResetStep(''); setResetCode(''); setNewPassword(''); setError(''); setNotice(''); }} className="w-full text-xs font-bold text-[#0058be] hover:underline">Back to sign in</button>
        )}
      </form>
    </div>
  );
}
