import React from 'react';
import { BookOpen, Layers, Code, Palette, Cpu, CheckCircle } from 'lucide-react';

export default function PRDSummaryView({ onNavigateTo }) {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans pb-16">

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Title Header */}
        <div className="bg-white border border-[#c2c6d6] rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 text-[#0058be] mb-2">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Official Product Specification</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0b1c30]">
            MoveVan Pro Logistics Platform Specification
          </h1>
          <p className="text-sm text-[#424754] mt-2 leading-relaxed">
            Stitch Project Identifier: <code className="bg-[#eff4ff] text-[#0058be] px-2 py-0.5 rounded font-mono text-xs font-bold">17055755600716269167</code>
          </p>
        </div>

        {/* PRD Sections Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Section 1: Core Vision & Business Logic */}
          <div className="bg-white border border-[#c2c6d6] rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-[#0b1c30] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#0058be]" />
              Core Product Vision
            </h3>
            <p className="text-xs text-[#424754] leading-relaxed">
              MoveVan Pro is an enterprise vertically integrated SaaS platform for professional moving and roadside emergency recovery. 
              Unlike marketplace aggregators (Uber-for-X), MoveVan Pro owns its fleet and employs salaried drivers and movers to maintain corporate quality.
            </p>

            <div className="border-t border-[#eff4ff] pt-3 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#0058be] shrink-0 mt-0.5" />
                <span><strong>Customer Portal:</strong> Dual-path booking (Moving vs Towing), instant pricing calculation, live tracking.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#0058be] shrink-0 mt-0.5" />
                <span><strong>Dispatcher Command Center:</strong> Live map telemetry, drag-and-drop schedule board, auto-dispatch matching.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#0058be] shrink-0 mt-0.5" />
                <span><strong>Service Workflows:</strong> Moving inventory builder & Towing vehicle roll-condition triage.</span>
              </div>
            </div>
          </div>

          {/* Section 2: Technical Architecture */}
          <div className="bg-white border border-[#c2c6d6] rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-[#0b1c30] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#0058be]" />
              Technical Stack & Architecture
            </h3>

            <div className="space-y-3 text-xs text-[#0b1c30]">
              <div className="bg-[#f8f9ff] p-3 rounded-xl border border-[#c2c6d6]/60">
                <strong className="text-[#0058be] block mb-1">Frontend</strong>
                Next.js 14+ / React 18 with TailwindCSS 4, Inter Typography, Material Symbols & Lucide icons.
              </div>
              <div className="bg-[#f8f9ff] p-3 rounded-xl border border-[#c2c6d6]/60">
                <strong className="text-[#0058be] block mb-1">Backend & API</strong>
                NestJS Clean Architecture (DDD), PostgreSQL + Prisma ORM, Redis for live GPS pub-sub telemetry.
              </div>
              <div className="bg-[#f8f9ff] p-3 rounded-xl border border-[#c2c6d6]/60">
                <strong className="text-[#0058be] block mb-1">Integrations</strong>
                Stripe Payment Gateway, Google Maps JavaScript API, WebSocket live driver updates.
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Design Tokens Visualization */}
        <div className="bg-white border border-[#c2c6d6] rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <h3 className="font-extrabold text-base text-[#0b1c30] flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#0058be]" />
            Stitch Design System Tokens
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
            <div className="p-4 rounded-xl bg-[#0b1c30] text-white space-y-1">
              <span>Deep Navy (Surface/On-Background)</span>
              <code className="block text-[11px] opacity-75">#0B1C30 / #0F172A</code>
            </div>

            <div className="p-4 rounded-xl bg-[#0058be] text-white space-y-1">
              <span>Primary Professional Blue</span>
              <code className="block text-[11px] opacity-75">#0058BE / #3B82F6</code>
            </div>

            <div className="p-4 rounded-xl bg-[#825100] text-white space-y-1">
              <span>High-Visibility Amber</span>
              <code className="block text-[11px] opacity-75">#825100 / #F59E0B</code>
            </div>

            <div className="p-4 rounded-xl bg-[#eff4ff] text-[#0b1c30] border border-[#c2c6d6] space-y-1">
              <span>Light Surface Low</span>
              <code className="block text-[11px] text-[#424754]">#EFF4FF / #F8F9FF</code>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[#f8f9ff] rounded-xl border border-[#c2c6d6]/60">
              <strong className="text-[#0b1c30] block mb-1">Typography</strong>
              Inter font family, tall x-height, headline-xl 36px, headline-lg 28px, body-md 14px.
            </div>
            <div className="p-4 bg-[#f8f9ff] rounded-xl border border-[#c2c6d6]/60">
              <strong className="text-[#0b1c30] block mb-1">Grid & Radius</strong>
              Strict 8px grid system, rounded-lg 8px default radius, rounded-xl 16px container radius.
            </div>
            <div className="p-4 bg-[#f8f9ff] rounded-xl border border-[#c2c6d6]/60">
              <strong className="text-[#0b1c30] block mb-1">Elevation</strong>
              Tonal layering Level 0 (#F8FAFC), Level 1 (#FFFFFF 1px border), Level 2 (Ambient shadow).
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
