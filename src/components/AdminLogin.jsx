import React, { useState } from 'react';
import { Eye, EyeOff, LayoutDashboard, Lock, Mail, X } from 'lucide-react';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');

export default function AdminLogin({ onClose, onLoginSuccess, standalone = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
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

  return (
    <div className={`${standalone ? 'min-h-screen' : 'fixed inset-0 z-50'} bg-[#0b1c30]/80 backdrop-blur-md flex items-center justify-center p-4`}>
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-[#c2c6d6] bg-white p-6 shadow-2xl space-y-4 font-['Plus_Jakarta_Sans',Inter,ui-sans-serif,system-ui,sans-serif]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#0058be] mb-2"><LayoutDashboard className="w-5 h-5" /><span className="text-xs font-extrabold uppercase tracking-wider">Admin only</span></div>
            <h2 className="text-xl font-extrabold text-[#0b1c30]">MoveVan Pro Admin</h2>
            <p className="text-xs text-[#565e74] mt-1">Separate access for the business owner and authorised office staff.</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-[#727785] hover:bg-slate-100" aria-label="Close Admin sign in"><X className="w-5 h-5" /></button>
        </div>

        {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-700">{error}</div>}

        <div>
          <label className="mb-1 block text-xs font-bold text-[#0b1c30]">Admin Email</label>
          <div className="relative"><Mail className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-[#727785]" /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@movevanpro.com" className="w-full rounded-xl border border-[#c2c6d6] bg-[#f8f9ff] py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0058be]" /></div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold text-[#0b1c30]">Password</label>
          <div className="relative"><Lock className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-[#727785]" /><input required type={visible ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Admin password" className="w-full rounded-xl border border-[#c2c6d6] bg-[#f8f9ff] py-2.5 pl-9 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-[#0058be]" /><button type="button" onClick={() => setVisible((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727785]" aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
        </div>
        <button disabled={loading} className="w-full rounded-xl bg-[#0b1c30] py-3 text-xs font-extrabold text-white shadow-md hover:bg-[#1a2b42] disabled:opacity-60">{loading ? 'Signing in...' : 'Open Admin Dashboard'}</button>
      </form>
    </div>
  );
}
