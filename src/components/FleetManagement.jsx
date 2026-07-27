import React, { useState } from 'react';
import { Truck, Users, Shield, Plus, Search, Filter, Wrench, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function FleetManagement({ onNavigateTo }) {
  const [activeTab, setActiveTab] = useState('vehicles'); // 'vehicles' | 'drivers'
  const [showAddModal, setShowAddModal] = useState(false);

  const [vehicles, setVehicles] = useState([
    { id: 'Van #04', type: 'Heavy Cargo Van', driver: 'Mark K.', status: 'On Route', fuel: '78%', odo: '42,100 mi', plate: 'MV-9021', service: 'Good' },
    { id: 'Van #08', type: '3.5t Luton Box Van', driver: 'James D.', status: 'Loading', fuel: '92%', odo: '18,450 mi', plate: 'MV-3301', service: 'Good' },
    { id: 'Tow #12', type: 'Flatbed Recovery Truck', driver: 'Robert T.', status: 'Assisting', fuel: '64%', odo: '65,220 mi', plate: 'TW-8812', service: 'Due in 500 mi' },
    { id: 'Van #15', type: 'Standard Cargo Van', driver: 'Sarah P.', status: 'Available', fuel: '100%', odo: '12,900 mi', plate: 'MV-1500', service: 'Good' },
    { id: 'Tow #09', type: 'Heavy Duty Wheel-Lift', driver: 'David L.', status: 'Maintenance', fuel: '40%', odo: '89,100 mi', plate: 'TW-0909', service: 'In Service Bay' }
  ]);

  const drivers = [
    { name: 'Mark K.', rating: '4.95 ★', shift: '08:00 - 17:00', jobs: 342, license: 'Class C Heavy' },
    { name: 'James D.', rating: '4.91 ★', shift: '07:30 - 16:30', jobs: 289, license: 'Class C Heavy' },
    { name: 'Robert T.', rating: '4.98 ★', shift: '24/7 On-Call Tow', jobs: 512, license: 'Class A Tow Master' },
    { name: 'Sarah P.', rating: '4.88 ★', shift: '09:00 - 18:00', jobs: 194, license: 'Class C' }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans pb-12">

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#c2c6d6] p-4 rounded-xl shadow-sm">
            <span className="text-xs text-[#424754] font-medium block">Total Vehicles</span>
            <span className="text-2xl font-bold text-[#0b1c30]">16 Units</span>
          </div>
          <div className="bg-white border border-[#c2c6d6] p-4 rounded-xl shadow-sm">
            <span className="text-xs text-[#424754] font-medium block">Active in Operation</span>
            <span className="text-2xl font-bold text-[#0058be]">12 Units</span>
          </div>
          <div className="bg-white border border-[#c2c6d6] p-4 rounded-xl shadow-sm">
            <span className="text-xs text-[#424754] font-medium block">In Service Bay</span>
            <span className="text-2xl font-bold text-[#825100]">2 Units</span>
          </div>
          <div className="bg-white border border-[#c2c6d6] p-4 rounded-xl shadow-sm">
            <span className="text-xs text-[#424754] font-medium block">Available Idle</span>
            <span className="text-2xl font-bold text-[#0b1c30]">2 Units</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#c2c6d6] gap-6 text-sm font-bold">
          <button 
            onClick={() => setActiveTab('vehicles')}
            className={`pb-3 transition-colors ${activeTab === 'vehicles' ? 'border-b-2 border-[#0058be] text-[#0058be]' : 'text-[#424754]'}`}
          >
            Vehicle Fleet Registry ({vehicles.length})
          </button>
          <button 
            onClick={() => setActiveTab('drivers')}
            className={`pb-3 transition-colors ${activeTab === 'drivers' ? 'border-b-2 border-[#0058be] text-[#0058be]' : 'text-[#424754]'}`}
          >
            Driver Roster ({drivers.length})
          </button>
        </div>

        {/* VEHICLES TABLE */}
        {activeTab === 'vehicles' && (
          <div className="bg-white border border-[#c2c6d6] rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#eff4ff] text-[#424754] border-b border-[#c2c6d6] font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Vehicle ID & Type</th>
                  <th className="p-4">Assigned Driver</th>
                  <th className="p-4">Operational Status</th>
                  <th className="p-4">Fuel / Battery</th>
                  <th className="p-4">Odometer</th>
                  <th className="p-4">License Plate</th>
                  <th className="p-4 text-right">Maintenance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff4ff]">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-[#f8f9ff] transition-colors">
                    <td className="p-4 font-bold text-[#0b1c30]">
                      {v.id}
                      <span className="block text-[11px] font-normal text-[#424754]">{v.type}</span>
                    </td>
                    <td className="p-4 font-semibold text-[#0058be]">{v.driver}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                        v.status.includes('Route') || v.status.includes('Assisting') ? 'bg-[#2170e4]/15 text-[#0058be]' :
                        v.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-[#ffdad6] text-[#93000a]'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">{v.fuel}</td>
                    <td className="p-4 text-[#424754]">{v.odo}</td>
                    <td className="p-4 font-mono text-[#0b1c30]">{v.plate}</td>
                    <td className="p-4 text-right">
                      <span className="text-[11px] text-[#424754] font-medium">{v.service}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DRIVERS TABLE */}
        {activeTab === 'drivers' && (
          <div className="bg-white border border-[#c2c6d6] rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#eff4ff] text-[#424754] border-b border-[#c2c6d6] font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Driver Name</th>
                  <th className="p-4">Customer Rating</th>
                  <th className="p-4">Active Shift</th>
                  <th className="p-4">Total Completed Jobs</th>
                  <th className="p-4">License Certification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff4ff]">
                {drivers.map((d) => (
                  <tr key={d.name} className="hover:bg-[#f8f9ff]">
                    <td className="p-4 font-bold text-[#0b1c30]">{d.name}</td>
                    <td className="p-4 text-[#825100] font-bold">{d.rating}</td>
                    <td className="p-4 text-[#424754]">{d.shift}</td>
                    <td className="p-4 font-semibold">{d.jobs} moves</td>
                    <td className="p-4 text-[#0058be] font-semibold">{d.license}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#c2c6d6] rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-[#0b1c30] mb-4">Register New Vehicle to MoveVan Pro Fleet</h3>
            <div className="space-y-3 text-xs mb-6">
              <div>
                <label className="font-bold block mb-1">Vehicle Unit Identifier</label>
                <input type="text" placeholder="e.g. Van #18" className="w-full p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="font-bold block mb-1">Type</label>
                <select className="w-full p-2.5 border rounded-xl">
                  <option>Heavy Cargo Van</option>
                  <option>3.5t Luton Box Van</option>
                  <option>Flatbed Tow Truck</option>
                </select>
              </div>
              <div>
                <label className="font-bold block mb-1">License Plate</label>
                <input type="text" placeholder="MV-9900" className="w-full p-2.5 border rounded-xl" />
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 border border-[#c2c6d6] rounded-xl font-bold text-xs"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setVehicles([...vehicles, { id: 'Van #18', type: 'Heavy Cargo Van', driver: 'Unassigned', status: 'Available', fuel: '100%', odo: '1,200 mi', plate: 'MV-9900', service: 'New Unit' }]);
                  setShowAddModal(false);
                }}
                className="flex-1 bg-[#0058be] text-white py-2.5 rounded-xl font-bold text-xs"
              >
                Register Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
