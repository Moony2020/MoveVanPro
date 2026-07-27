import React, { useState } from 'react';
import { X, Download, Code, FileText, Check, Copy } from 'lucide-react';

export default function ExportModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState('nextjs');

  const sampleNextJsAppCode = `// MoveVanPro - Next.js App Router (app/page.tsx)
import React from 'react';
import DispatcherDashboard from '@/components/DispatcherDashboard';
import CustomerPortal from '@/components/CustomerPortal';

export default function MoveVanProApp() {
  return (
    <main className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      <DispatcherDashboard />
    </main>
  );
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleNextJsAppCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-[#c2c6d6] rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-6">
        <div className="flex justify-between items-center border-b border-[#eff4ff] pb-4">
          <div>
            <h3 className="font-extrabold text-lg text-[#0b1c30]">Export MoveVan Pro Codebase</h3>
            <p className="text-xs text-[#424754]">React 18 + Next.js App Router & TailwindCSS 4</p>
          </div>
          <button onClick={onClose} className="text-[#727785] hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Options */}
        <div className="flex gap-3">
          <button 
            onClick={() => setExportFormat('nextjs')}
            className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${
              exportFormat === 'nextjs' 
                ? 'border-[#0058be] bg-[#eff4ff] text-[#0058be]' 
                : 'border-[#c2c6d6] text-[#424754]'
            }`}
          >
            Next.js (App Router)
          </button>
          <button 
            onClick={() => setExportFormat('react')}
            className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${
              exportFormat === 'react' 
                ? 'border-[#0058be] bg-[#eff4ff] text-[#0058be]' 
                : 'border-[#c2c6d6] text-[#424754]'
            }`}
          >
            React (Vite SPA)
          </button>
        </div>

        {/* Code Snippet Box */}
        <div className="relative bg-[#0b1c30] text-[#adc6ff] p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-48">
          <pre>{sampleNextJsAppCode}</pre>
          <button 
            onClick={handleCopyCode}
            className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-lg text-[10px] flex items-center gap-1 font-sans font-bold"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <button 
            onClick={onClose}
            className="flex-1 py-3 border border-[#c2c6d6] rounded-xl font-bold text-xs text-[#0b1c30]"
          >
            Close
          </button>
          <button 
            onClick={() => {
              alert('Project files are exported and saved locally in c:\\coding-projects\\MoveVanPro!');
              onClose();
            }}
            className="flex-1 bg-[#0058be] hover:bg-[#2170e4] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Source Zip
          </button>
        </div>
      </div>
    </div>
  );
}
