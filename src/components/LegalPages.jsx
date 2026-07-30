import React from 'react';
import { Shield, FileText, ArrowLeft, Lock, Scale, Eye } from 'lucide-react';

export default function LegalPages({ view, onNavigateTo }) {
  const isPrivacy = view === 'privacy';

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans antialiased">
      <main className="flex-grow max-w-4xl mx-auto px-6 pt-6 pb-12 md:pt-8 md:pb-20">
        {/* Back navigation */}
        <button 
          onClick={() => onNavigateTo('landing')}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#0058be] hover:text-[#2170e4] transition-colors mb-4 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        {/* Article Container */}
        <article className="bg-white border border-slate-200/90 rounded-3xl p-8 md:p-12 shadow-md">
          {/* Header */}
          <div className="border-b border-slate-100 pb-8 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#eff4ff] text-[#0058be] flex items-center justify-center mb-6 border border-[#dce9ff]">
              {isPrivacy ? <Shield className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-playfair text-[#0b1c30] mb-3">
              {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Last Updated: July 30, 2026 • Version 1.4 (London Corporate Zone Operations)
            </p>
          </div>

          {/* Policy / Terms Content */}
          {isPrivacy ? (
            <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-sans">
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0b1c30] flex items-center gap-2 font-playfair">
                  <Lock className="w-4 h-4 text-[#0058be]" /> 1. Data Collection and Collection Methods
                </h2>
                <p>
                  MoveVan Pro London operates an enterprise logistics platform. We collect your personal information to facilitate vehicle dispatch, route planning, real-time crew assignment, and payment processing.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-500">
                  <li>Contact Info: Name, corporate entity registration, email address, phone number.</li>
                  <li>Location Coordinates: Pickup addresses, drop-off targets, real-time route waypoints.</li>
                  <li>Payment Information: Secure tokenized processing data through Stripe. We do not store raw card numbers.</li>
                  <li>Device Details: IP addresses, browser agents, dispatch request signatures.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0b1c30] flex items-center gap-2 font-playfair">
                  <Eye className="w-4 h-4 text-[#0058be]" /> 2. Use of Information
                </h2>
                <p>
                  Your information is utilized strictly to provide a premier corporate transport experience:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-500">
                  <li>Executing algorithmic transit pricing calculation.</li>
                  <li>Assigning salaried drivers, heavy cargo vans, or emergency flatbed recovery units.</li>
                  <li>Delivering live GPS updates and telemetry link invitations via SMS.</li>
                  <li>Managing dispatch board queues and handling incident resolution claims.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0b1c30] flex items-center gap-2 font-playfair">
                  <Shield className="w-4 h-4 text-[#0058be]" /> 3. Data Protection and Retention
                </h2>
                <p>
                  All active communication, client records, and dispatch configurations are encrypted in transit using TLS 1.3 and at rest with AES-256 standards. Our operational interfaces comply with strict PCI-DSS guidelines.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0b1c30] flex items-center gap-2 font-playfair">
                  <Scale className="w-4 h-4 text-[#0058be]" /> 4. GDPR Rights and Regulatory Inquiries
                </h2>
                <p>
                  As a platform operating in Greater London, United Kingdom, we comply with the UK Data Protection Act (DPA) and General Data Protection Regulation (GDPR). Customers have the right to request deletion of their records, export metadata profiles, or withdraw dispatch tracking authorizations.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-sans">
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0b1c30] flex items-center gap-2 font-playfair">
                  <Scale className="w-4 h-4 text-[#0058be]" /> 1. Operational Framework and Services
                </h2>
                <p>
                  MoveVan Pro London operates an enterprise vertically integrated fleet platform. By utilizing our site to order moving vans, configure residential transit layout, or dispatch roadside recovery, you agree to these Terms of Service.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0b1c30] flex items-center gap-2 font-playfair">
                  <FileText className="w-4 h-4 text-[#0058be]" /> 2. Booking Rates and Algorithmic Quoting
                </h2>
                <p>
                  Quotes are calculated algorithmically based on travel distance, vehicle type, and inventory count selected. 
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-500">
                  <li><strong>Price Lock:</strong> Once authorized, rates are locked based on the specified items. Any extra inventory added at pickup will incur supplemental charges.</li>
                  <li><strong>Cancellations:</strong> Bookings canceled less than 24 hours prior to scheduled dispatch are subject to a 50% reservation hold fee.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0b1c30] flex items-center gap-2 font-playfair">
                  <Shield className="w-4 h-4 text-[#0058be]" /> 3. Cargo Insurance & Liability
                </h2>
                <p>
                  Every transport task includes up to £100,000 in goods-in-transit corporate cargo protection coverage. We do not assume liability for improperly packed goods, hazardous cargo materials, or valuables not disclosed in the pre-transit inventory list.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#0b1c30] flex items-center gap-2 font-playfair">
                  <Lock className="w-4 h-4 text-[#0058be]" /> 4. Emergency Recovery and Dispatch Zones
                </h2>
                <p>
                  Roadside towing dispatch operates under priority emergency rules. The user must provide accurate location coordinates (such as GPS tags or UK postcodes). The vehicle operator must match structural parameters declared during order.
                </p>
              </section>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
