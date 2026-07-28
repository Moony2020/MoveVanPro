import React, { useState } from 'react';
import { 
  Truck, AlertTriangle, ShieldCheck, Phone, Users, BarChart3, 
  Menu, X, ChevronRight, Home, LayoutDashboard, User, LogOut 
} from 'lucide-react';

export default function Header({ currentView, setCurrentView, currentUser, onOpenLogin, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: '1. Customer Service Landing', shortLabel: 'Home', icon: Home },
    { id: 'moving', label: '2. Moving Quote Wizard', shortLabel: 'Book Move', icon: Truck },
    { id: 'towing', label: '3. Emergency Towing Dispatch', shortLabel: 'Towing', icon: AlertTriangle, color: 'text-amber-400' },
    { id: 'dispatch', label: '4. Dispatcher Command Center', shortLabel: 'Dispatcher', icon: LayoutDashboard, color: 'text-emerald-400' },
    { id: 'fleet', label: '5. Fleet & Drivers Telemetry', shortLabel: 'Fleet', icon: Users },
    { id: 'prd', label: '6. System Specs & PRD', shortLabel: 'Specs', icon: BarChart3 }
  ];

  return (
    <header className="bg-[#0b1c30] text-white border-b border-[#213145] sticky top-0 z-50 shadow-md w-full">
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 h-16 flex justify-between items-center gap-2 lg:gap-3">
        {/* Premium Corporate Brand Logo */}
        <div 
          onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }}
          className="flex items-center gap-2 md:gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-[#004395] via-[#0058be] to-[#2170e4] text-white flex items-center justify-center shadow-lg shadow-[#0058be]/30 border border-white/20 group-hover:scale-105 transition-all shrink-0">
            <Truck className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="flex flex-col shrink-0">
            <div className="flex items-center gap-1">
              <span className="font-black text-sm md:text-lg text-white leading-none tracking-tight whitespace-nowrap bg-gradient-to-r from-white via-[#e5eeff] to-[#adc6ff] bg-clip-text text-transparent">
                MoveVan<span className="text-[#3b82f6] font-extrabold ml-0.5">Pro</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block" />
            </div>
            <span className="text-[8px] md:text-[9px] font-extrabold text-[#93c5fd] tracking-widest uppercase mt-0.5 whitespace-nowrap">
              London Logistics
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl text-[11px] xl:text-xs font-bold transition-all flex items-center gap-1 xl:gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
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

        {/* Desktop CTA Actions */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
          <a 
            href="tel:08009176683" 
            className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-[#adc6ff] hover:text-white bg-[#213145] px-2.5 py-1.5 rounded-xl border border-[#3f465c] transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-[#0058be] shrink-0" />
            <span className="whitespace-nowrap">0800 917 6683</span>
          </a>

          {/* User Account / Log In Button */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 bg-[#213145] border border-[#3f465c] px-2.5 py-1.5 rounded-xl text-xs shrink-0">
              <div className="w-5 h-5 rounded-full bg-[#0058be] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-[11px] max-w-[80px] xl:max-w-[100px] truncate">{currentUser.name}</span>
                <span className="text-[8px] text-emerald-400 capitalize">{currentUser.role}</span>
              </div>
              <button 
                onClick={onLogout}
                title="Log Out"
                className="ml-1 text-[#adc6ff] hover:text-red-400 p-0.5 transition-colors cursor-pointer shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#213145] hover:bg-[#2d3f57] px-3 py-1.5 rounded-xl border border-[#3f465c] transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#3b82f6] shrink-0" />
              <span className="whitespace-nowrap">Log In</span>
            </button>
          )}

          <button 
            onClick={() => setCurrentView('moving')}
            className="bg-[#0058be] hover:bg-[#2170e4] text-white px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Truck className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Get Instant Quote</span>
          </button>
        </div>

        {/* Mobile Layout (< lg screen) */}
        <div className="lg:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
          <a 
            href="tel:08009176683" 
            className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#adc6ff] bg-[#213145] px-2.5 py-1.5 rounded-lg border border-[#3f465c] whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-[#0058be] shrink-0" />
            <span className="whitespace-nowrap">0800 917 6683</span>
          </a>

          {currentUser ? (
            <button 
              onClick={onLogout}
              className="bg-[#213145] text-white text-xs font-bold px-2 py-1.5 rounded-lg border border-[#3f465c] flex items-center gap-1 shrink-0 cursor-pointer"
              title="Log Out"
            >
              <span className="text-[10px] text-emerald-400 font-bold max-w-[60px] truncate">{currentUser.name}</span>
              <LogOut className="w-3.5 h-3.5 text-red-400 shrink-0" />
            </button>
          ) : (
            <button 
              onClick={onOpenLogin}
              className="bg-[#213145] hover:bg-[#2d3f57] text-white text-xs font-bold p-2 sm:px-2.5 sm:py-1.5 rounded-lg border border-[#3f465c] flex items-center gap-1 cursor-pointer shrink-0"
              title="Log In"
            >
              <User className="w-4 h-4 text-[#3b82f6] shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">Log In</span>
            </button>
          )}

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-[#adc6ff] hover:text-white hover:bg-[#213145] border border-[#3f465c] transition-colors shrink-0 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Floating Side Drawer Menu (< lg screens) */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 top-16 z-50 bg-[#0b1c30]/80 backdrop-blur-sm lg:hidden flex justify-end p-4"
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

            <div className="mt-6 pt-4 border-t border-[#213145] space-y-2.5">
              <button 
                onClick={() => { setCurrentView('moving'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-[#0058be] hover:bg-[#2170e4] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md whitespace-nowrap cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>Get Instant Moving Quote</span>
              </button>

              <button 
                onClick={() => { setCurrentView('towing'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md whitespace-nowrap cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Emergency Towing</span>
              </button>

              <a 
                href="tel:08009176683" 
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#213145] text-[#adc6ff] hover:text-white rounded-xl text-xs font-bold border border-[#3f465c] whitespace-nowrap shadow-sm"
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
