import React from 'react';
import { Truck, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer({ onNavigateTo }) {
  return (
    <footer className="bg-[#0b1c30] text-white pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0058be] text-white flex items-center justify-center shadow-sm">
                <Truck className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg font-playfair tracking-tight">
                MoveVan<span className="text-[#6da3f0] font-bold ml-0.5">Pro</span>
              </span>
            </div>
            <p className="text-xs text-[#8b9cc4] leading-relaxed max-w-[220px]">
              London's premier corporate logistics & emergency recovery platform. Owned fleet, salaried staff, zero gig workers.
            </p>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest text-[#6da3f0] mb-4">Services</h5>
            <div className="space-y-2.5">
              <button onClick={() => onNavigateTo('moving')} className="block text-sm text-[#c2c6d6] hover:text-white transition-colors cursor-pointer">Residential Moving</button>
              <button onClick={() => onNavigateTo('towing')} className="block text-sm text-[#c2c6d6] hover:text-white transition-colors cursor-pointer">Emergency Towing</button>
              <button onClick={() => onNavigateTo('moving')} className="block text-sm text-[#c2c6d6] hover:text-white transition-colors cursor-pointer">Commercial Relocations</button>
              <button onClick={() => onNavigateTo('towing')} className="block text-sm text-[#c2c6d6] hover:text-white transition-colors cursor-pointer">Roadside Recovery</button>
            </div>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest text-[#6da3f0] mb-4">Company</h5>
            <div className="space-y-2.5">
              <button onClick={() => onNavigateTo('dispatch')} className="block text-sm text-[#c2c6d6] hover:text-white transition-colors cursor-pointer">Dispatch Board</button>
              <button onClick={() => onNavigateTo('fleet')} className="block text-sm text-[#c2c6d6] hover:text-white transition-colors cursor-pointer">Fleet Management</button>
              <span className="block text-sm text-[#c2c6d6]">Privacy Policy</span>
              <span className="block text-sm text-[#c2c6d6]">Terms of Service</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest text-[#6da3f0] mb-4">Contact</h5>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-[#c2c6d6]">
                <Phone className="w-3.5 h-3.5 text-[#6da3f0] shrink-0" />
                <span>020 7123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#c2c6d6]">
                <MapPin className="w-3.5 h-3.5 text-[#6da3f0] shrink-0" />
                <span>London, United Kingdom</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#c2c6d6]">
                <Clock className="w-3.5 h-3.5 text-[#6da3f0] shrink-0" />
                <span>24/7 Operations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1d2d44] pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-[#6b7a9e]">
            <span>© 2026 MoveVan Pro London. All rights reserved.</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
