import React, { useState } from 'react';
import { 
  Truck, Users, MapPin, Calendar, Clock, Package, Check, 
  ChevronRight, ArrowLeft, ShieldCheck, CreditCard, Lock, Sparkles 
} from 'lucide-react';
import PaymentCheckout from './PaymentCheckout';

export default function MovingBooking({ onNavigateTo }) {
  const [step, setStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedReceipt, setConfirmedReceipt] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [vehicle, setVehicle] = useState('luton'); // small, medium, luton, truck
  const [movers, setMovers] = useState(1); // 0 = Driver only, 1 = Driver + 1, 2 = Driver + 2
  const [pickup, setPickup] = useState('142 Kensington High St, London W8 7RG');
  const [dropoff, setDropoff] = useState('28 Canary Wharf, London E14 5AB');
  const [distanceKm, setDistanceKm] = useState(24);
  const [moveDate, setMoveDate] = useState('2026-08-01');
  const [moveTime, setMoveTime] = useState('09:00 AM');

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingConfirmed(true);
    }, 1200);
  };

  // Inventory Checklist
  const [inventory, setInventory] = useState({
    sofas: 1,
    beds: 2,
    boxes: 12,
    tvs: 2,
    tables: 1,
    appliances: 1
  });

  const updateInventory = (item, delta) => {
    setInventory(prev => ({
      ...prev,
      [item]: Math.max(0, prev[item] + delta)
    }));
  };

  // Pricing Engine Logic
  const vehicleRates = {
    small: 65,
    medium: 85,
    luton: 115,
    truck: 145
  };

  const baseRate = vehicleRates[vehicle] || 115;
  const moverAddon = movers * 35;
  const itemTotalCount = Object.values(inventory).reduce((a, b) => a + b, 0);
  const inventoryFee = Math.ceil(itemTotalCount / 5) * 15;
  const distanceFee = Math.round(distanceKm * 2.2);

  const estimatedHours = Math.max(2, Math.ceil((itemTotalCount * 0.1) + (distanceKm / 30)));
  const subtotal = (baseRate + moverAddon) * estimatedHours + distanceFee + inventoryFee;
  const tax = Math.round(subtotal * 0.08);
  const totalPrice = subtotal + tax;

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center p-6 font-sans">
        <div className="bg-white border border-[#c2c6d6] rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <h2 className="text-2xl font-black text-[#0b1c30] mb-2">Booking & Payment Confirmed!</h2>
          <p className="text-xs text-[#424754] mb-6">
            Your dispatch job <strong className="text-[#0058be]">#MVP-{Math.floor(1000 + Math.random() * 9000)}</strong> has been scheduled and authorized via encrypted gateway.
          </p>

          <div className="bg-[#0b1c30] text-white rounded-2xl p-5 text-left space-y-2.5 text-xs mb-6 shadow-inner border border-gray-800">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Transaction ID:</span> 
              <strong className="text-emerald-400 font-mono">{confirmedReceipt?.txnId || 'TXN-STP-849201'}</strong>
            </div>
            <div className="flex justify-between"><span>Payment Provider:</span> <strong>{confirmedReceipt?.provider || 'Stripe Secured'}</strong></div>
            <div className="flex justify-between"><span>Scheduled Date:</span> <strong>{moveDate} at {moveTime}</strong></div>
            <div className="flex justify-between"><span>Vehicle Allocated:</span> <strong className="capitalize">{vehicle} Van</strong></div>
            <div className="flex justify-between"><span>Crew:</span> <strong>Driver + {movers} Mover(s)</strong></div>
            <div className="flex justify-between border-t border-gray-800 pt-2 text-sm font-black">
              <span>Total Paid:</span> <span className="text-emerald-400">${totalPrice}.00</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => onNavigateTo('dispatch')}
              className="flex-1 bg-[#0058be] text-white py-3.5 rounded-xl font-bold text-xs hover:bg-[#2170e4] transition-colors cursor-pointer shadow-md"
            >
              Open Dispatcher Live Tracker
            </button>
            <button 
              onClick={() => { setBookingConfirmed(false); setConfirmedReceipt(null); setStep(1); }}
              className="px-4 py-3.5 border border-[#c2c6d6] rounded-xl font-bold text-xs text-[#0b1c30] hover:bg-[#eff4ff]"
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans pb-16">

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-2.5 sm:px-6 pt-4 sm:pt-8">
        {/* Stepper Bar */}
        <div className="flex justify-between items-center mb-6 sm:mb-8 max-w-2xl mx-auto px-1">
          {[
            { num: 1, label: 'Vehicle & Movers' },
            { num: 2, label: 'Locations & Items' },
            { num: 3, label: 'Schedule' },
            { num: 4, label: 'Confirm & Pay' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-1.5 sm:gap-2">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step === s.num ? 'bg-[#0058be] text-white shadow-md' :
                step > s.num ? 'bg-[#2170e4]/20 text-[#0058be]' : 'bg-[#c2c6d6]/40 text-[#727785]'
              }`}>
                {step > s.num ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : s.num}
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${step === s.num ? 'text-[#0058be]' : 'text-[#424754]'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Interactive Form Steps */}
          <div className="lg:col-span-8 bg-white border border-[#c2c6d6] rounded-2xl p-3 sm:p-6 md:p-8 shadow-sm">
            {/* STEP 1: VEHICLE & MOVERS */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-[#0b1c30] mb-1">Book a Moving Service</h2>
                  <p className="text-xs text-[#424754]">Choose your service option and vehicle size.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { 
                      id: 'small', 
                      name: 'Van + Driver', 
                      desc: 'For small moves & studio', 
                      rate: 65, 
                      cap: '350 cu ft',
                      img: '/van-small.png'
                    },
                    { 
                      id: 'medium', 
                      name: 'Van + 1 Mover', 
                      desc: 'Great for 1-2 bed apartment', 
                      rate: 95, 
                      cap: '550 cu ft',
                      img: '/van-medium.png'
                    },
                    { 
                      id: 'luton', 
                      name: 'Van + 2 Movers', 
                      desc: 'Best for larger 3+ bed house', 
                      rate: 135, 
                      cap: '800 cu ft',
                      img: '/van-large.png'
                    }
                  ].map((v) => (
                    <div 
                      key={v.id}
                      onClick={() => setVehicle(v.id)}
                      className={`rounded-2xl border-2 overflow-hidden cursor-pointer transition-all flex flex-col justify-between ${
                        vehicle === v.id 
                          ? 'border-[#0058be] bg-[#eff4ff] ring-2 ring-[#0058be]/20 shadow-md scale-[1.02]' 
                          : 'border-[#c2c6d6]/60 hover:border-[#0058be]/40 bg-white shadow-sm'
                      }`}
                    >
                      <div className="h-28 w-full bg-[#f8f9ff] relative overflow-hidden">
                        <img 
                          src={v.img} 
                          alt={v.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                            vehicle === v.id ? 'bg-[#0058be] text-white border-[#0058be]' : 'bg-white text-transparent border-[#c2c6d6]'
                          }`}>
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 flex flex-col flex-grow justify-between">
                        <div>
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-extrabold text-xs md:text-sm text-[#0b1c30]">{v.name}</h4>
                            <span className="text-xs font-black text-[#0058be]">${v.rate}/hr</span>
                          </div>
                          <p className="text-[11px] text-[#424754] mb-2 leading-tight">{v.desc}</p>
                        </div>
                        <span className="text-[10px] bg-white border border-[#c2c6d6] px-2 py-0.5 rounded-md font-bold text-[#565e74] w-fit">
                          Capacity: {v.cap}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mover Count Toggle */}
                <div className="pt-4 border-t border-[#c2c6d6]">
                  <h3 className="text-sm font-bold text-[#0b1c30] mb-2">Select Helper Crew Count</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { count: 0, label: 'Driver Only', extra: '+$0/hr' },
                      { count: 1, label: 'Driver + 1 Mover', extra: '+$35/hr' },
                      { count: 2, label: 'Driver + 2 Movers', extra: '+$65/hr' }
                    ].map((m) => (
                      <button
                        key={m.count}
                        onClick={() => setMovers(m.count)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          movers === m.count 
                            ? 'border-[#0058be] bg-[#dce9ff] text-[#0058be] font-bold' 
                            : 'border-[#c2c6d6] hover:bg-[#f8f9ff] text-[#424754]'
                        }`}
                      >
                        <Users className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-xs">{m.label}</div>
                        <div className="text-[10px] opacity-75">{m.extra}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-[#0058be] hover:bg-[#2170e4] text-white py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md mt-6"
                >
                  Continue to Locations & Inventory
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: LOCATIONS & INVENTORY */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#0b1c30]">Pickup, Drop-off & Inventory</h2>
                  <p className="text-xs text-[#424754]">Enter address details and item list for quote calculation.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-[#0b1c30] block mb-1">Pickup Address</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#0058be] absolute left-3 top-3.5" />
                      <input 
                        type="text"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-xs border border-[#c2c6d6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0058be]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0b1c30] block mb-1">Destination Address</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#825100] absolute left-3 top-3.5" />
                      <input 
                        type="text"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-xs border border-[#c2c6d6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0058be]"
                      />
                    </div>
                  </div>
                </div>

                {/* Inventory Quantity Adjusters */}
                <div className="pt-4 border-t border-[#c2c6d6]">
                  <h3 className="text-sm font-bold text-[#0b1c30] mb-3">Item Inventory Checklist</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { key: 'sofas', label: 'Sofas / Couches' },
                      { key: 'beds', label: 'Beds & Mattresses' },
                      { key: 'boxes', label: 'Moving Boxes (Std)' },
                      { key: 'tvs', label: 'TVs & Displays' },
                      { key: 'tables', label: 'Dining Tables / Desks' },
                      { key: 'appliances', label: 'Heavy Appliances' }
                    ].map((item) => (
                      <div key={item.key} className="flex justify-between items-center bg-[#f8f9ff] border border-[#c2c6d6]/60 p-2.5 rounded-xl">
                        <span className="text-xs font-semibold text-[#0b1c30]">{item.label}</span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateInventory(item.key, -1)}
                            className="w-6 h-6 rounded bg-[#c2c6d6]/40 hover:bg-[#c2c6d6] text-xs font-bold flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-xs font-black text-[#0058be]">{inventory[item.key] || 0}</span>
                          <button 
                            onClick={() => handleItemQuantity(item.key, 1)}
                            className="w-6 h-6 rounded bg-[#0058be] text-white text-xs font-bold flex items-center justify-center hover:bg-[#2170e4]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="px-5 py-3 border border-[#c2c6d6] rounded-xl font-bold text-xs text-[#0b1c30] hover:bg-[#f8f9ff]"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="flex-1 bg-[#0058be] hover:bg-[#2170e4] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    Continue to Schedule
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SCHEDULE */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-[#0b1c30] mb-1">Select Move Date & Time Slot</h2>
                  <p className="text-xs text-[#424754]">Same-day dispatch available in Central London within 45 minutes.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#0b1c30] block mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#0058be]" />
                      Moving Date
                    </label>
                    <input 
                      type="date" 
                      value={moveDate}
                      onChange={(e) => setMoveDate(e.target.value)}
                      className="w-full p-3 text-xs bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl focus:ring-2 focus:ring-[#0058be]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0b1c30] block mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#0058be]" />
                      Time Slot
                    </label>
                    <select 
                      value={moveTime}
                      onChange={(e) => setMoveTime(e.target.value)}
                      className="w-full p-3 text-xs bg-[#f8f9ff] border border-[#c2c6d6] rounded-xl focus:ring-2 focus:ring-[#0058be]"
                    >
                      <option value="08:00 AM">08:00 AM - 10:00 AM (Early Morning)</option>
                      <option value="11:00 AM">11:00 AM - 01:00 PM (Midday)</option>
                      <option value="02:00 PM">02:00 PM - 04:00 PM (Afternoon)</option>
                      <option value="05:00 PM">05:00 PM - 07:00 PM (Evening)</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-6">
                  <button 
                    onClick={() => setStep(2)}
                    className="px-5 py-3 border border-[#c2c6d6] rounded-xl font-bold text-xs text-[#0b1c30] hover:bg-[#f8f9ff]"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(4)}
                    className="flex-1 bg-[#0058be] hover:bg-[#2170e4] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    Review & Proceed to Payment
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & CONFIRM */}
            {step === 4 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#0b1c30] mb-1">Review Booking & Secure Payment</h2>
                  <p className="text-xs text-[#424754]">Select your preferred payment method below. Encrypted via Stripe & PayPal APIs.</p>
                </div>

                <div className="bg-[#f8f9ff] rounded-2xl p-3.5 sm:p-5 border border-[#c2c6d6] text-xs space-y-2.5 text-[#0b1c30]">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1 sm:gap-4 border-b border-[#c2c6d6]/40 pb-2">
                    <span className="shrink-0 text-[#424754] font-medium">Pickup Address:</span> 
                    <strong className="text-[#0058be] sm:text-right font-bold leading-snug break-words">{pickup}</strong>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1 sm:gap-4 border-b border-[#c2c6d6]/40 pb-2">
                    <span className="shrink-0 text-[#424754] font-medium">Destination:</span> 
                    <strong className="text-[#0058be] sm:text-right font-bold leading-snug break-words">{dropoff}</strong>
                  </div>
                  <div className="flex justify-between items-center gap-2 border-b border-[#c2c6d6]/40 pb-2">
                    <span className="shrink-0 text-[#424754] font-medium">Allocated Vehicle:</span> 
                    <strong className="capitalize text-right">{vehicle} Moving Van</strong>
                  </div>
                  <div className="flex justify-between items-center gap-2 border-b border-[#c2c6d6]/40 pb-2">
                    <span className="shrink-0 text-[#424754] font-medium">Mover Crew:</span> 
                    <strong className="text-right">Driver + {movers} helper(s)</strong>
                  </div>
                  <div className="flex justify-between items-center gap-2 pb-1">
                    <span className="shrink-0 text-[#424754] font-medium">Scheduled Slot:</span> 
                    <strong className="text-right">{moveDate} at {moveTime}</strong>
                  </div>
                  <div className="flex justify-between items-center border-t-2 border-[#c2c6d6] pt-3 text-sm font-extrabold">
                    <span>Total Locked Price:</span>
                    <span className="text-[#0058be] text-lg font-black">${totalPrice}.00</span>
                  </div>
                </div>

                {/* Interactive Multi-Provider Payment Gateway */}
                <PaymentCheckout 
                  totalAmount={totalPrice}
                  bookingDetails={{
                    pickup,
                    dropoff,
                    vehicle,
                    movers,
                    moveDate,
                    moveTime
                  }}
                  onPaymentSuccess={(receipt) => {
                    setConfirmedReceipt(receipt);
                    setBookingConfirmed(true);
                  }}
                  onCancel={() => setStep(3)}
                />
              </div>
            )}
          </div>

          {/* Right Column: Live Price Breakdown Box */}
          <div className="lg:col-span-4 bg-[#131b2e] text-white rounded-2xl p-6 h-fit shadow-xl">
            <h3 className="font-bold text-base mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ffb95f]" />
              Live Quote Breakdown
            </h3>

            <div className="space-y-3 text-xs border-b border-[#3f465c] pb-4 mb-4">
              <div className="flex justify-between text-[#c2c6d6]">
                <span>Base Rate ({vehicle.toUpperCase()}):</span>
                <span>${baseRate}/hr</span>
              </div>
              <div className="flex justify-between text-[#c2c6d6]">
                <span>Helper Crew ({movers} Mover):</span>
                <span>+${moverAddon}/hr</span>
              </div>
              <div className="flex justify-between text-[#c2c6d6]">
                <span>Est. Duration:</span>
                <span>{estimatedHours} hours</span>
              </div>
              <div className="flex justify-between text-[#c2c6d6]">
                <span>Distance Fee (~{distanceKm} km):</span>
                <span>${distanceFee}</span>
              </div>
              <div className="flex justify-between text-[#c2c6d6]">
                <span>Inventory Fee ({itemTotalCount} items):</span>
                <span>${inventoryFee}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm font-bold mb-4">
              <span>Estimated Total:</span>
              <span className="text-xl text-[#adc6ff]">${totalPrice}</span>
            </div>

            <div className="bg-[#213145] p-3 rounded-xl text-[11px] text-[#c2c6d6] space-y-1">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#adc6ff]" />
                MoveVan Pro Guarantee
              </div>
              <p>No hidden fees. Full cargo insurance included up to $100,000.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
