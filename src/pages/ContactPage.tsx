import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  Users,
  MessageCircle,
  Navigation,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Send,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const address = '742 Evergreen Row, Downtown Artisan District, Portland, OR 97205';
  const phone = '(503) 555-0198';
  const email = 'hello@brewandblisscoffee.com';

  const [copiedAddress, setCopiedAddress] = useState(false);
  const [mapMode, setMapMode] = useState<'default' | 'satellite' | 'transit'>('default');

  // Contact Message form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  // Table Reservation form state
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [resDate, setResDate] = useState('Tomorrow');
  const [resTime, setResTime] = useState('10:00 AM');
  const [resGuests, setResGuests] = useState('2');
  const [resRequest, setResRequest] = useState('');
  const [resConfirmed, setResConfirmed] = useState(false);
  const [bookingTicketId, setBookingTicketId] = useState('');

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleOpenGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      '_blank'
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setContactName('');
    setContactEmail('');
    setContactSubject('');
    setContactMessage('');
    setTimeout(() => setContactSent(false), 5000);
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `TBL-${Math.floor(100 + Math.random() * 900)}`;
    setBookingTicketId(code);
    setResConfirmed(true);
  };

  return (
    <div className="w-full bg-[#120E0B] text-[#EDE7DE] pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#241D17] border border-[#C9A87C]/30 text-[#C9A87C] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit &amp; Connect</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FAF6F0] font-normal tracking-tight">
            Contact &amp; Table Reservations
          </h1>
          <div className="w-16 h-[2px] bg-[#C9A87C]/50 mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#BFB2A3] font-light leading-relaxed">
            Reserve your favorite table, ask us about catering or wholesale beans, or drop in for an unhurried morning cup.
          </p>
        </div>

        {/* TOP QUICK ACTION BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14 max-w-3xl mx-auto">
          <a
            href="tel:5035550198"
            className="p-4 rounded-2xl bg-[#1A1512] border border-[#2B221B] hover:border-[#C9A87C] transition-all flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] shadow-md"
          >
            <Phone className="w-4 h-4 text-[#C9A87C]" />
            <span>Call Now: (503) 555-0198</span>
          </a>

          <a
            href="https://wa.me/15035550198"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#1A1512] border border-[#2B221B] hover:border-emerald-500 transition-all flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Us</span>
          </a>

          <button
            onClick={handleOpenGoogleMaps}
            className="p-4 rounded-2xl bg-[#1A1512] border border-[#2B221B] hover:border-[#C9A87C] transition-all flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] shadow-md cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-[#C9A87C]" />
            <span>Get Directions</span>
          </button>
        </div>

        {/* 2-COLUMN LAYOUT: RESERVATION (LEFT) & CONTACT FORM / INFO (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* LEFT: TABLE RESERVATION CARD */}
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-[#181310] border border-[#C9A87C]/30 shadow-2xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A87C] mb-2">
                <Calendar className="w-4 h-4" />
                <span>Hospitality Bookings</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF6F0]">
                Reserve a Table
              </h2>
              <p className="text-xs sm:text-sm text-[#BFB2A3] mt-2 font-light">
                Tables are held for 15 minutes. Perfect for client catchups, reading sessions, and weekend brunch pairings.
              </p>
            </div>

            {resConfirmed ? (
              <div className="p-6 rounded-2xl bg-[#221A15] border border-emerald-500/40 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-400/50 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#FAF6F0]">Reservation Confirmed!</h3>
                <p className="text-xs text-[#BFB2A3]">
                  Thank you, <strong className="text-[#FAF6F0]">{resName}</strong>. Your confirmation ticket is:
                </p>
                <div className="font-mono text-xl text-[#C9A87C] font-bold tracking-widest bg-[#15110E] py-2 px-4 rounded-xl inline-block border border-[#C9A87C]/30">
                  {bookingTicketId}
                </div>
                <p className="text-xs text-[#A89885]">
                  {resGuests} Guests · {resDate} at {resTime}
                </p>
                <button
                  onClick={() => setResConfirmed(false)}
                  className="mt-2 px-6 py-2 rounded-full bg-[#C9A87C] text-[#14100D] text-xs font-bold uppercase tracking-wider"
                >
                  Book Another Table
                </button>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ethan Helese"
                      value={resName}
                      onChange={(e) => setResName(e.target.value)}
                      className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3.5 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1">
                      Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(503) 555-0198"
                      value={resPhone}
                      onChange={(e) => setResPhone(e.target.value)}
                      className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3.5 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ethan@example.com"
                    value={resEmail}
                    onChange={(e) => setResEmail(e.target.value)}
                    className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3.5 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#C9A87C]" /> Guests
                    </label>
                    <select
                      value={resGuests}
                      onChange={(e) => setResGuests(e.target.value)}
                      className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3 py-2 text-xs text-[#FAF6F0] focus:outline-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                        <option key={n} value={n} className="bg-[#120E0B]">
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C9A87C]" /> Date
                    </label>
                    <select
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3 py-2 text-xs text-[#FAF6F0] focus:outline-none cursor-pointer"
                    >
                      <option value="Today" className="bg-[#120E0B]">Today</option>
                      <option value="Tomorrow" className="bg-[#120E0B]">Tomorrow</option>
                      <option value="This Friday" className="bg-[#120E0B]">This Friday</option>
                      <option value="This Saturday" className="bg-[#120E0B]">This Saturday</option>
                      <option value="This Sunday" className="bg-[#120E0B]">This Sunday</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C9A87C]" /> Time
                    </label>
                    <select
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                      className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3 py-2 text-xs text-[#FAF6F0] focus:outline-none cursor-pointer"
                    >
                      {['7:30 AM', '9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:30 PM', '5:00 PM'].map((t) => (
                        <option key={t} value={t} className="bg-[#120E0B]">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1">
                    Special Request (Seating, Highchair, Oat Milk Flight)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Window booth preferred, celebrating birthday"
                    value={resRequest}
                    onChange={(e) => setResRequest(e.target.value)}
                    className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3.5 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#C9A87C] text-[#14100D] font-bold text-xs uppercase tracking-wider hover:bg-[#D8B98F] transition-all cursor-pointer shadow-xl"
                >
                  Book a Table
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: CONTACT FORM & ADDRESS CARDS */}
          <div className="lg:col-span-6 space-y-6">
            {/* Contact Information & Hours */}
            <div className="p-8 rounded-3xl bg-[#181310] border border-[#2B221B] shadow-xl space-y-6">
              <h3 className="font-serif text-2xl text-[#FAF6F0]">Café Information</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C9A87C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#FAF6F0] block">{address}</span>
                    <button
                      onClick={handleCopyAddress}
                      className="text-[#C9A87C] hover:underline mt-1 inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedAddress ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedAddress ? 'Copied' : 'Copy Address'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C9A87C] shrink-0" />
                  <a href={`tel:${phone.replace(/\D/g, '')}`} className="font-mono text-[#FAF6F0] hover:text-[#C9A87C]">
                    {phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C9A87C] shrink-0" />
                  <a href={`mailto:${email}`} className="text-[#FAF6F0] hover:text-[#C9A87C]">
                    {email}
                  </a>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#29221C]">
                  <Clock className="w-4 h-4 text-[#C9A87C] shrink-0 mt-0.5" />
                  <div className="space-y-1 text-[#BFB2A3]">
                    <div className="flex justify-between w-64">
                      <span>Mon – Fri:</span>
                      <span className="text-[#FAF6F0] font-mono">6:30 AM – 7:00 PM</span>
                    </div>
                    <div className="flex justify-between w-64">
                      <span>Sat – Sun:</span>
                      <span className="text-[#FAF6F0] font-mono">7:00 AM – 8:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* General Message Inquiries Form */}
            <div className="p-8 rounded-3xl bg-[#181310] border border-[#2B221B] shadow-xl space-y-4">
              <h3 className="font-serif text-2xl text-[#FAF6F0]">Send Us a Message</h3>
              <p className="text-xs text-[#BFB2A3] font-light">
                Have a question regarding whole bean coffee catering or private events?
              </p>

              {contactSent ? (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Message sent! Our café manager will get back to you within 24 hours.</span>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                    />
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Subject (e.g. Private Tasting, Catering)"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                  />

                  <textarea
                    required
                    rows={3}
                    placeholder="How can we help you?"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#C9A87C] text-[#14100D] font-bold text-xs uppercase tracking-wider hover:bg-[#D8B98F] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* GOOGLE MAPS SECTION */}
        <section className="rounded-3xl overflow-hidden bg-[#181310] border border-[#C9A87C]/30 shadow-2xl flex flex-col min-h-[460px]">
          {/* Map Top Bar */}
          <div className="bg-[#1C1612] px-6 py-3 border-b border-[#29221C] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#E57373]" />
              <div className="w-3 h-3 rounded-full bg-[#FFB74D]" />
              <div className="w-3 h-3 rounded-full bg-[#81C784]" />
              <span className="text-xs font-mono text-[#A89885] ml-2">
                Google Maps Preview · 742 Evergreen Row, Portland OR
              </span>
            </div>

            <div className="flex items-center gap-1 bg-[#120E0B] p-1 rounded-lg border border-[#2B221B] text-[11px]">
              {(['default', 'satellite', 'transit'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMapMode(m)}
                  className={`px-3 py-1 rounded font-medium capitalize cursor-pointer transition-colors ${
                    mapMode === m
                      ? 'bg-[#C9A87C] text-[#14100D]'
                      : 'text-[#A89885] hover:text-[#FAF6F0]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Vector Map Canvas */}
          <div className="relative flex-1 w-full bg-[#130F0C] overflow-hidden flex items-center justify-center min-h-[380px]">
            {/* SVG City Grid */}
            <svg
              className="absolute inset-0 w-full h-full opacity-65"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <rect x="6%" y="10%" width="24%" height="32%" rx="12" fill="#1C1612" stroke="#2B221B" strokeWidth="1.5" />
              <rect x="34%" y="10%" width="32%" height="32%" rx="12" fill="#18130F" stroke="#2B221B" strokeWidth="1.5" />
              <rect x="70%" y="10%" width="24%" height="32%" rx="12" fill="#1C1612" stroke="#2B221B" strokeWidth="1.5" />

              <rect x="6%" y="48%" width="24%" height="44%" rx="12" fill="#18130F" stroke="#2B221B" strokeWidth="1.5" />
              <rect x="34%" y="48%" width="32%" height="44%" rx="12" fill="#241C16" stroke="#3D2D20" strokeWidth="1.5" />
              <rect x="70%" y="48%" width="24%" height="44%" rx="12" fill="#1C1612" stroke="#2B221B" strokeWidth="1.5" />

              {/* Major Roads */}
              <line x1="0" y1="44%" x2="100%" y2="44%" stroke="#3B2D22" strokeWidth="18" strokeLinecap="round" />
              <line x1="0" y1="44%" x2="100%" y2="44%" stroke="#C9A87C" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4" />

              <line x1="32%" y1="0" x2="32%" y2="100%" stroke="#3B2D22" strokeWidth="16" strokeLinecap="round" />
              <line x1="68%" y1="0" x2="68%" y2="100%" stroke="#3B2D22" strokeWidth="16" strokeLinecap="round" />

              {/* Park */}
              <rect x="9%" y="14%" width="18%" height="24%" rx="8" fill="#17261B" stroke="#223927" strokeWidth="1" />
              <text x="18%" y="27%" fill="#5E8365" fontSize="11" textAnchor="middle">
                Evergreen Park
              </text>

              <text x="50%" y="43%" fill="#786B5E" fontSize="11" textAnchor="middle" letterSpacing="2">
                EVERGREEN ROW BOULEVARD
              </text>
              <text x="31%" y="75%" fill="#6B5F53" fontSize="10" textAnchor="middle" transform="rotate(-90, 31%, 75%)" letterSpacing="1.5">
                4TH STREET
              </text>
              <text x="67%" y="75%" fill="#6B5F53" fontSize="10" textAnchor="middle" transform="rotate(-90, 67%, 75%)" letterSpacing="1.5">
                5TH STREET
              </text>
            </svg>

            {/* Pulsing Pin */}
            <div className="relative z-20 flex flex-col items-center">
              <span className="absolute -inset-4 rounded-full bg-[#C9A87C]/30 animate-ping opacity-75" />
              <span className="absolute -inset-2 rounded-full bg-[#C9A87C]/40" />

              <div
                onClick={handleOpenGoogleMaps}
                className="relative z-10 w-12 h-12 rounded-full bg-[#C9A87C] text-[#14100D] shadow-2xl flex items-center justify-center border-2 border-[#FAF6F0] transform hover:scale-110 transition-transform cursor-pointer"
              >
                <MapPin className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div className="mt-3 px-4 py-2 rounded-xl bg-[#1A1512]/95 border border-[#C9A87C]/40 backdrop-blur-md shadow-2xl text-center transform -translate-y-1">
                <p className="font-serif text-sm font-semibold text-[#FAF6F0]">
                  Brew &amp; Bliss Coffee House
                </p>
                <p className="text-[11px] text-[#C9A87C]">
                  ★ 4.9 (1,200+ Reviews) · Artisanal Roastery
                </p>
              </div>
            </div>

            {/* Overlay Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#181310]/95 backdrop-blur-md border border-[#C9A87C]/25 text-xs text-[#D1C7BA]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Downtown Line 1 &amp; 4 (Artisan Square Station, 120m)</span>
              </div>
              <button
                onClick={handleOpenGoogleMaps}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C9A87C] hover:text-[#FAF6F0] transition-colors cursor-pointer"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
