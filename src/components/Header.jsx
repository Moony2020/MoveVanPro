import React, { useState, useEffect } from 'react';
import { 
  Truck, AlertTriangle, ShieldCheck, Phone, Users, BarChart3, 
  Menu, X, ChevronRight, Home, LayoutDashboard, User, LogOut 
} from 'lucide-react';

export default function Header({ currentView, setCurrentView, currentUser, onOpenLogin, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock background body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'landing', label: '1. Customer Service Landing', shortLabel: 'Home', icon: Home },
    { id: 'moving', label: '2. Moving Quote Wizard', shortLabel: 'Book Move', icon: Truck },
    { id: 'towing', label: '3. Emergency Towing Dispatch', shortLabel: 'Towing', icon: AlertTriangle, color: 'text-amber-400' },
    { id: 'dispatch', label: '4. Dispatcher Command Center', shortLabel: 'Dispatcher', icon: LayoutDashboard, color: 'text-emerald-400' },
    { id: 'fleet', label: '5. Fleet & Drivers Telemetry', shortLabel: 'Fleet', icon: Users }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-200 sticky top-0 z-50 shadow-xs w-full max-w-full relative transition-all">
      <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-3 md:px-5 h-16 md:h-18 flex justify-between items-center gap-1.5 lg:gap-2.5">
        {/* Premium Corporate Brand Logo */}
        <div 
          onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }}
          className="flex items-center gap-2 md:gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 md:w-8.5 md:h-8.5 rounded-lg bg-[#0058be] text-white flex items-center justify-center shadow-sm shadow-[#0058be]/20 border border-white/20 group-hover:scale-105 transition-all shrink-0">
            <Truck className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="flex flex-col shrink-0">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-sm md:text-lg text-slate-900 leading-none tracking-tight whitespace-nowrap font-['Playfair_Display'] font-serif">
                MoveVan<span className="text-[#0058be] font-bold ml-0.5">Pro</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse hidden sm:inline-block" />
            </div>
            <span className="text-[7.5px] md:text-[8.5px] font-extrabold text-slate-500 tracking-widest uppercase mt-0.5 whitespace-nowrap">
              London Logistics
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links (Visible on md 768px+ screens) */}
        <nav className="hidden md:flex items-center gap-0.5 xl:gap-1.5 shrink-0 ml-1 md:ml-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`px-2 py-1.5 xl:px-3 xl:py-2 rounded-xl text-xs xl:text-sm font-bold font-['Playfair_Display'] font-serif transition-all flex items-center gap-1 xl:gap-1.5 whitespace-nowrap shrink-0 cursor-pointer outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none ${
                  isActive 
                    ? 'bg-[#eff4ff] text-[#0058be] border border-[#dce9ff] shadow-2xs font-extrabold' 
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${item.color || ''}`} />
                <span className="whitespace-nowrap">{item.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA Actions */}
        <div className="hidden md:flex items-center gap-1.5 xl:gap-2.5 shrink-0">
          <a 
            href="tel:08009176683" 
            className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs xl:text-sm font-bold font-['Playfair_Display'] font-serif text-slate-800 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200/80 px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl border border-slate-200 transition-colors whitespace-nowrap shrink-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none"
          >
            <Phone className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#0058be] shrink-0" />
            <span className="whitespace-nowrap">0800 917 6683</span>
          </a>

          {/* User Account / Log In Button */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2.5 py-2 rounded-xl text-xs xl:text-sm font-['Playfair_Display'] font-serif shrink-0">
              <div className="w-5 h-5 rounded-full bg-[#0058be] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-xs max-w-[80px] xl:max-w-[100px] truncate">{currentUser.name}</span>
                <span className="text-[8px] text-emerald-600 capitalize">{currentUser.role}</span>
              </div>
              <button 
                onClick={onLogout}
                title="Log Out"
                className="ml-1 text-slate-500 hover:text-red-500 p-0.5 transition-colors cursor-pointer shrink-0 outline-none focus:outline-none focus:ring-0"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenLogin}
              title="Log In"
              aria-label="Log In"
              className="flex items-center justify-center text-slate-800 bg-slate-100 hover:bg-slate-200/80 p-2 xl:p-2.5 rounded-xl border border-slate-200 transition-all shrink-0 cursor-pointer outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none"
            >
              <User className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#0058be] shrink-0" />
            </button>
          )}

          <button 
            onClick={() => setCurrentView('moving')}
            className="bg-[#0058be] hover:bg-[#00469b] text-white px-3 py-1.5 xl:px-4 xl:py-2.5 rounded-xl text-xs xl:text-sm font-bold font-['Playfair_Display'] font-serif shadow-xs transition-all cursor-pointer flex items-center gap-1 xl:gap-1.5 whitespace-nowrap shrink-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none"
          >
            <Truck className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" />
            <span className="whitespace-nowrap">Get Instant Quote</span>
          </button>
        </div>

        {/* Mobile Header Actions (< md screens) */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          <a 
            href="tel:08009176683" 
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold font-['Playfair_Display'] font-serif text-slate-800 bg-slate-100 hover:bg-slate-200/80 px-3 py-2 rounded-xl border border-slate-200 whitespace-nowrap shrink-0"
          >
            <Phone className="w-4 h-4 text-[#0058be] shrink-0" />
            <span className="whitespace-nowrap">0800 917 6683</span>
          </a>

          {currentUser ? (
            <button 
              onClick={onLogout}
              className="bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold px-2.5 py-2 rounded-xl border border-slate-200 flex items-center gap-1 shrink-0 cursor-pointer"
              title="Log Out"
            >
              <span className="text-[11px] text-emerald-600 font-bold max-w-[60px] truncate">{currentUser.name}</span>
              <LogOut className="w-4 h-4 text-red-500 shrink-0" />
            </button>
          ) : (
            <button 
              onClick={onOpenLogin}
              className="bg-slate-100 hover:bg-slate-200/80 text-slate-800 p-2.5 rounded-xl border border-slate-200 flex items-center justify-center cursor-pointer shrink-0"
              title="Log In"
              aria-label="Log In"
            >
              <User className="w-4 h-4 text-[#0058be] shrink-0" />
            </button>
          )}

          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen((prev) => !prev);
            }}
            className="p-2 rounded-xl text-slate-800 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors shrink-0 cursor-pointer outline-none focus:outline-none focus:ring-0 relative z-50"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Clean Mobile Navigation Modal (< md screens) */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-md md:hidden flex justify-end p-3 sm:p-5 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[320px] sm:max-w-xs bg-white border border-slate-200 rounded-3xl p-5 shadow-2xl flex flex-col justify-between max-h-[85vh] my-auto overflow-y-auto animate-in slide-in-from-right-4 duration-200 text-slate-900 font-['Playfair_Display'] font-serif relative"
          >
            <div>
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0058be] text-white flex items-center justify-center text-xs font-bold">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-extrabold text-slate-900 font-['Playfair_Display'] font-serif">
                    MoveVan<span className="text-[#0058be]">Pro</span>
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={() => setMobileMenuOpen(false)} 
                  className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer outline-none"
                >
                  <X className="w-5 h-5" />
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
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer outline-none ${
                        isActive 
                          ? 'bg-[#eff4ff] text-[#0058be] border border-[#dce9ff] font-extrabold shadow-2xs' 
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${item.color || ''}`} />
                      <span className="whitespace-nowrap text-xs font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
              <button 
                onClick={() => { setCurrentView('moving'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-[#0058be] hover:bg-[#00469b] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs whitespace-nowrap cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>Get Instant Quote</span>
              </button>

              <a 
                href="tel:08009176683" 
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-800 hover:bg-slate-200/80 rounded-xl text-xs font-bold border border-slate-200 whitespace-nowrap shadow-2xs"
              >
                <Phone className="w-4 h-4 text-[#0058be]" />
                <span>Call 0800 917 6683</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
