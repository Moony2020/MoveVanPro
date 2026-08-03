import React from 'react';
import { ArrowRight, Building2, Clock3, Home, MapPinned, ShieldCheck, Truck, UsersRound } from 'lucide-react';

const services = [
  {
    title: 'Home moves',
    eyebrow: 'Residential moving',
    text: 'Careful packing, loading and delivery for flats, houses and student moves across London.',
    image: '/service-home-move.webp',
    imageStyle: 'cover',
    icon: Home,
    action: 'Book a home move',
  },
  {
    title: 'Man and van',
    eyebrow: 'Flexible hourly help',
    text: 'A practical small-van service for single items, studio moves and short local journeys.',
    image: '/service-man-and-van.webp',
    imageStyle: 'cover',
    icon: Truck,
    action: 'Get an instant quote',
  },
  {
    title: 'Office & larger moves',
    eyebrow: 'Business relocation',
    text: 'The right vehicle and moving crew for offices, larger homes and multi-stop collections.',
    image: '/service-office-move.webp',
    imageStyle: 'cover',
    icon: Building2,
    action: 'Plan a larger move',
  },
];

export default function ServicesPage({ onNavigateTo }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f9ff] font-sans text-[#0b1c30]">
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="absolute -left-32 -top-28 h-80 w-80 rounded-full bg-[#dce9ff]/80 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div data-scroll="fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#adc6ff] bg-[#eff4ff] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0058be] font-['Roboto']">
              <ShieldCheck className="h-4 w-4" /> MoveVan Pro services
            </div>
            <h1 className="max-w-2xl font-['Playfair_Display'] text-4xl font-black leading-[1.04] text-[#0b1c30] sm:text-5xl md:text-6xl">
              The right service for every journey.
            </h1>
            <p className="mt-6 max-w-xl text-base font-normal leading-7 text-slate-600 sm:text-lg">
              Explore home moves, flexible man-and-van support, office relocations and roadside recovery across London.
            </p>
            <button onClick={() => onNavigateTo('moving')} className="cinematic-button mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0058be] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-900/15 transition-transform hover:-translate-y-0.5 hover:bg-[#00469b]">
              Get a moving quote <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2" data-scroll="scale-in">
            <div className="rounded-3xl border border-[#dce9ff] bg-[#eff4ff] p-6 shadow-lg shadow-blue-900/5 transition-[border-color,box-shadow] duration-300 hover:border-[#0058be] hover:shadow-[0_0_24px_rgba(0,88,190,0.18)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0058be] text-white shadow-md"><Truck className="h-6 w-6" /></div>
              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0058be] font-['Roboto']">Moving services</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight font-['Roboto']">From one item to a full office</h2>
              <p className="mt-3 text-sm font-normal leading-6 text-slate-600 font-['Roboto']">Select the van, crew and time that match the size of your move.</p>
            </div>
            <div className="rounded-3xl border border-amber-200 bg-[#fff8ea] p-6 shadow-lg shadow-amber-900/5 transition-[border-color,box-shadow] duration-300 hover:border-[#e79a16] hover:shadow-[0_0_24px_rgba(231,154,22,0.22)] sm:translate-y-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#825100] text-white shadow-md"><MapPinned className="h-6 w-6" /></div>
              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#825100] font-['Roboto']">Roadside recovery</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight font-['Roboto']">Help when your vehicle stops</h2>
              <p className="mt-3 text-sm font-normal leading-6 text-slate-600 font-['Roboto']">Submit the vehicle and location details for dispatcher confirmation.</p>
              <button onClick={() => onNavigateTo('towing')} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#825100] font-['Roboto']">Request recovery <ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end" data-scroll="fade-up">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#0058be]">Our moving services</p>
            <h2 className="mt-2 font-['Playfair_Display'] text-3xl font-black sm:text-4xl">Pick the move that suits you.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-600">Every booking starts with a clear quote, secure payment and the option to select your preferred crew.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article key={service.title} data-scroll="fade-up" className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition-[border-color,box-shadow] duration-300 hover:border-[#adc6ff] hover:shadow-[0_0_24px_rgba(0,88,190,0.14)]" style={{ transitionDelay: `${index * 80}ms` }}>
                <div className="relative h-52 overflow-hidden bg-[#eaf1ff]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`h-full w-full ${service.imageStyle === 'cover' ? 'object-cover' : 'object-contain p-4'}`}
                  />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#091a33] text-white shadow-lg"><Icon className="h-5 w-5" /></div>
                </div>
                <div className="p-6 font-['Roboto']">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#0058be]">{service.eyebrow}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#0b1c30]">{service.title}</h3>
                  <p className="mt-3 min-h-[66px] text-sm leading-6 text-slate-600">{service.text}</p>
                  <button onClick={() => onNavigateTo('moving')} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0058be] hover:text-[#003f91]">
                    {service.action} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            [UsersRound, 'Choose your crew', 'Driver only, or add one or two professional movers when you need lifting help.'],
            [Clock3, 'Choose your duration', 'Select a booking duration that works for your move, with a clear suggested estimate.'],
            [MapPinned, 'Local London coverage', 'Enter your pickup and destination to receive a route-aware estimate before payment.'],
          ].map(([Icon, title, text]) => (
            <div key={title} data-scroll="fade-up" className="flex gap-4 rounded-2xl border border-slate-200 bg-[#f8f9ff] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dce9ff] text-[#0058be]"><Icon className="h-5 w-5" /></div>
              <div><h3 className="font-extrabold text-[#0b1c30]">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-20">
        <div data-scroll="scale-in" className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 rounded-3xl bg-[#0058be] px-7 py-10 text-center text-white shadow-xl md:flex-row md:px-10 md:text-left">
          <div><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-100">Ready when you are</p><h2 className="mt-2 font-['Playfair_Display'] text-3xl font-black">Tell us where you are moving.</h2></div>
          <button onClick={() => onNavigateTo('moving')} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#0058be] shadow-lg">Start your quote <ArrowRight className="h-4 w-4" /></button>
        </div>
      </section>
    </main>
  );
}
