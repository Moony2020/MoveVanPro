import React, { useState } from 'react';
import { 
  Truck, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight, Phone, 
  Award, Clock, MapPin, Zap, Star, Users, ChevronRight, Lock, Map, Menu, X, Car 
} from 'lucide-react';

export default function ServiceSelection({ onSelectService, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans antialiased selection:bg-[#0058be] selection:text-white">

      <main className="flex-grow">
        {/* Full-Width Background Layout using hero-image.png (As requested) */}
        <section className="relative overflow-hidden min-h-[680px] lg:min-h-[740px] flex flex-col justify-center py-16 md:py-24 bg-[#0b1c30] border-b border-slate-800">
          {/* Background Layer: Single Full-screen Image */}
          <div className="absolute inset-0 z-0 select-none">
            <img 
              src="/hero-image.png" 
              alt="Professional Logistics and Roadside Recovery Services"
              className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05]"
            />
            {/* Soft Blue Shadow & Gradient Overlay for optimal text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c30]/75 via-[#0b1c30]/45 to-transparent z-1 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/90 via-transparent to-[#0b1c30]/30 z-1 pointer-events-none" />
          </div>

          {/* Foreground Overlay Content Layer (Shifted ~6% to the right for optimal breathing room) */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full">
            <div className="max-w-3xl ml-0 md:ml-[5%] lg:ml-[7%] text-left">
              {/* Verified Logistics Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0058be]/30 backdrop-blur-md text-[#adc6ff] mb-6 border border-[#0058be]/40 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#adc6ff]" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Professional Logistics &amp; Recovery</span>
              </div>

              {/* Headlines */}
              <h1 className="text-4xl sm:text-5xl md:text-[58px] leading-tight font-bold mb-2 text-white drop-shadow-xl font-['Playfair_Display']">
                Moving Made Easy.
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold mb-6 text-[#adc6ff] drop-shadow-md font-['Playfair_Display']">
                We Move, You Relax.
              </h2>

              {/* Reduced Paragraph Width for Scannability & Clean Composition */}
              <p className="text-base md:text-lg text-slate-200 max-w-md mb-8 drop-shadow-md leading-relaxed font-normal">
                Professional moving services with van, driver and movers. Or get fast vehicle recovery with our tow trucks – anytime, anywhere.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => onSelectService('moving')}
                  className="bg-[#0058be] text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-[#2170e4] transition-all duration-300 shadow-xl shadow-[#0058be]/30 flex items-center justify-center gap-3 group cursor-pointer"
                >
                  <Truck className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Book a Move
                </button>

                <button 
                  onClick={() => onSelectService('towing')}
                  className="bg-white/10 backdrop-blur-lg text-white border border-white/30 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-white/20 transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group cursor-pointer"
                >
                  <AlertTriangle className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  Book a Tow Truck
                </button>
              </div>

              {/* Side-by-Side Mini Service Cards (Balanced Glassmorphism Style) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mb-8">
                {/* Card 1: Moving Services */}
                <div 
                  onClick={() => onSelectService('moving')}
                  className="bg-[#071220]/60 backdrop-blur-lg border border-white/20 rounded-2xl p-5 flex gap-4 cursor-pointer hover:border-[#3b82f6] hover:bg-[#071220]/80 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 text-[#3b82f6] flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-1">Moving Services</h4>
                    <p className="text-[12px] text-slate-300 leading-tight mb-2 font-normal">
                      Van with driver and up to 2 movers for homes, apartments and offices.
                    </p>
                    <span className="text-[12px] font-bold text-[#3b82f6] flex items-center gap-1 group-hover:underline">
                      Get a Quote <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Card 2: Roadside Recovery */}
                <div 
                  onClick={() => onSelectService('towing')}
                  className="bg-[#071220]/60 backdrop-blur-lg border border-white/20 rounded-2xl p-5 flex gap-4 cursor-pointer hover:border-emerald-400 hover:bg-[#071220]/80 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 text-emerald-400 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-1">Roadside Recovery</h4>
                    <p className="text-[12px] text-slate-300 leading-tight mb-2 font-normal">
                      Fast vehicle recovery and transport with our flatbed tow trucks.
                    </p>
                    <span className="text-[12px] font-bold text-emerald-400 flex items-center gap-1 group-hover:underline">
                      Book Rescue <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Features Bar */}
            <div className="border-t border-white/20 pt-8 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1: Professional Staff */}
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#071220]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#3b82f6] shrink-0 shadow-sm">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-xs text-white block mb-0.5">Professional Staff</span>
                  <span className="text-[11px] text-slate-300 block leading-tight">Trained and verified drivers &amp; movers</span>
                </div>
              </div>

              {/* Feature 2: Secure Payments */}
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#071220]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#3b82f6] shrink-0 shadow-sm">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-xs text-white block mb-0.5">Secure Payments</span>
                  <span className="text-[11px] text-slate-300 block leading-tight">Pay online securely with Stripe</span>
                </div>
              </div>

              {/* Feature 3: Real-time Tracking */}
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#071220]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#3b82f6] shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-xs text-white block mb-0.5">Real-time Tracking</span>
                  <span className="text-[11px] text-slate-300 block leading-tight">Track your driver or tow truck live</span>
                </div>
              </div>

              {/* Feature 4: 24/7 Support */}
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#071220]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#3b82f6] shrink-0 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-xs text-white block mb-0.5">24/7 Support</span>
                  <span className="text-[11px] text-slate-300 block leading-tight">We're here for you anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Cards Section */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0b1c30] mb-3">Our Core London Services</h2>
            <p className="text-sm text-[#565e74] max-w-xl mx-auto">
              Select your required service below for an instant, transparent quote powered by our London dispatch platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Moving Service Card */}
            <div className="bg-white rounded-3xl border-2 border-[#c2c6d6]/80 overflow-hidden group hover:border-[#0058be] hover:shadow-2xl transition-all duration-300 flex flex-col relative">
              <div className="h-72 w-full relative overflow-hidden bg-[#eff4ff]">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJNYdXeEr0han0h1NHMavpDAWCDpxsXEL-nvPfBqVUbnWpcLZVVdwj-SsBrjkldP6xfugvAzEOsLeDhICcOQlbN0rYeYatClZtezgk2rb79yKUBT71mlUJdR5x978aqXNUoaVdEalFdPKWsPWMR8GPIOW7Zr-NLlWWFpmX_KBEgMi5ivQW7DP5IzCn5yduZY1JejBPxqLhX7kwayBtWPftx1fZnkV1dw-Xjf6MrcuDL0npSQyC8_IxSP80S-wVms7KB8DgRExmK5DH" 
                  alt="A clean, modern blue and white moving van with uniformed professional movers loading furniture"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/80 via-transparent to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#0058be] shadow-md flex items-center gap-2 border border-[#adc6ff]">
                  <Truck className="w-4 h-4" />
                  London Moving Fleet Active
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0b1c30] mb-1">Professional Moving</h3>
                    <p className="text-xs text-[#565e74]">Home, apartment, and commercial office relocations across London.</p>
                  </div>
                  <div className="p-3 bg-[#dce9ff] text-[#0058be] rounded-2xl shrink-0">
                    <Truck className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-[#f8f9ff] rounded-2xl p-5 mb-8 border border-[#c2c6d6]/60 flex-grow space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#0b1c30] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#0058be] shrink-0" />
                    <span>Luton Box Vans, Heavy Vans + 1 or 2 Salaried Movers</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#0b1c30] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#0058be] shrink-0" />
                    <span>Real-time itemized inventory calculator & instant price lock</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#0b1c30] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#0058be] shrink-0" />
                    <span>Live GPS crew tracking from pickup to destination</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#0b1c30] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#0058be] shrink-0" />
                    <span>Stripe-secured instant booking with zero hidden fees</span>
                  </div>
                </div>

                <button 
                  onClick={() => onSelectService('moving')}
                  className="w-full bg-[#0058be] hover:bg-[#2170e4] text-white py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md group/btn"
                >
                  Configure Moving Quote
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Towing / Recovery Service Card */}
            <div className="bg-white rounded-3xl border-2 border-[#c2c6d6]/80 overflow-hidden group hover:border-[#825100] hover:shadow-2xl transition-all duration-300 flex flex-col relative">
              <div className="h-72 w-full relative overflow-hidden bg-[#eff4ff]">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp6IZfWJigGdzAE4NOsZ2QxCp-jGXzhTdAutKRzCNdezRpL9r8sXIxpVAJlO03v7EfoCcdFF4Whovr3q-K1g-pvMDDRY3D19eqJBWl1h6QgBH729xAUnp_LL2gG63cAexFdBP3uMMhX-SIuoppLXPKl38d7ysf3_lCiwG4xgJQXkO4P2h7o5qn8xFgeslyhkRM31tnv5UXOP-4xyyR14NCS9S9rvCsEtvqR5WjJfmBD9yQ2qomUXGrRPiBokzCHWUujWwMkgI2QRvl" 
                  alt="A modern heavy-duty flatbed tow truck with flashing amber caution lights attending to roadside recovery"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/80 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#825100] shadow-md flex items-center gap-2 border border-[#ffddb8]">
                  <AlertTriangle className="w-4 h-4 text-[#825100]" />
                  Priority Towing Dispatch Ready
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0b1c30] mb-1">Roadside Recovery</h3>
                    <p className="text-xs text-[#565e74]">Rapid emergency breakdown, EV, and accident recovery in London.</p>
                  </div>
                  <div className="p-3 bg-[#ffddb8] text-[#825100] rounded-2xl shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-[#f8f9ff] rounded-2xl p-5 mb-8 border border-[#c2c6d6]/60 flex-grow space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#0b1c30] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#825100] shrink-0" />
                    <span>14-Minute Average Priority Dispatch ETA across London & M25</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#0b1c30] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#825100] shrink-0" />
                    <span>Flatbed & Wheel-lift trucks for EV, SUV, Luxury & Commercial</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#0b1c30] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#825100] shrink-0" />
                    <span>Instant photo damage upload & condition assessment</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#0b1c30] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#825100] shrink-0" />
                    <span>No upfront payment required — pay when tow driver arrives</span>
                  </div>
                </div>

                <button 
                  onClick={() => onSelectService('towing')}
                  className="w-full bg-[#825100] hover:bg-[#a36700] text-white py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md group/btn"
                >
                  Request Emergency Recovery
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* London Coverage Map Section */}
        <section className="py-16 bg-[#eff4ff] border-y border-[#c2c6d6]/50">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0058be]/10 text-[#0058be] text-xs font-bold">
                <MapPin className="w-4 h-4" />
                London Boroughs & M25 Motorway
              </div>
              <h2 className="text-3xl font-extrabold text-[#0b1c30]">Full Greater London Coverage</h2>
              <p className="text-sm text-[#424754] leading-relaxed">
                Our fleet is strategically stationed across Kensington, City of London, Canary Wharf, Camden, Westminster, and the M25 orbital corridor to guarantee immediate dispatch.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs font-bold text-[#0b1c30]">
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#c2c6d6]/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Central & West London
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#c2c6d6]/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Canary Wharf & Docklands
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#c2c6d6]/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  North & South London
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#c2c6d6]/60">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  M25 Heathrow Corridor
                </div>
              </div>
            </div>

            <div className="flex-1 w-full relative h-[300px] sm:h-[340px] lg:h-[320px] rounded-3xl overflow-hidden border-2 border-[#c2c6d6] shadow-xl group bg-[#eef2f7]">
              <iframe 
                title="Central London Fleet Coverage Map"
                className="w-full h-full border-0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.35%2C51.30%2C0.10%2C51.70&amp;layer=mapnik"
              />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold text-[#0058be] shadow-md flex items-center gap-2 border border-[#adc6ff] pointer-events-none z-10">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0058be]" />
                London, UK • Central Operational Zone
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1c30]/90 via-[#0b1c30]/40 to-transparent p-3 sm:p-4 pointer-events-none z-10">
                <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-[#c2c6d6] shadow-md w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5 sm:gap-4 pointer-events-auto">
                  <div>
                    <span className="text-xs font-bold text-[#0b1c30] block">Greater London Live Fleet</span>
                    <span className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      18 Active Moving Vans & Tow Trucks On Standby
                    </span>
                  </div>
                  <button 
                    onClick={() => onNavigateTo('dispatch')}
                    className="w-full sm:w-auto bg-[#0058be] hover:bg-[#2170e4] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap text-center"
                  >
                    View Dispatch Board
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Trust Features */}
        <section className="bg-[#0b1c30] text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold mb-3">Why MoveVan Pro London?</h2>
              <p className="text-sm text-[#adc6ff]">We are an enterprise operator with our own fleet — zero third-party gig workers.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#213145]/70 border border-[#3f465c] p-8 rounded-3xl hover:border-[#0058be] transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-[#0058be]/20 text-[#adc6ff] flex items-center justify-center mb-6 border border-[#0058be]/40">
                  <Truck className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-xl mb-3">100% Owned Fleet</h4>
                <p className="text-xs text-[#c2c6d6] leading-relaxed">
                  Every van and tow truck is enterprise-maintained, equipped with GPS telemetry and protective moving equipment.
                </p>
              </div>

              <div className="bg-[#213145]/70 border border-[#3f465c] p-8 rounded-3xl hover:border-[#0058be] transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-[#0058be]/20 text-[#adc6ff] flex items-center justify-center mb-6 border border-[#0058be]/40">
                  <Award className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-xl mb-3">Trained Salaried Staff</h4>
                <p className="text-xs text-[#c2c6d6] leading-relaxed">
                  Full-time salaried movers and licensed recovery technicians, trained in heavy lifting and damage prevention.
                </p>
              </div>

              <div className="bg-[#213145]/70 border border-[#3f465c] p-8 rounded-3xl hover:border-[#0058be] transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-[#0058be]/20 text-[#adc6ff] flex items-center justify-center mb-6 border border-[#0058be]/40">
                  <Clock className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-xl mb-3">Transparent Instant Quoting</h4>
                <p className="text-xs text-[#c2c6d6] leading-relaxed">
                  Algorithmic distance and inventory quoting. Clear breakdown of hourly, distance, and mover rates.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-[#c2c6d6] py-8 text-center text-xs text-[#424754]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0058be]">MoveVan Pro London</span>
            <span>© 2026 Corporate Logistics & Emergency Recovery Platform.</span>
          </div>
          <div className="flex gap-6 font-semibold">
            <button onClick={() => onNavigateTo('moving')} className="hover:underline">Moving</button>
            <button onClick={() => onNavigateTo('towing')} className="hover:underline">Towing</button>
            <button onClick={() => onNavigateTo('dispatch')} className="hover:underline">Dispatcher</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
