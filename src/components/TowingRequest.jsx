import React, { useState, useRef } from 'react';
import { 
  AlertTriangle, Car, Wrench, BatteryCharging, Truck, MapPin, 
  Upload, Zap, ShieldCheck, ArrowLeft, CheckCircle2, Phone, ChevronDown, X 
} from 'lucide-react';

export default function TowingRequest({ onNavigateTo }) {
  const [incidentType, setIncidentType] = useState('breakdown');
  const [vehicleType, setVehicleType] = useState('sedan');
  const [canRoll, setCanRoll] = useState(true);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [dispatchRequested, setDispatchRequested] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachedFiles(Array.from(e.target.files));
    }
  };

  const handleRemoveFile = (index, e) => {
    e.stopPropagation();
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (dispatchRequested) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center p-6 font-sans">
        <div className="bg-white border border-[#c2c6d6] rounded-2xl p-8 max-w-lg w-full text-center shadow-xl">
          <div className="w-16 h-16 bg-[#ffddb8] text-[#825100] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#0b1c30] mb-2">Priority Tow Truck Dispatched!</h2>
          <p className="text-sm text-[#424754] mb-6">
            Unit <strong className="text-[#825100]">Tow #12 (Robert T.)</strong> has been assigned to your location and is en route.
          </p>

          <div className="bg-[#eff4ff] rounded-xl p-4 text-left border border-[#c2c6d6]/60 space-y-2 text-xs text-[#0b1c30] mb-6">
            <div className="flex justify-between"><span>Estimated Arrival:</span> <strong className="text-[#825100] text-sm font-extrabold">14 Minutes</strong></div>
            <div className="flex justify-between"><span>Incident Type:</span> <strong className="capitalize">{incidentType}</strong></div>
            <div className="flex justify-between"><span>Vehicle Type:</span> <strong className="capitalize">{vehicleType}</strong></div>
            <div className="flex justify-between"><span>Roll Condition:</span> <strong>{canRoll ? 'Wheels Turn' : 'Stuck / Locked'}</strong></div>
            <div className="flex justify-between"><span>Damage Photos:</span> <strong>{attachedFiles.length > 0 ? `${attachedFiles.length} file(s) attached` : 'None'}</strong></div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => onNavigateTo('dispatch')}
              className="flex-1 bg-[#825100] hover:bg-[#a36700] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Open Dispatcher Live Map
            </button>
            <button 
              onClick={() => setDispatchRequested(false)}
              className="px-4 py-3 border border-[#c2c6d6] rounded-xl font-bold text-xs text-[#0b1c30] hover:bg-[#f8f9ff]"
            >
              Cancel Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans flex flex-col">

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Emergency Input Form */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0b1c30] mb-2">Roadside Recovery Needed?</h1>
            <div className="inline-flex items-center gap-2 bg-[#0b1c30] text-[#ffb95f] px-3 py-2 rounded-lg text-xs font-bold shadow-sm">
              <Zap className="w-4 h-4" />
              Nearest Tow Unit En Route in <span className="underline">14 Mins</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#c2c6d6] p-6 shadow-sm flex flex-col gap-6">
            {/* Bento Radio Grid: Incident Type */}
            <div>
              <label className="text-xs font-bold text-[#0b1c30] block mb-3">What happened?</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'breakdown', label: 'Breakdown', icon: Wrench },
                  { id: 'accident', label: 'Accident', icon: Car },
                  { id: 'start', label: "Won't Start", icon: BatteryCharging },
                  { id: 'transport', label: 'Transport Only', icon: Truck }
                ].map((item) => {
                  const IconComp = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setIncidentType(item.id)}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                        incidentType === item.id 
                          ? 'border-[#0058be] bg-[#eff4ff] text-[#0058be] font-bold shadow-sm' 
                          : 'border-[#c2c6d6] hover:bg-[#f8f9ff] text-[#424754]'
                      }`}
                    >
                      <IconComp className="w-5 h-5 mb-1" />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="border-[#c2c6d6]/60" />

            {/* Vehicle Details & Condition */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1.5">Vehicle Type</label>
                <div className="relative w-full sm:w-1/2">
                  <select 
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full bg-white border border-[#c2c6d6] rounded-xl pl-3 pr-9 py-2.5 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#0058be] focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="sedan">Sedan / Coupe</option>
                    <option value="suv">SUV / Minivan</option>
                    <option value="truck">Pickup Truck</option>
                    <option value="ev">Electric Vehicle (EV)</option>
                    <option value="heavy">Heavy Commercial / Van</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#424754] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Roll Condition Segmented Control */}
              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1.5">Wheel / Roll Status</label>
                <div className="bg-[#eff4ff] p-1 rounded-xl flex gap-1 border border-[#c2c6d6]/60">
                  <button 
                    onClick={() => setCanRoll(true)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      canRoll ? 'bg-white text-[#0b1c30] shadow-sm' : 'text-[#424754]'
                    }`}
                  >
                    Can Roll (Wheels Turn)
                  </button>
                  <button 
                    onClick={() => setCanRoll(false)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      !canRoll ? 'bg-[#ffdad6] text-[#93000a] shadow-sm' : 'text-[#424754]'
                    }`}
                  >
                    Cannot Roll / Stuck
                  </button>
                </div>
              </div>
            </div>

            {/* Optional Damage Photo Upload */}
            <div>
              <label className="text-xs font-bold text-[#0b1c30] block mb-1.5">Damage Photos (Optional)</label>
              <input 
                type="file"
                ref={fileInputRef}
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                  attachedFiles.length > 0 ? 'border-[#0058be] bg-[#eff4ff]' : 'border-[#c2c6d6] hover:bg-[#f8f9ff]'
                }`}
              >
                <Upload className="w-6 h-6 mx-auto text-[#727785] mb-1" />
                <span className="text-xs font-semibold text-[#0b1c30] block">
                  {attachedFiles.length === 0 && 'Tap to upload scene photos'}
                  {attachedFiles.length === 1 && `1 Photo Attached (${attachedFiles[0].name})`}
                  {attachedFiles.length > 1 && `${attachedFiles.length} Photos Attached`}
                </span>
                <span className="text-[10px] text-[#424754]">Helps dispatch flatbed or wheel-lift equipment</span>

                {attachedFiles.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 justify-center" onClick={(e) => e.stopPropagation()}>
                    {attachedFiles.map((file, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1.5 bg-white border border-[#0058be]/30 px-2.5 py-1 rounded-lg text-[11px] font-medium text-[#0058be]"
                      >
                        <span className="max-w-[140px] truncate">{file.name}</span>
                        <button 
                          type="button"
                          onClick={(e) => handleRemoveFile(idx, e)}
                          className="hover:bg-[#ffdad6] hover:text-[#93000a] p-0.5 rounded-full transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* High-Visibility Amber CTA Button */}
            <button 
              onClick={() => setDispatchRequested(true)}
              className="w-full bg-[#ffb95f] hover:bg-[#f59e0b] text-[#2a1700] py-4 rounded-xl font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Zap className="w-5 h-5 fill-current animate-pulse" />
              Request Emergency Towing Dispatch
            </button>
          </div>
        </section>

        {/* Right Column: Live Map & Driver Reassurance */}
        <section className="lg:col-span-7 relative h-[520px] lg:h-auto rounded-2xl overflow-hidden border border-[#c2c6d6] shadow-sm flex flex-col">
          {/* Map Layer (Central London, UK OpenStreetMap) */}
          <iframe 
            title="London Emergency Towing Dispatch Map"
            className="absolute inset-0 w-full h-full border-0 grayscale-[0.05] contrast-[1.05]"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.23%2C51.49%2C-0.10%2C51.54&amp;layer=mapnik"
          />

          {/* Location Bar Overlay */}
          <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-[#c2c6d6] rounded-xl p-3 shadow-md flex items-center gap-3 z-10">
            <MapPin className="w-5 h-5 text-[#0058be] shrink-0" />
            <div className="flex-1 truncate">
              <span className="text-[10px] text-[#424754] uppercase font-bold block">Current Location</span>
              <span className="text-xs font-bold text-[#0b1c30] truncate block">A40 Westway, Shepherd's Bush, London W12</span>
            </div>
            <button className="text-xs font-bold text-[#0058be] hover:underline">Edit</button>
          </div>

          {/* User Location Pulse Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            <div className="bg-[#0058be] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow mb-1">
              Your Vehicle
            </div>
            <div className="w-8 h-8 bg-[#0058be] text-white rounded-full flex items-center justify-center border-2 border-white shadow-xl map-marker-pulse">
              <Car className="w-4 h-4" />
            </div>
          </div>

          {/* Converging Tow Truck Marker */}
          <div className="absolute top-[35%] right-[25%] z-10 flex items-center gap-2">
            <div className="w-8 h-8 bg-[#f59e0b] text-white rounded-full flex items-center justify-center border-2 border-white shadow-xl amber-pulse">
              <Truck className="w-4 h-4" />
            </div>
            <div className="bg-white border border-[#c2c6d6] px-2 py-1 rounded shadow text-[10px] font-bold">
              Tow #12 (2.1 mi away)
            </div>
          </div>

          {/* Reassurance Badge */}
          <div className="mt-auto m-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#c2c6d6] shadow-md z-10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#dce9ff] text-[#0058be] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0b1c30]">Licensed & Insured Fleet Operators</h4>
              <p className="text-[11px] text-[#424754]">All drivers pass background checks and carry 24/7 commercial roadside liability insurance.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
