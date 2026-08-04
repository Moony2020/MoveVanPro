import React from 'react';
import { CarFront, MapPin } from 'lucide-react';

export default function DriverPortal({ onNavigateTo }) {
  return (
    <main className="min-h-screen bg-[#f8f9ff] px-4 py-8 font-['Plus_Jakarta_Sans',Inter,ui-sans-serif,system-ui,sans-serif]">
      <section className="mx-auto max-w-4xl space-y-5">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#0058be]">Driver portal</p>
          <h1 className="mt-1 text-2xl font-extrabold text-[#0b1c30]">Your assigned jobs</h1>
          <p className="mt-2 text-sm text-[#565e74]">This is separate from the customer website and the Admin Dashboard.</p>
        </div>
        <div className="rounded-3xl border border-[#c2c6d6] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eff4ff] text-[#0058be]"><CarFront className="w-7 h-7" /></div>
          <h2 className="text-lg font-extrabold text-[#0b1c30]">No jobs assigned yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#565e74]">When an administrator assigns a confirmed booking to you, it will appear here with the customer and route details.</p>
          <button type="button" onClick={() => window.location.assign('/?view=website')} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#c2c6d6] px-4 py-2.5 text-xs font-bold text-[#0b1c30] hover:bg-slate-50"><MapPin className="w-4 h-4 text-[#0058be]" />View Website</button>
        </div>
      </section>
    </main>
  );
}
