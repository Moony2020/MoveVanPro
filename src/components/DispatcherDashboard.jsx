import React, { useState } from 'react';
import { 
  Truck, ShieldAlert, Map, BarChart3, Users, Settings, HelpCircle, 
  Search, Filter, Plus, Calendar, AlertTriangle, CheckCircle, Clock, 
  MapPin, Phone, RefreshCw, X, ChevronRight, Menu, DollarSign, PieChart,
  LayoutDashboard, FileText, CreditCard, ShieldCheck, LifeBuoy, Sliders
} from 'lucide-react';

export default function DispatcherDashboard({ onTriggerEmergency, onNavigateTo }) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'dispatch' | 'bookings' | 'invoices'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Settings State
  const [autoAssignRadius, setAutoAssignRadius] = useState('10 miles');
  const [autoAlertPriority, setAutoAlertPriority] = useState(true);
  const [currency, setCurrency] = useState('USD');

  const [jobs, setJobs] = useState([
    { id: '#MVN-1248', type: 'moving', customer: 'John Smith', date: 'May 20, 2024 - 10:00 AM', amount: '$320.00', status: 'Confirmed', driver: 'Van #08 (JD)', location: 'Canary Wharf Tower, London E14' },
    { id: '#MVN-1247', type: 'towing', customer: 'Michael Brown', date: 'May 20, 2024 - 09:30 AM', amount: '$150.00', status: 'Driver Assigned', driver: 'Tow #12 (RT)', location: 'M25 Motorway J15, Heathrow' },
    { id: '#MVN-1246', type: 'moving', customer: 'Sarah Johnson', date: 'May 20, 2024 - 09:00 AM', amount: '$420.00', status: 'On The Way', driver: 'Van #04 (MK)', location: '124 Kensington High St, W8' },
    { id: '#MVN-1245', type: 'towing', customer: 'David Wilson', date: 'May 20, 2024 - 08:45 AM', amount: '$180.00', status: 'Arrived', driver: 'Tow #09 (DL)', location: 'A40 Westway Flyover, W12' },
    { id: '#MVN-1244', type: 'moving', customer: 'Emily Davis', date: 'May 20, 2024 - 08:30 AM', amount: '$290.00', status: 'Loading', driver: 'Van #15 (SP)', location: 'Camden High St, NW1' }
  ]);

  const [vehicles, setVehicles] = useState([
    { id: 'Van #04', driver: 'Mark K.', type: 'Heavy Cargo Van', status: 'Active (On Route)', job: 'Job #4921', fuel: '78%', lat: '51.5074', lng: '-0.1278' },
    { id: 'Van #08', driver: 'James D.', type: 'Large Luton Box Van', status: 'Loading', job: 'Job #4920', fuel: '92%', lat: '51.5151', lng: '-0.1415' },
    { id: 'Tow #12', driver: 'Robert T.', type: 'Flatbed Recovery Truck', status: 'Active (Assisting)', job: 'Job #4924', fuel: '64%', lat: '51.5033', lng: '-0.1195' },
    { id: 'Van #15', driver: 'Sarah P.', type: 'Standard Cargo Van', status: 'Available', job: 'None', fuel: '100%', lat: '51.5081', lng: '-0.0759' }
  ]);

  const filteredJobs = jobs.filter(j => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'MOVING') return j.type === 'moving';
    if (filterStatus === 'TOWING') return j.type === 'towing';
    return true;
  });

  const handleAssignDriver = (jobId) => {
    const available = vehicles.find(v => v.status === 'Available');
    setJobs(jobs.map(j => j.id === jobId ? { ...j, status: 'On The Way', driver: available ? `${available.id} (${available.driver})` : 'Tow #12' } : j));
  };

  return (
    <div className="flex h-screen bg-[#f8f9ff] text-[#0b1c30] overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay Drawer */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-50 bg-[#0b1c30]/60 backdrop-blur-sm lg:hidden flex"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-[260px] bg-[#eff4ff] h-full flex flex-col py-6 px-4 gap-2 shadow-2xl animate-in slide-in-from-left duration-200"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0058be] to-[#2170e4] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  MV
                </div>
                <div>
                  <h1 className="font-extrabold text-base text-[#0b1c30]">MoveVan Pro</h1>
                  <p className="text-[10px] text-[#424754]">Enterprise Admin</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded text-[#424754] hover:bg-[#c2c6d6]/40">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <button 
                onClick={() => { onTriggerEmergency(); setSidebarOpen(false); }}
                className="w-full bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 animate-pulse" />
                Emergency Dispatch
              </button>
            </div>

            <nav className="flex-1 flex flex-col gap-1">
              <button 
                onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'dashboard' ? 'text-[#0058be] bg-[#dce9ff]' : 'text-[#424754] hover:bg-[#e5eeff]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin Dashboard
              </button>

              <button 
                onClick={() => { setActiveTab('dispatch'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'dispatch' ? 'text-[#0058be] bg-[#dce9ff]' : 'text-[#424754] hover:bg-[#e5eeff]'
                }`}
              >
                <Truck className="w-4 h-4" />
                Dispatch Command Map
              </button>

              <button 
                onClick={() => { onNavigateTo('fleet'); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-[#424754] hover:bg-[#e5eeff]"
              >
                <Users className="w-4 h-4" />
                Fleet Management
              </button>

              <button 
                onClick={() => { onNavigateTo('moving'); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-[#424754] hover:bg-[#e5eeff]"
              >
                <Plus className="w-4 h-4" />
                Book Moving Van
              </button>

              <button 
                onClick={() => { onNavigateTo('towing'); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-[#424754] hover:bg-[#e5eeff]"
              >
                <AlertTriangle className="w-4 h-4 text-[#825100]" />
                Emergency Towing
              </button>
            </nav>

            <div className="pt-3 border-t border-[#c2c6d6] flex flex-col gap-1">
              <button 
                onClick={() => { setShowSettingsModal(true); setSidebarOpen(false); }}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-[#424754] hover:bg-[#e5eeff]"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button 
                onClick={() => { setShowSupportModal(true); setSidebarOpen(false); }}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-[#424754] hover:bg-[#e5eeff]"
              >
                <HelpCircle className="w-4 h-4" />
                Support & Help
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex w-[240px] bg-[#eff4ff] border-r border-[#c2c6d6] flex flex-col py-6 px-3 gap-2 shrink-0 z-20">
        {/* Brand Header */}
        <div className="px-3 flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0058be] to-[#2170e4] text-white flex items-center justify-center font-extrabold text-base shadow-sm">
            MV
          </div>
          <div>
            <h1 className="font-extrabold text-base text-[#0b1c30] leading-tight">MoveVan Pro</h1>
            <p className="text-[10px] font-bold text-[#565e74]">Enterprise Admin</p>
          </div>
        </div>

        {/* Emergency Dispatch CTA */}
        <div className="px-1 mb-4">
          <button 
            onClick={onTriggerEmergency}
            className="w-full bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            Emergency Dispatch
          </button>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex-1 flex flex-col gap-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'dashboard' 
                ? 'text-[#0058be] bg-[#dce9ff] border-l-4 border-[#0058be] shadow-sm' 
                : 'text-[#424754] hover:bg-[#e5eeff]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard Overview
          </button>

          <button 
            onClick={() => setActiveTab('dispatch')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'dispatch' 
                ? 'text-[#0058be] bg-[#dce9ff] border-l-4 border-[#0058be] shadow-sm' 
                : 'text-[#424754] hover:bg-[#e5eeff]'
            }`}
          >
            <Truck className="w-4 h-4" />
            Live Dispatch Board
          </button>

          <button 
            onClick={() => onNavigateTo('fleet')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-[#424754] hover:bg-[#e5eeff] transition-all"
          >
            <Users className="w-4 h-4" />
            Fleet Management
          </button>

          <button 
            onClick={() => onNavigateTo('moving')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-[#424754] hover:bg-[#e5eeff] transition-all"
          >
            <Plus className="w-4 h-4" />
            Book Moving Van
          </button>

          <button 
            onClick={() => onNavigateTo('towing')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-[#424754] hover:bg-[#e5eeff] transition-all"
          >
            <AlertTriangle className="w-4 h-4 text-[#825100]" />
            Emergency Recovery
          </button>

          <button 
            onClick={() => onNavigateTo('prd')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-[#424754] hover:bg-[#e5eeff] transition-all"
          >
            <BarChart3 className="w-4 h-4" />
            PRD Specs & Tokens
          </button>
        </nav>

        {/* Footer Settings & Support Buttons */}
        <div className="pt-3 border-t border-[#c2c6d6] flex flex-col gap-1">
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-[#424754] hover:bg-[#e5eeff] transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4 text-[#0058be]" />
            Settings
          </button>
          <button 
            onClick={() => setShowSupportModal(true)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-[#424754] hover:bg-[#e5eeff] transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#0058be]" />
            Support
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f8f9ff]">
        {/* Top Header Bar */}
        <header className="h-[68px] border-b border-[#c2c6d6] bg-[#f8f9ff] flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-[#0b1c30] hover:bg-[#e5eeff] border border-[#c2c6d6]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-extrabold text-lg md:text-xl text-[#0b1c30]">
              {activeTab === 'dashboard' ? 'Executive Dashboard' : 'Live Dispatch Control'}
            </h2>
            <span className="hidden sm:inline-block bg-[#2170e4]/10 text-[#0058be] text-xs px-2.5 py-1 rounded-full font-bold border border-[#0058be]/20">
              London Greater Area
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="hidden sm:flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3 border-r border-[#c2c6d6] pr-4 md:pr-6">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#2170e4]/15 flex items-center justify-center text-[#0058be]">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] md:text-[11px] font-bold text-[#424754]">Active Jobs</p>
                <p className="text-xs md:text-base font-extrabold text-[#0b1c30]">32 Moving / 18 Towing</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#ffddb8] flex items-center justify-center text-[#825100]">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] md:text-[11px] font-bold text-[#424754]">Fleet Utilization</p>
                <p className="text-xs md:text-base font-extrabold text-[#825100]">78% Active</p>
              </div>
            </div>
          </div>
        </header>

        {/* VIEW 1: EXECUTIVE ADMIN DASHBOARD (Matching Stitch Top-Left Screen) */}
        {activeTab === 'dashboard' && (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {/* Top KPI Cards (Matching Stitch Screen 1) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#c2c6d6] shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-[#565e74]">Total Revenue</span>
                  <div className="w-8 h-8 rounded-xl bg-[#0058be]/10 text-[#0058be] flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#0b1c30]">$24,350.00</div>
                <span className="text-[11px] font-bold text-emerald-600 mt-1">↑ +12.5% vs yesterday</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#c2c6d6] shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-[#565e74]">Moving Jobs</span>
                  <div className="w-8 h-8 rounded-xl bg-[#0058be]/10 text-[#0058be] flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#0b1c30]">32</div>
                <span className="text-[11px] font-bold text-emerald-600 mt-1">↑ +8.2% vs yesterday</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#c2c6d6] shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-[#565e74]">Tow Truck Jobs</span>
                  <div className="w-8 h-8 rounded-xl bg-[#825100]/10 text-[#825100] flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#0b1c30]">18</div>
                <span className="text-[11px] font-bold text-emerald-600 mt-1">↑ +5.1% vs yesterday</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#c2c6d6] shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-[#565e74]">Completed Jobs</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#0b1c30]">40</div>
                <span className="text-[11px] font-bold text-emerald-600 mt-1">↑ +10.3% vs yesterday</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#c2c6d6] shadow-sm flex flex-col justify-between sm:col-span-2 lg:col-span-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-[#565e74]">Fleet Utilization</span>
                  <div className="w-8 h-8 rounded-xl bg-[#2170e4]/10 text-[#0058be] flex items-center justify-center">
                    <PieChart className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#0058be]">78%</div>
                <span className="text-[11px] font-bold text-emerald-600 mt-1">↑ +8.5% vs yesterday</span>
              </div>
            </div>

            {/* Middle Section: Donut Chart & Fleet Availability (Matching Stitch Screen) */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Job Status Overview Card */}
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#c2c6d6] shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-extrabold text-base text-[#0b1c30]">Job Status Overview</h3>
                  <span className="text-xs text-[#565e74] font-bold">Total: 68 Jobs Today</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
                  {/* Simulated Donut Chart Ring */}
                  <div className="relative w-40 h-40 rounded-full border-[14px] border-[#0058be] border-t-[#2170e4] border-r-amber-500 border-b-emerald-500 flex items-center justify-center shrink-0 shadow-inner">
                    <div className="text-center">
                      <span className="text-2xl font-black text-[#0b1c30] block">68</span>
                      <span className="text-[10px] font-bold text-[#565e74] uppercase tracking-wider">Total</span>
                    </div>
                  </div>

                  {/* Status Legend List */}
                  <div className="space-y-2 text-xs font-bold w-full sm:w-auto">
                    <div className="flex justify-between items-center gap-6">
                      <span className="flex items-center gap-2 text-[#424754]">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pending:
                      </span>
                      <strong className="text-[#0b1c30]">6</strong>
                    </div>
                    <div className="flex justify-between items-center gap-6">
                      <span className="flex items-center gap-2 text-[#424754]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0058be]" /> Confirmed:
                      </span>
                      <strong className="text-[#0b1c30]">10</strong>
                    </div>
                    <div className="flex justify-between items-center gap-6">
                      <span className="flex items-center gap-2 text-[#424754]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2170e4]" /> Driver Assigned:
                      </span>
                      <strong className="text-[#0b1c30]">8</strong>
                    </div>
                    <div className="flex justify-between items-center gap-6">
                      <span className="flex items-center gap-2 text-[#424754]">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> On The Way:
                      </span>
                      <strong className="text-[#0b1c30]">12</strong>
                    </div>
                    <div className="flex justify-between items-center gap-6">
                      <span className="flex items-center gap-2 text-[#424754]">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Completed:
                      </span>
                      <strong className="text-[#0b1c30]">20</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fleet Availability Bars */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#c2c6d6] shadow-sm flex flex-col justify-between">
                <h3 className="font-extrabold text-base text-[#0b1c30] mb-4">Fleet Availability</h3>

                <div className="space-y-6">
                  {/* Vans Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
                      <span className="text-[#0b1c30]">Vans Available:</span>
                      <span className="text-[#0058be]">12 / 20</span>
                    </div>
                    <div className="w-full bg-[#eff4ff] rounded-full h-3 overflow-hidden border border-[#c2c6d6]">
                      <div className="bg-[#0058be] h-full rounded-full w-[60%]" />
                    </div>
                  </div>

                  {/* Tow Trucks Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
                      <span className="text-[#0b1c30]">Tow Trucks Available:</span>
                      <span className="text-[#825100]">7 / 15</span>
                    </div>
                    <div className="w-full bg-[#fff7ed] rounded-full h-3 overflow-hidden border border-[#c2c6d6]">
                      <div className="bg-amber-500 h-full rounded-full w-[46%]" />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('dispatch')}
                  className="w-full mt-6 bg-[#0058be] hover:bg-[#2170e4] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  View Live Map Telemetry
                </button>
              </div>
            </div>

            {/* Bottom Table: Recent Bookings (Matching Stitch Screen) */}
            <div className="bg-white p-6 rounded-2xl border border-[#c2c6d6] shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-base text-[#0b1c30]">Recent Bookings Overview</h3>
                <button onClick={() => setActiveTab('dispatch')} className="text-xs font-bold text-[#0058be] hover:underline">
                  View All Live Dispatches →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#c2c6d6] text-[#565e74] uppercase font-extrabold text-[10px]">
                      <th className="py-3 px-2">Booking ID</th>
                      <th className="py-3 px-2">Service Type</th>
                      <th className="py-3 px-2">Customer</th>
                      <th className="py-3 px-2">Date & Time</th>
                      <th className="py-3 px-2">Amount</th>
                      <th className="py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c2c6d6]/40 font-semibold">
                    {jobs.map((j) => (
                      <tr key={j.id} className="hover:bg-[#f8f9ff]">
                        <td className="py-3 px-2 font-mono font-bold text-[#0058be]">{j.id}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            j.type === 'moving' ? 'bg-[#dce9ff] text-[#0058be]' : 'bg-[#ffddb8] text-[#825100]'
                          }`}>
                            {j.type}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-[#0b1c30]">{j.customer}</td>
                        <td className="py-3 px-2 text-[#565e74]">{j.date}</td>
                        <td className="py-3 px-2 text-[#0b1c30] font-bold">{j.amount}</td>
                        <td className="py-3 px-2">
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-extrabold">
                            {j.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: LIVE DISPATCH CONTROL MAP BOARD */}
        {activeTab === 'dispatch' && (
          <div className="flex flex-1 overflow-hidden">
            {/* Live Simulated OpenStreetMap Interface */}
            <div className="flex-1 relative bg-[#0b1c30] overflow-hidden select-none">
              {/* Map Canvas Background (Central London, UK OpenStreetMap) */}
              <iframe 
                title="Dispatcher Command Center London Live Map"
                className="absolute inset-0 w-full h-full border-0 invert-[0.9] hue-rotate-[185deg] contrast-[1.2] brightness-[0.85] opacity-80"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.25%2C51.46%2C-0.01%2C51.56&amp;layer=mapnik"
              />

              {/* Grid Lines Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

              {/* Active Fleet Pins on Map */}
              {vehicles.map((v, idx) => (
                <div 
                  key={v.id}
                  onClick={() => setSelectedVehicle(v)}
                  style={{ top: `${25 + idx * 18}%`, left: `${28 + idx * 19}%` }}
                  className="absolute flex flex-col items-center group cursor-pointer z-10 transition-transform hover:scale-110"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-xl border-2 border-white ${
                    v.id.includes('Tow') ? 'bg-[#f59e0b] text-white amber-pulse' : 'bg-[#0058be] text-white map-marker-pulse'
                  }`}>
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="mt-1 bg-white text-[#0b1c30] text-[11px] font-bold px-2 py-1 rounded shadow-md border border-[#c2c6d6] whitespace-nowrap">
                    {v.id} • {v.driver}
                  </div>
                </div>
              ))}

              {/* Vehicle Detail Popover */}
              {selectedVehicle && (
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#c2c6d6] shadow-2xl z-20 w-80">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-[#0b1c30]">{selectedVehicle.id}</h4>
                      <p className="text-xs text-[#424754]">{selectedVehicle.type}</p>
                    </div>
                    <button onClick={() => setSelectedVehicle(null)} className="text-[#727785] hover:text-black">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#424754] border-t border-[#c2c6d6] pt-2">
                    <div className="flex justify-between"><span>Driver:</span> <strong className="text-[#0b1c30]">{selectedVehicle.driver}</strong></div>
                    <div className="flex justify-between"><span>Status:</span> <strong className="text-[#0058be]">{selectedVehicle.status}</strong></div>
                    <div className="flex justify-between"><span>Assigned Job:</span> <strong className="text-[#0b1c30]">{selectedVehicle.job}</strong></div>
                    <div className="flex justify-between"><span>Fuel / Charge:</span> <strong className="text-[#825100]">{selectedVehicle.fuel}</strong></div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel: Live Job Feed */}
            <aside className="w-[340px] border-l border-[#c2c6d6] bg-white flex flex-col shrink-0 shadow-lg z-10">
              <div className="p-4 border-b border-[#c2c6d6] flex justify-between items-center bg-[#f8f9ff]">
                <div>
                  <h3 className="font-bold text-sm text-[#0b1c30]">Live Job Feed</h3>
                  <p className="text-[11px] text-[#424754]">{filteredJobs.length} active dispatches</p>
                </div>
                <button 
                  onClick={() => setFilterStatus(filterStatus === 'ALL' ? 'MOVING' : 'ALL')}
                  className="p-1.5 rounded-lg border border-[#c2c6d6] hover:bg-[#e5eeff] text-[#0b1c30]"
                >
                  <Filter className="w-4 h-4" />
                </button>
              </div>

              {/* Job List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {filteredJobs.map((j) => (
                  <div key={j.id} className="p-3.5 rounded-xl border border-[#c2c6d6]/70 hover:border-[#0058be] bg-white shadow-sm space-y-2">
                    <div className="flex justify-between items-start">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                        j.type === 'towing' ? 'bg-[#ffddb8] text-[#825100]' : 'bg-[#dce9ff] text-[#0058be]'
                      }`}>
                        {j.type}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#0058be]">{j.id}</span>
                    </div>

                    <h4 className="font-bold text-xs text-[#0b1c30]">{j.customer}</h4>
                    <p className="text-[11px] text-[#565e74] truncate">{j.location}</p>

                    <div className="flex justify-between items-center pt-2 border-t border-[#c2c6d6]/40 text-xs">
                      <span className="text-[#565e74]">{j.driver}</span>
                      <button 
                        onClick={() => handleAssignDriver(j.id)}
                        className="bg-[#0058be] hover:bg-[#2170e4] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg"
                      >
                        {j.status}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* DISPATCHER SETTINGS MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-[#0b1c30]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#c2c6d6] space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-[#c2c6d6] pb-3">
              <div className="flex items-center gap-2 text-[#0058be]">
                <Settings className="w-5 h-5" />
                <h3 className="font-extrabold text-base text-[#0b1c30]">Dispatcher Settings</h3>
              </div>
              <button onClick={() => setShowSettingsModal(false)} className="text-[#727785] hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#0b1c30] block mb-1">Auto-Assign Search Radius</label>
                <select 
                  value={autoAssignRadius}
                  onChange={(e) => setAutoAssignRadius(e.target.value)}
                  className="w-full p-2.5 border border-[#c2c6d6] rounded-xl font-semibold text-[#0b1c30]"
                >
                  <option>5 miles (Central London)</option>
                  <option>10 miles (Greater London & M25)</option>
                  <option>25 miles (M25 Corridor & Airports)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#0b1c30] block mb-1">Platform Currency</label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full p-2.5 border border-[#c2c6d6] rounded-xl font-semibold text-[#0b1c30]"
                >
                  <option value="GBP">GBP (£) - London UK</option>
                  <option value="USD">USD ($) - Enterprise Global</option>
                </select>
              </div>

              <div className="flex justify-between items-center p-3 bg-[#f8f9ff] rounded-xl border border-[#c2c6d6]">
                <span className="font-bold text-[#0b1c30]">Emergency Tow Priority Alerts</span>
                <input 
                  type="checkbox"
                  checked={autoAlertPriority}
                  onChange={(e) => setAutoAlertPriority(e.target.checked)}
                  className="w-4 h-4 accent-[#0058be] cursor-pointer"
                />
              </div>

              <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#0058be]/20 text-[11px] text-[#0058be]">
                <span className="font-bold block">Stripe & Telemetry API Status:</span>
                <span className="text-[#424754]">Connected • Webhook Live (200 OK)</span>
              </div>
            </div>

            <button 
              onClick={() => { alert('Dispatcher settings saved successfully!'); setShowSettingsModal(false); }}
              className="w-full bg-[#0058be] hover:bg-[#2170e4] text-white py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer"
            >
              Save Dispatcher Settings
            </button>
          </div>
        </div>
      )}

      {/* DISPATCHER SUPPORT MODAL */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-[#0b1c30]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#c2c6d6] space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-[#c2c6d6] pb-3">
              <div className="flex items-center gap-2 text-[#0058be]">
                <HelpCircle className="w-5 h-5" />
                <h3 className="font-extrabold text-base text-[#0b1c30]">Dispatcher Support & Help</h3>
              </div>
              <button onClick={() => setShowSupportModal(false)} className="text-[#727785] hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-[#eff4ff] rounded-2xl border border-[#0058be]/30 flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#0058be] shrink-0" />
                <div>
                  <span className="font-bold text-[#0b1c30] block text-sm">24/7 Priority Hotline</span>
                  <span className="text-xs text-[#0058be] font-extrabold">0800 917 6683 (MOVE)</span>
                </div>
              </div>

              <div className="p-4 bg-[#f8f9ff] rounded-2xl border border-[#c2c6d6] space-y-2 text-[#424754]">
                <span className="font-bold text-[#0b1c30] block">London Command Operator Manual</span>
                <p className="text-[11px]">Need assistance with auto-dispatching, driver location telemetry, or manual vehicle override?</p>
                <button 
                  onClick={() => onNavigateTo('prd')}
                  className="text-xs font-bold text-[#0058be] hover:underline"
                >
                  View System Architecture Specs →
                </button>
              </div>
            </div>

            <button 
              onClick={() => setShowSupportModal(false)}
              className="w-full bg-[#0058be] text-white py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer"
            >
              Close Support
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
