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
      <style>{`
        @media (max-width: 786px) {
          .hero-pills-mobile {
            bottom: 175px !important;
          }
        }
        @media (max-width: 640px) {
          .hero-pills-mobile {
            bottom: 155px !important;
          }
          .hero-buttons-mobile {
            margin-top: 170px !important;
          }
          .hero-van-mobile {
            top: calc(50% - 30px) !important;
            width: 80% !important;
          }
          .hero-trust-mobile {
            margin-top: 45px !important;
          }
        }
        @media (max-width: 500px) {
          .hero-section-mobile {
            min-height: 350px !important;
          }
          .hero-container-mobile {
            min-height: 350px !important;
          }
          .hero-van-mobile {
            top: 50% !important;
            width: 96% !important;
          }
          .hero-buttons-mobile {
            margin-top: 135px !important;
          }
          .hero-trust-mobile {
            margin-top: -8px !important;
          }
          .hero-trust-grid-mobile {
            padding-top: 12px !important;
          }
        }
      `}</style>

      <main className="flex-grow">
        {/* Modern Mesh Gradient Hero Section */}
        <section className="relative overflow-hidden pt-6 pb-8 xl:pb-10 mesh-bg border-b border-slate-200/80 text-slate-900 min-h-[600px] lg:min-h-[650px] xl:min-h-[667px] flex flex-col justify-start hero-section-mobile">
          {/* Ambient Background Radial Glow Blobs */}
          <div className="absolute top-10 right-[10%] w-96 h-96 bg-[#0058be]/15 rounded-full blur-3xl pointer-events-none z-0" />
          <div className="absolute bottom-10 left-[5%] w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-0" />

          {/* White shadow/glow backdrop behind text on screens <= 1280px to make text 100% clear and readable */}
          <div className="absolute inset-y-0 left-0 w-[65%] sm:w-[60%] md:w-[55%] lg:w-[65%] xl:hidden bg-gradient-to-r from-white/90 via-white/50 to-transparent pointer-events-none z-10" />
 
          {/* 3D Hero Van Visual Background (High Opacity on Desktop, Low Opacity on Tablet/Mobile) */}
          <div 
            className="absolute right-[-35px] max-[500px]:right-[-25px] md:right-[3%] lg:right-[2%] xl:right-[1.5%] top-1/2 sm:top-[calc(50%+10px)] md:top-1/2 md:max-[1024px]:top-[55%] -translate-y-1/2 w-[94%] max-[500px]:w-[96%] sm:w-[74%] md:w-[66%] lg:w-[52%] xl:w-[48%] max-w-6xl h-auto pointer-events-none z-0 flex justify-end opacity-72 sm:opacity-65 lg:opacity-75 xl:opacity-95 hero-van-mobile"
          >
            <img 
              src="/hero-image.png" 
              alt="MoveVan Pro Professional Service Fleet" 
              className="w-full h-auto object-contain drop-shadow-2xl -translate-x-1 sm:-translate-x-3 lg:-translate-x-5 scale-122 max-[500px]:scale-124 sm:scale-110 lg:scale-115"
            />
          </div>

          {/* Stat Pills Positioned on the Left Side on Mobile/Tablet, Right Side on Desktop (Elevated to avoid trust bar overlap) */}
          <div className="absolute left-6 lg:left-auto lg:right-12 bottom-[140px] sm:bottom-[125px] md:bottom-[110px] md:max-[1024px]:bottom-[115px] lg:bottom-[118px] max-sm:bottom-[175px] z-20 hidden min-[501px]:flex flex-col min-[501px]:flex-row items-start lg:items-center gap-2 min-[501px]:gap-3 hero-pills-mobile">
            <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/90 shadow-md flex items-center gap-2 text-xs font-bold text-slate-800">
              <Clock className="w-4 h-4 text-[#0058be]" />
              <span>Avg. Response: <strong className="text-[#0058be] font-playfair font-bold">24 Mins</strong></span>
            </div>
            <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/90 shadow-md flex items-center gap-2 text-xs font-bold text-slate-800">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Rating: <strong className="text-amber-700 font-playfair font-bold">4.9/5 Trustpilot</strong></span>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full flex-grow flex flex-col justify-between max-md:min-h-[600px] hero-container-mobile">
            <div className="max-w-xl text-left flex flex-col relative z-10">
              {/* Verified Logistics Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-[#0058be] mb-4 sm:mb-5 border border-[#0058be]/20 shadow-2xs self-start">
                <ShieldCheck className="w-4 h-4 text-[#0058be]" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider">Elite Logistics &amp; Recovery</span>
              </div>

              {/* Headlines (Playfair Serif Display Font Style) */}
              <h1 className="text-4xl sm:text-5xl md:text-[58px] leading-[1.08] font-extrabold mb-1 text-[#0b1c30] font-playfair tracking-tight">
                Moving Made Easy.
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold mb-4 sm:mb-5 text-[#0058be] font-playfair tracking-tight">
                We Move, You Relax.
              </h2>

              {/* Paragraph */}
              <p className="text-base md:text-lg text-[#0b1c30]/95 leading-relaxed font-semibold max-w-xl mb-6 font-['Roboto'] [text-shadow:0_0_4px_#fff,0_0_8px_#fff,0_0_16px_#fff,0_0_24px_#fff]">
                Experience white-glove logistics with our professional fleet. From seamless residential moves to urgent 24/7 recovery, we handle the heavy lifting with precision.
              </p>


              {/* Action Buttons (Playfair Serif Display Font Style - Smaller & Pushed Down on Mobile/Tablet <= 1024px) */}
              <div className="flex flex-row items-center justify-start gap-2.5 mb-5 w-full max-w-[310px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] mt-24 max-[500px]:mt-[134px] sm:mt-24 md:mt-14 md:max-[1024px]:mt-20 lg:mt-8 hero-buttons-mobile">
                <button 
                  onClick={() => onSelectService('moving')}
                  className="flex-1 bg-[#0058be] hover:bg-[#2170e4] text-white px-4 py-2.5 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 rounded-xl font-playfair font-bold text-[12px] sm:text-[13px] md:text-sm lg:text-sm transition-all duration-300 shadow-md shadow-[#0058be]/20 flex items-center justify-center gap-1.5 hover:scale-[1.02] cursor-pointer group tracking-tight"
                >
                  <Truck className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5 group-hover:translate-x-1 transition-transform shrink-0" />
                  <span className="whitespace-nowrap font-bold">Book a Move</span>
                </button>

                <div className="relative flex-1 group">
                  <button 
                    onClick={() => onSelectService('towing')}
                    className="w-full glass-card text-[#0b1c30] border border-slate-300/80 px-4 py-2.5 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 rounded-xl font-playfair font-bold text-[12px] sm:text-[13px] md:text-sm lg:text-sm hover:bg-white transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs tracking-tight"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5 text-amber-700 group-hover:translate-x-1 transition-transform shrink-0" />
                    <span className="whitespace-nowrap font-bold">Emergency Towing</span>
                  </button>
                  <div className="absolute -top-3 -right-1 bg-[#825100] text-white text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-md border border-[#ffddb8] flex items-center gap-0.5 animate-bounce z-20 pointer-events-none">
                    <Zap className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-amber-300" />
                    Rapid Response
                  </div>
                </div>
              </div>

              {/* Active Vehicles Indicator */}
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 mb-0 max-[500px]:mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>142 Vehicles Active in London</span>
              </div>
            </div>


            {/* Transparent Trust Features Bar (No White Background Card) */}
            <div className="mt-auto max-[1024px]:mt-20 md:max-[1024px]:mt-20 max-sm:mt-28 hero-trust-mobile">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-6 max-[1024px]:pt-6 hero-trust-grid-mobile">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center text-[#0058be] shrink-0">
                    <Users className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block whitespace-nowrap">Professional Staff</span>
                    <span className="text-[11px] text-slate-500 block leading-tight font-normal">Trained drivers &amp; movers</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center text-[#0058be] shrink-0">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block whitespace-nowrap">Secure Payments</span>
                    <span className="text-[11px] text-slate-500 block leading-tight font-normal">Pay via Stripe</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center text-[#0058be] shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block whitespace-nowrap">Real-time Tracking</span>
                    <span className="text-[11px] text-slate-500 block leading-tight font-normal">Live GPS dispatch</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center text-[#0058be] shrink-0">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block whitespace-nowrap">24/7 Support</span>
                    <span className="text-[11px] text-slate-500 block leading-tight font-normal">Here anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated Service Cards Section - Positioned Cleanly Below Hero */}
        <section className="py-12 bg-slate-50/80 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Moving Services Card */}
              <div 
                onClick={() => onSelectService('moving')}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 flex items-start gap-4 cursor-pointer hover:border-[#0058be] hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-[#0058be] flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-playfair font-extrabold text-lg text-[#0b1c30] mb-1">Moving Services</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    Residential and commercial logistics handled by professionals. Van with driver and up to 2 movers.
                  </p>
                  <span className="text-xs font-extrabold text-[#0058be] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    Get Quote <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Roadside Recovery Card */}
              <div 
                onClick={() => onSelectService('towing')}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 flex items-start gap-4 cursor-pointer hover:border-amber-500 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#fff7ed] border border-[#ffddb8] text-amber-700 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-playfair font-extrabold text-lg text-[#0b1c30] mb-1">Roadside Recovery</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    Specialized flatbed transport for any vehicle emergency. 24/7 fast dispatch across Greater London.
                  </p>
                  <span className="text-xs font-extrabold text-amber-700 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    Book Rescue <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Service Cards Section */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0b1c30] mb-3 font-playfair">Our Core London Services</h2>
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
                    <h3 className="text-2xl font-bold text-[#0b1c30] mb-1 font-playfair">Professional Moving</h3>
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
                  className="w-full bg-[#0058be] hover:bg-[#2170e4] text-white py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md group/btn font-playfair"
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
                    <h3 className="text-2xl font-bold text-[#0b1c30] mb-1 font-playfair">Roadside Recovery</h3>
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
                  className="w-full bg-[#825100] hover:bg-[#a36700] text-white py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md group/btn font-playfair"
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0058be]/10 text-[#0058be] text-xs font-bold">
                <MapPin className="w-4 h-4" />
                London Boroughs & M25 Motorway
              </div>
              <h2 className="text-3xl font-extrabold text-[#0b1c30] font-playfair">Full Greater London Coverage</h2>
              <p className="text-sm text-[#424754] leading-relaxed">
                Our fleet is strategically stationed across Kensington, City of London, Canary Wharf, Camden, Westminster, and the M25 orbital corridor to guarantee immediate dispatch.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs font-bold text-[#0b1c30]">
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#c2c6d6]/60 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">Central & West London</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#c2c6d6]/60 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">Canary Wharf & Docklands</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#c2c6d6]/60 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">North & South London</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#c2c6d6]/60 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span className="truncate">M25 Heathrow Corridor</span>
                </div>
              </div>
            </div>

            <div className="w-full relative h-[320px] sm:h-[360px] lg:h-[350px] rounded-3xl overflow-hidden border-2 border-[#c2c6d6] shadow-xl group bg-[#eef2f7]">
              <iframe 
                title="Central London Fleet Coverage Map"
                className="w-full h-full border-0 contrast-[1.08] saturate-[1.25] brightness-[1.02]"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.35%2C51.35%2C0.05%2C51.65&amp;layer=mapnik"
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
              <h2 className="text-3xl font-extrabold mb-3 font-playfair">Why MoveVan Pro London?</h2>
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
