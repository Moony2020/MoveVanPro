import React, { useState, useEffect } from 'react';
import { 
  Truck, AlertTriangle, ShieldCheck, Phone, Users, BarChart3, 
  Menu, X, ChevronRight, Home, LayoutDashboard, User
} from 'lucide-react';

export default function Header({ currentView, setCurrentView, currentUser, onOpenLogin, onChangePassword }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDispatcher = currentUser?.role === 'dispatcher';
  const isDriver = currentUser?.role === 'driver';
  // Use the familiar two-initial avatar pattern: "John Smith" -> "JS".
  // There is deliberately no account-name text in the header, so it stays compact.
  const accountInitials = (() => {
    const words = String(currentUser?.name || currentUser?.email?.split('@')[0] || '')
      .trim()
      .split(/\s+/)
      .map((word) => word.replace(/[^a-z0-9]/gi, ''))
      .filter(Boolean);

    if (!words.length) return isDispatcher ? 'AD' : 'CU';
    const first = words[0].charAt(0);
    const last = words.length > 1 ? words[words.length - 1].charAt(0) : words[0].charAt(1);
    return `${first}${last || ''}`.toUpperCase();
  })();

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

  const customerNavItems = [
    { id: 'landing', label: '1. Customer Service Landing', shortLabel: 'Home', icon: Home },
    { id: 'services', label: 'Services provided by MoveVan Pro', shortLabel: 'Services', icon: ShieldCheck },
    { id: 'moving', label: '2. Moving Quote Wizard', shortLabel: 'Book Move', icon: Truck },
    { id: 'towing', label: '3. Emergency Towing Dispatch', shortLabel: 'Towing', icon: AlertTriangle, color: 'text-amber-400' }
  ];
  const navItems = isDispatcher ? [
    { id: 'dispatch', label: 'Admin Dashboard', shortLabel: 'Dashboard', icon: LayoutDashboard, color: 'text-emerald-500' },
    { id: 'moving', label: 'Create a booking for a customer', shortLabel: 'Book for customer', icon: Truck },
    { id: 'fleet', label: 'Fleet management', shortLabel: 'Fleet', icon: Users },
    { id: 'landing', label: 'Open the public MoveVan Pro website', shortLabel: 'View Website', icon: Home },
  ] : isDriver ? [
    { id: 'driver', label: 'Driver portal', shortLabel: 'Driver Portal', icon: Truck, color: 'text-emerald-500' },
    { id: 'landing', label: 'Open the public MoveVan Pro website', shortLabel: 'View Website', icon: Home },
  ] : customerNavItems;

  const openLogin = (initialTab = 'customer') => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
    document.documentElement.style.overflow = 'unset';
    onOpenLogin?.(initialTab);
  };

  const handleNavigate = (item) => {
    // The customer website and the back-office are intentionally different URLs.
    if ((isDispatcher || isDriver) && item.id === 'landing') {
      window.location.assign('/?view=website');
      return;
    }
    setCurrentView(item.id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`bg-white/95 text-slate-900 border-b border-slate-200 sticky top-0 z-50 shadow-xs w-full max-w-full relative transition-all ${mobileMenuOpen ? '' : 'backdrop-blur-md'}`}>
      <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-3 md:px-5 h-16 md:h-18 flex justify-between items-center gap-1.5 lg:gap-2.5">
        {/* Premium Corporate Brand Logo */}
        <div 
          onClick={() => { setCurrentView(isDispatcher ? 'dispatch' : isDriver ? 'driver' : 'landing'); setMobileMenuOpen(false); }}
          className="flex items-center gap-2 md:gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 md:w-8.5 md:h-8.5 rounded-lg bg-[#0058be] text-white flex items-center justify-center shadow-sm shadow-[#0058be]/20 border border-white/20 group-hover:scale-105 transition-all shrink-0">
            <Truck className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="flex flex-col shrink-0">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-base md:text-lg text-slate-900 leading-none tracking-tight whitespace-nowrap font-['Playfair_Display'] font-serif">
                MoveVan<span className="text-[#0058be] font-bold ml-0.5">Pro</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse hidden sm:inline-block" />
            </div>
            <span className="text-[8.5px] md:text-[8.5px] font-extrabold text-slate-500 tracking-widest uppercase mt-0.5 whitespace-nowrap">
              {isDispatcher ? 'Admin Portal' : isDriver ? 'Driver Portal' : 'London Logistics'}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0 ml-1 lg:ml-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item)}
                className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-xs xl:text-sm font-bold font-['Playfair_Display'] font-serif transition-all flex items-center gap-1 xl:gap-1.5 whitespace-nowrap shrink-0 cursor-pointer outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none ${
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
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 shrink min-w-0">
          <a 
            href="tel:08009176683" 
            className="flex items-center gap-1 xl:gap-1.5 text-xs xl:text-sm font-bold font-['Playfair_Display'] font-serif text-slate-800 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200/80 px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl border border-slate-200 transition-colors whitespace-nowrap shrink-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none"
          >
            <Phone className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#0058be] shrink-0" />
            <span className="whitespace-nowrap">0800 917 6683</span>
          </a>

          {/* User Account / Log In Button */}
          {currentUser ? (
            <button
              type="button"
              onClick={onChangePassword}
              title="Account settings"
              aria-label="Open account settings"
              className="w-9 h-9 rounded-full bg-[#0058be] text-white border-2 border-white shadow-sm ring-1 ring-slate-200 flex items-center justify-center text-[10px] font-extrabold cursor-pointer shrink-0 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0058be]"
            >
              {accountInitials}
            </button>
          ) : (
            <button 
              onClick={() => openLogin('customer')}
              title="Log In"
              aria-label="Log In"
              className="flex items-center justify-center text-slate-800 bg-slate-100 hover:bg-slate-200/80 p-2 xl:p-2.5 rounded-xl border border-slate-200 transition-all shrink-0 cursor-pointer outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none"
            >
              <User className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#0058be] shrink-0" />
            </button>
          )}

          <button 
            onClick={() => setCurrentView(isDriver ? 'driver' : 'moving')}
            className="bg-[#0058be] hover:bg-[#00469b] text-white px-3 py-2 xl:px-4 rounded-xl text-xs xl:text-sm font-bold font-['Playfair_Display'] font-serif shadow-xs transition-all cursor-pointer flex items-center gap-1 xl:gap-1.5 whitespace-nowrap shrink-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none"
          >
            <Truck className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" />
            <span className="whitespace-nowrap hidden xl:inline">{isDispatcher ? 'Book for Customer' : isDriver ? 'Driver Portal' : 'Get Instant Quote'}</span>
            <span className="whitespace-nowrap xl:hidden">{isDispatcher ? 'Book' : isDriver ? 'Portal' : 'Quote'}</span>
          </button>
        </div>

        {/* Mobile Header Actions (< lg screens) */}
        <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
          <a 
            href="tel:08009176683" 
            className="flex items-center justify-center gap-1.5 text-xs font-bold font-['Playfair_Display'] font-serif text-slate-800 bg-slate-100 hover:bg-slate-200/80 px-2.5 sm:px-3 py-2 rounded-xl border border-slate-200 whitespace-nowrap shrink-0 max-[500px]:w-7 max-[500px]:h-7 max-[500px]:p-0 max-[500px]:rounded-lg"
          >
            <Phone className="w-4 h-4 text-[#0058be] shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">0800 917 6683</span>
          </a>

          {currentUser ? (
            <button
              type="button"
              onClick={onChangePassword}
              title="Account settings"
              aria-label="Open account settings"
              className="w-8 h-8 rounded-full bg-[#0058be] text-white border-2 border-white shadow-sm ring-1 ring-slate-200 flex items-center justify-center text-[9px] font-extrabold cursor-pointer shrink-0 max-[500px]:w-7 max-[500px]:h-7 max-[500px]:text-[8px]"
            >
              {accountInitials}
            </button>
          ) : (
            <button 
              onClick={() => openLogin('customer')}
              className="w-8 h-8 bg-slate-100 hover:bg-slate-200/80 text-slate-800 p-0 rounded-lg border border-slate-200 flex items-center justify-center cursor-pointer shrink-0 max-[500px]:w-7 max-[500px]:h-7"
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
            className="w-8 h-8 p-0 rounded-lg text-slate-800 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors shrink-0 cursor-pointer outline-none focus:outline-none focus:ring-0 relative z-50 flex items-center justify-center max-[500px]:w-7 max-[500px]:h-7"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 max-[500px]:w-4 max-[500px]:h-4 text-slate-900" /> : <Menu className="w-5 h-5 max-[500px]:w-4 max-[500px]:h-4 text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Right-Aligned Mobile Navigation Dropdown Card (< lg screens) */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-x-0 top-16 md:top-18 bottom-0 z-40 bg-slate-900/20 backdrop-blur-xs lg:hidden flex justify-end items-start p-3 sm:p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[280px] bg-white border border-slate-200 rounded-3xl p-5 shadow-2xl flex flex-col animate-in slide-in-from-top-2 duration-200 text-slate-900 font-['Playfair_Display'] font-serif relative"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2 px-2">
                Platform Navigation
              </span>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer outline-none ${
                      isActive 
                        ? 'bg-[#eff4ff] text-[#0058be] border border-[#dce9ff] font-extrabold shadow-2xs' 
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${item.color || ''}`} />
                    <span className="whitespace-nowrap text-xs font-bold">{item.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 space-y-2">
              <button 
                onClick={() => { setCurrentView(isDriver ? 'driver' : 'moving'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-[#0058be] hover:bg-[#00469b] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs whitespace-nowrap cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>{isDispatcher ? 'Book for Customer' : isDriver ? 'Driver Portal' : 'Get Instant Quote'}</span>
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
