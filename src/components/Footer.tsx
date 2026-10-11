import React, { useState } from 'react';
import { AppPage } from '../types';
import { Coffee, Mail, Check, ArrowRight, Instagram, Facebook, Twitter, Phone, MapPin, Clock, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: AppPage) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4500);
  };

  const menuQuickLinks = [
    { label: 'Artisan Pour-Over', page: 'menu' as AppPage },
    { label: 'Velvet Flat White', page: 'menu' as AppPage },
    { label: 'Nitro Cold Brew', page: 'menu' as AppPage },
    { label: '72h Butter Croissants', page: 'menu' as AppPage },
    { label: 'Avocado Sourdough', page: 'menu' as AppPage },
    { label: 'Prosciutto Panini', page: 'menu' as AppPage },
    { label: 'Basque Cheesecake', page: 'menu' as AppPage },
  ];

  return (
    <footer className="bg-[#120E0B] text-[#EDE7DE] border-t border-[#C9A87C]/20 pt-20 pb-12 relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A87C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#29221C]">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#261E18] border border-[#C9A87C]/40 flex items-center justify-center text-[#C9A87C]">
                  <Coffee className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <span className="font-serif text-2xl font-semibold tracking-wide text-[#FAF6F0] block leading-none">
                    Brew &amp; Bliss
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A87C] font-medium">
                    Coffee House
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#BFB2A3] font-light leading-relaxed max-w-sm mb-6">
                Freshly brewed coffee, handcrafted drinks, and delicious food made to brighten your day in a warm, welcoming sanctuary.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-[#1C1612] border border-[#C9A87C]/25 flex items-center justify-center text-[#C9A87C] hover:bg-[#C9A87C] hover:text-[#120E0B] transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[#1C1612] border border-[#C9A87C]/25 flex items-center justify-center text-[#C9A87C] hover:bg-[#C9A87C] hover:text-[#120E0B] transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#twitter"
                  aria-label="Twitter"
                  className="w-9 h-9 rounded-full bg-[#1C1612] border border-[#C9A87C]/25 flex items-center justify-center text-[#C9A87C] hover:bg-[#C9A87C] hover:text-[#120E0B] transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="tel:5035550198"
                  aria-label="Call Brew & Bliss"
                  className="w-9 h-9 rounded-full bg-[#1C1612] border border-[#C9A87C]/25 flex items-center justify-center text-[#C9A87C] hover:bg-[#C9A87C] hover:text-[#120E0B] transition-all"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="mt-8 text-xs text-[#8C7D6D]">
              742 Evergreen Row, Portland, OR 97205
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A87C] mb-5">
              Explore Pages
            </h4>
            <ul className="space-y-3 text-sm text-[#BFB2A3]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FAF6F0] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#FAF6F0] transition-colors cursor-pointer text-left"
                >
                  Full Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('order')}
                  className="hover:text-[#FAF6F0] transition-colors cursor-pointer text-left text-[#C9A87C]"
                >
                  Order Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FAF6F0] transition-colors cursor-pointer text-left"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#FAF6F0] transition-colors cursor-pointer text-left"
                >
                  Café Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offers')}
                  className="hover:text-[#FAF6F0] transition-colors cursor-pointer text-left"
                >
                  Offers &amp; Rewards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#FAF6F0] transition-colors cursor-pointer text-left"
                >
                  Contact &amp; Reserve
                </button>
              </li>
            </ul>
          </div>

          {/* Menu Highlights */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A87C] mb-5">
              Café Favorites
            </h4>
            <ul className="space-y-3 text-sm text-[#BFB2A3]">
              {menuQuickLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="hover:text-[#FAF6F0] transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact, Hours & Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A87C] mb-3">
                Join the Bliss Club
              </h4>
              <p className="text-xs sm:text-sm text-[#BFB2A3] font-light leading-relaxed mb-4">
                Receive secret weekend drops, tasting flight invites, and 20% off your next online order.
              </p>

              <form onSubmit={handleSubscribe} className="relative">
                <div className="flex items-center rounded-full bg-[#1C1612] border border-[#C9A87C]/30 focus-within:border-[#C9A87C] p-1.5 transition-colors">
                  <Mail className="w-4 h-4 text-[#A89885] ml-3 mr-2 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full bg-transparent text-xs text-[#FAF6F0] placeholder-[#786B5E] focus:outline-none py-1.5 pr-2"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-[#C9A87C] text-[#120E0B] font-semibold text-xs uppercase tracking-wider hover:bg-[#D8B98F] transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {subscribed && (
                  <div className="mt-2.5 p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Welcome to Brew &amp; Bliss! Check your email for your 20% code: BLISS20</span>
                  </div>
                )}
              </form>
            </div>

            <div className="pt-4 border-t border-[#29221C] space-y-2 text-xs text-[#BFB2A3]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C9A87C]" />
                <span>Mon–Fri: 6:30 AM – 7:00 PM · Sat–Sun: 7:00 AM – 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C9A87C]" />
                <span>742 Evergreen Row, Downtown District, Portland, OR</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C9A87C]" />
                <a href="tel:5035550198" className="hover:text-[#C9A87C]">(503) 555-0198</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7D6D]">
          <div>
            &copy; {new Date().getFullYear()} Brew &amp; Bliss Coffee House. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-[#D1C7BA] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-[#D1C7BA] transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-[#C9A87C]/80">
              Crafted with <Heart className="w-3 h-3 fill-[#C9A87C]" /> in Portland, OR
            </span>
          </div>
        </div>
      </div>

      {/* Privacy Policy / Terms Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1C1612] border border-[#C9A87C]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-[#EDE7DE] shadow-2xl space-y-4">
            <h3 className="font-serif text-2xl text-[#FAF6F0]">
              {activeLegalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
            <div className="text-xs text-[#BFB2A3] space-y-3 max-h-60 overflow-y-auto pr-2 leading-relaxed">
              {activeLegalModal === 'privacy' ? (
                <>
                  <p>
                    Brew &amp; Bliss Coffee House values your privacy. We collect minimal personal data—including your name, email, and phone number—solely to fulfill online orders, loyalty rewards, and table reservations.
                  </p>
                  <p>
                    We never sell, rent, or trade guest personal information. Payment details are processed through encrypted, industry-standard gateways.
                  </p>
                  <p>
                    For inquiries or to request data removal, contact us at privacy@brewandblisscoffee.com.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    By placing an order or reserving a table at Brew &amp; Bliss Coffee House, you agree to these terms.
                  </p>
                  <p>
                    All coffee beverages, food items, and pastries are prepared fresh. Please advise our staff of any food allergies prior to consumption. Table reservations are held for 15 minutes past the reserved time.
                  </p>
                  <p>
                    Coupons and promotional codes are valid for specified timeframes and cannot be combined with third-party discounts.
                  </p>
                </>
              )}
            </div>
            <button
              onClick={() => setActiveLegalModal(null)}
              className="w-full py-2.5 rounded-full bg-[#C9A87C] text-[#120E0B] font-semibold text-xs uppercase tracking-wider hover:bg-[#D8B98F] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
