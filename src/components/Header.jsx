import React, { useState } from 'react';
import { 
  Truck, AlertTriangle, ShieldCheck, Phone, Users, BarChart3, 
  Menu, X, ChevronRight, Home, LayoutDashboard
} from 'lucide-react';

export default function Header({ currentView, setCurrentView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dispatch', label: '1. Dispatcher Command Center', shortLabel: 'Dispatcher', icon: LayoutDashboard, color: 'text-emerald-400' },
    { id: 'landing', label: '2. Customer Service Landing', shortLabel: 'Home', icon: Home },
    { id: 'moving', label: '3. Moving Quote Wizard', shortLabel: 'Book Move', icon: Truck },
    { id: 'towing', label: '4. Emergency Towing Dispatch', shortLabel: 'Emergency Towing', icon: AlertTriangle, color: 'text-amber-400' },
    { id: 'fleet', label: '5. Fleet & Drivers Telemetry', shortLabel: 'Fleet', icon: Users },
    { id: 'prd', label: '6. PRD Specs & Tokens', shortLabel: 'PRD Specs', icon: BarChart3 }
  ];

  return (
    <header className="bg-[#0b1c30] text-white border-b border-[#213145] sticky top-0 z-50 shadow-md w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex justify-between items-center gap-4">
        {/* Premium Corporate Brand Logo */}
        <div 
          onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }}
          className="flex items-center gap-2.5 md:gap-3.5 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-tr from-[#004395] via-[#0058be] to-[#2170e4] text-white flex items-center justify-center shadow-lg shadow-[#0058be]/30 border border-white/20 group-hover:scale-105 transition-all shrink-0">
            <Truck className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="flex flex-col shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base md:text-xl text-white leading-none tracking-tight whitespace-nowrap bg-gradient-to-r from-white via-[#e5eeff] to-[#adc6ff] bg-clip-text text-transparent">
                MoveVan<span className="text-[#3b82f6] font-extrabold ml-1">Pro</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block" />
            </div>
            <span className="text-[9px] md:text-[10px] font-extrabold text-[#93c5fd] tracking-widest uppercase mt-1 whitespace-nowrap flex items-center gap-1">
              <span>London Enterprise Logistics</span>
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links (ONLY on xl screens 1280px+ to ensure zero horizontal overflow) */}
        <nav className="hidden xl:flex items-center gap-1.5 shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive 
                    ? 'bg-[#0058be] text-white shadow-sm' 
                    : 'text-[#c2c6d6] hover:text-white hover:bg-[#213145]/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${item.color || ''}`} />
                <span className="whitespace-nowrap">{item.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA Actions (xl screens 1280px+) */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <a 
            href="tel:08009176683" 
            className="flex items-center gap-1.5 text-xs font-bold text-[#adc6ff] hover:text-white bg-[#213145] px-3 py-2 rounded-xl border border-[#3f465c] transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-[#0058be] shrink-0" />
            <span className="whitespace-nowrap">0800 917 6683</span>
          </a>

          <button 
            onClick={() => setCurrentView('moving')}
            className="bg-[#0058be] hover:bg-[#2170e4] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Truck className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Get Instant Quote</span>
          </button>
        </div>

        {/* Tablet & Mobile Header Layout (< xl screens 1280px) - Guaranteed to stay inside borders */}
        <div className="xl:hidden flex items-center gap-2 md:gap-3 shrink-0">
          <a 
            href="tel:08009176683" 
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#adc6ff] bg-[#213145] px-3 py-1.5 rounded-lg border border-[#3f465c] whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-[#0058be] shrink-0" />
            <span className="whitespace-nowrap">0800 917 6683</span>
          </a>

          <button 
            onClick={() => setCurrentView('moving')}
            className="bg-[#0058be] hover:bg-[#2170e4] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap shrink-0"
          >
            Get Quote
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#adc6ff] hover:text-white hover:bg-[#213145] border border-[#3f465c] transition-colors shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Floating Side Drawer Menu (< xl screens 1280px) */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 top-16 z-50 bg-[#0b1c30]/80 backdrop-blur-sm xl:hidden flex justify-end p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs bg-[#131b2e] border border-[#213145] rounded-3xl p-5 shadow-2xl flex flex-col justify-between max-h-[calc(100vh-5rem)] overflow-y-auto animate-in slide-in-from-top-4 duration-200"
          >
            <div>
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#213145]">
                <span className="text-xs font-extrabold text-[#adc6ff] uppercase tracking-wider">
                  Platform Menu
                </span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-[#c2c6d6] hover:text-white p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setCurrentView(item.id); setMobileMenuOpen(false); }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                        isActive 
                          ? 'bg-[#0058be] text-white shadow-md' 
                          : 'text-[#c2c6d6] hover:bg-[#213145] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 shrink-0 ${item.color || ''}`} />
                        <span className="whitespace-nowrap">{item.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#213145] space-y-3">
              <a 
                href="tel:08009176683" 
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#213145] text-[#adc6ff] hover:text-white rounded-xl text-xs font-bold border border-[#3f465c] whitespace-nowrap shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#0058be]" />
                <span>Call 0800 917 6683</span>
              </a>

              <button 
                onClick={() => { setCurrentView('towing'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md whitespace-nowrap cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Emergency Towing</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
