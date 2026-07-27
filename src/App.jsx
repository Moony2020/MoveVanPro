import React, { useState } from 'react';
import Header from './components/Header';
import DispatcherDashboard from './components/DispatcherDashboard';
import ServiceSelection from './components/ServiceSelection';
import MovingBooking from './components/MovingBooking';
import TowingRequest from './components/TowingRequest';
import FleetManagement from './components/FleetManagement';
import PRDSummaryView from './components/PRDSummaryView';
import ExportModal from './components/ExportModal';
import { ShieldAlert } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('dispatch'); // 'dispatch' | 'landing' | 'moving' | 'towing' | 'fleet' | 'prd'
  const [showExportModal, setShowExportModal] = useState(false);
  const [emergencyAlert, setEmergencyAlert] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans antialiased">
      {/* Master Unified Responsive Navigation Header */}
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />

      {/* Emergency Global Banner Notification if triggered */}
      {emergencyAlert && (
        <div className="bg-[#ba1a1a] text-white px-4 md:px-6 py-2 text-xs font-bold flex justify-between items-center z-50 shadow-md animate-pulse">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span className="truncate">CRITICAL DISPATCH ALERT: Priority towing request received from M25 Motorway Junction 15, London Heathrow. Unit Tow #12 dispatched.</span>
          </div>
          <button onClick={() => setEmergencyAlert(false)} className="underline hover:text-gray-200 shrink-0 ml-2">
            Dismiss
          </button>
        </div>
      )}

      {/* Active Screen View Router */}
      <div className="flex-1">
        {currentView === 'dispatch' && (
          <DispatcherDashboard 
            onTriggerEmergency={() => {
              setEmergencyAlert(true);
              setCurrentView('towing');
            }}
            onNavigateTo={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'landing' && (
          <ServiceSelection 
            onSelectService={(service) => setCurrentView(service === 'moving' ? 'moving' : 'towing')}
            onNavigateTo={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'moving' && (
          <MovingBooking 
            onNavigateTo={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'towing' && (
          <TowingRequest 
            onNavigateTo={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'fleet' && (
          <FleetManagement 
            onNavigateTo={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'prd' && (
          <PRDSummaryView 
            onNavigateTo={(view) => setCurrentView(view)}
          />
        )}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal onClose={() => setShowExportModal(false)} />
      )}
    </div>
  );
}
