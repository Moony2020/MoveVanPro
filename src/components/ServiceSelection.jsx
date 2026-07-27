import React, { useState } from 'react';
import { 
  Truck, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight, Phone, 
  Award, Clock, MapPin, Zap, Star, Users, ChevronRight, Lock, Map, Menu, X
} from 'lucide-react';

export default function ServiceSelection({ onSelectService, onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans antialiased selection:bg-[#0058be] selection:text-white">

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#e5eeff]/90 via-[#eff4ff] to-[#f8f9ff] py-12 md:py-20 border-b border-[#c2c6d6]/40">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#0058be_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-12">
              {/* Left Column: Headline, CTA & Trust Badges */}
              <div className="lg:col-span-6 xl:col-span-7 flex flex-col text-left">
                {/* Top Verified Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[#0058be] mb-6 border border-[#adc6ff] shadow-sm text-xs font-extrabold tracking-wide uppercase w-fit">
                  <ShieldCheck className="w-4 h-4 text-[#0058be]" />
                  Greater London Enterprise Logistics & Priority Dispatch
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-[#0b1c30] mb-6 leading-[1.15] tracking-tight">
                  Moving Made Easy.<br />
                  <span className="bg-gradient-to-r from-[#0058be] via-[#2170e4] to-[#825100] bg-clip-text text-transparent">
                    We Move, You Relax.
                  </span>
                </h1>

                <p className="text-base md:text-lg text-[#424754] max-w-xl mb-8 leading-relaxed font-normal">
                  Professional moving services with van, driver, and movers across London. Or get fast, guaranteed vehicle recovery with our roadside tow trucks — anytime, anywhere.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3.5 mb-10 w-full sm:w-auto">
                  <button 
                    onClick={() => onSelectService('moving')}
                    className="bg-[#0058be] hover:bg-[#2170e4] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer group whitespace-nowrap"
                  >
                    <Truck className="w-5 h-5 group-hover:scale-110 transition-transform shrink-0" />
                    <span>Book a Moving Van</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>

                  <button 
                    onClick={() => onSelectService('towing')}
                    className="bg-white hover:bg-[#eff4ff] text-[#0b1c30] border-2 border-[#c2c6d6] hover:border-[#825100] px-7 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm group whitespace-nowrap"
                  >
                    <AlertTriangle className="w-5 h-5 text-[#825100] group-hover:scale-110 transition-transform shrink-0" />
                    <span>Request Towing</span>
                    <ArrowRight className="w-4 h-4 text-[#825100] group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                </div>

                {/* Trust Features Grid (Matching Stitch Screenshot) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#c2c6d6]/60">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#424754]">
                    <div className="w-7 h-7 rounded-lg bg-white border border-[#c2c6d6] flex items-center justify-center text-[#0058be] shrink-0">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <span>Professional Staff</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#424754]">
                    <div className="w-7 h-7 rounded-lg bg-white border border-[#c2c6d6] flex items-center justify-center text-[#0058be] shrink-0">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <span>Secure Payments</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#424754]">
                    <div className="w-7 h-7 rounded-lg bg-white border border-[#c2c6d6] flex items-center justify-center text-[#0058be] shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span>Real-Time Tracking</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#424754]">
                    <div className="w-7 h-7 rounded-lg bg-white border border-[#c2c6d6] flex items-center justify-center text-[#0058be] shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span>24/7 Dispatch</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Featured Hero Van Showcase Image (Matching User Screenshot) */}
              <div className="lg:col-span-6 xl:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden border-2 border-white shadow-2xl bg-white group">
                  <div className="h-[360px] sm:h-[420px] w-full relative overflow-hidden">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJNYdXeEr0han0h1NHMavpDAWCDpxsXEL-nvPfBqVUbnWpcLZVVdwj-SsBrjkldP6xfugvAzEOsLeDhICcOQlbN0rYeYatClZtezgk2rb79yKUBT71mlUJdR5x978aqXNUoaVdEalFdPKWsPWMR8GPIOW7Zr-NLlWWFpmX_KBEgMi5ivQW7DP5IzCn5yduZY1JejBPxqLhX7kwayBtWPftx1fZnkV1dw-Xjf6MrcuDL0npSQyC8_IxSP80S-wVms7KB8DgRExmK5DH" 
                      alt="Modern blue and white Sprinter moving van with professional movers loading furniture outside a home"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/80 via-transparent to-transparent" />

                    {/* Floating Status Badges on Hero Image */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#0058be] shadow-md flex items-center gap-2 border border-[#adc6ff]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      100% Owned London Fleet
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#c2c6d6] shadow-xl flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0058be] text-white flex items-center justify-center shrink-0">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-extrabold text-[#0b1c30] block">Sprinter & Luton Box Vans</span>
                          <span className="text-[11px] text-[#424754] font-medium">Uniformed Movers • Insured Equipment</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-[#0058be] bg-[#eff4ff] px-2.5 py-1 rounded-lg border border-[#0058be]/20">
                        London W1
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto w-full bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-[#c2c6d6]/70 shadow-md">
              <div className="flex flex-col items-center p-2 border-r border-[#c2c6d6]/40 last:border-0">
                <span className="text-2xl md:text-3xl font-extrabold text-[#0058be]">14 Mins</span>
                <span className="text-xs font-bold text-[#565e74] mt-1">Avg London Tow Dispatch</span>
              </div>
              <div className="flex flex-col items-center p-2 border-r border-[#c2c6d6]/40 last:border-0">
                <span className="text-2xl md:text-3xl font-extrabold text-[#0b1c30]">100%</span>
                <span className="text-xs font-bold text-[#565e74] mt-1">Owned Enterprise Fleet</span>
              </div>
              <div className="flex flex-col items-center p-2 border-r border-[#c2c6d6]/40 last:border-0">
                <span className="text-2xl md:text-3xl font-extrabold text-[#825100] flex items-center gap-1">
                  4.9 <Star className="w-5 h-5 fill-current text-amber-500" />
                </span>
                <span className="text-xs font-bold text-[#565e74] mt-1">12,500+ London Moves</span>
              </div>
              <div className="flex flex-col items-center p-2">
                <span className="text-2xl md:text-3xl font-extrabold text-emerald-600 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  24/7
                </span>
                <span className="text-xs font-bold text-[#565e74] mt-1">Active Dispatch Control</span>
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

            <div className="flex-1 w-full relative h-[340px] rounded-3xl overflow-hidden border-2 border-[#c2c6d6] shadow-xl group">
              <iframe 
                title="Central London Fleet Coverage Map"
                className="w-full h-full border-0 grayscale-[0.1] contrast-[1.05]"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.25%2C51.46%2C-0.01%2C51.56&amp;layer=mapnik"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#0058be] shadow-md flex items-center gap-2 border border-[#adc6ff] pointer-events-none">
                <MapPin className="w-4 h-4 text-[#0058be]" />
                London, UK • Central Operational Zone
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1c30]/90 via-[#0b1c30]/40 to-transparent p-4 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#c2c6d6] shadow-md w-full flex justify-between items-center pointer-events-auto">
                  <div>
                    <span className="text-xs font-bold text-[#0b1c30] block">Greater London Live Fleet</span>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      18 Active Moving Vans & Tow Trucks On Standby
                    </span>
                  </div>
                  <button 
                    onClick={() => onNavigateTo('dispatch')}
                    className="bg-[#0058be] hover:bg-[#2170e4] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
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
