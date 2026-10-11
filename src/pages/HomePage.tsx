import React from 'react';
import { AppPage, MenuItem, CartItem } from '../types';
import { CAFE_IMAGES, MENU_ITEMS, TESTIMONIALS } from '../data/cafeData';
import {
  Coffee,
  Croissant,
  UtensilsCrossed,
  Cake,
  GlassWater,
  Sunrise,
  ArrowRight,
  Star,
  Plus,
  Sparkles,
  Clock,
  MapPin,
  Calendar,
  Percent,
  CheckCircle2,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: AppPage) => void;
  onOpenProductModal: (item: MenuItem) => void;
  onAddToCartDirect: (item: MenuItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenProductModal,
  onAddToCartDirect,
}) => {
  const categoryShortcuts = [
    { label: 'Coffee', icon: Coffee, category: 'Coffee' as const },
    { label: 'Pastries', icon: Croissant, category: 'Pastries' as const },
    { label: 'Sandwiches', icon: UtensilsCrossed, category: 'Sandwiches' as const },
    { label: 'Desserts', icon: Cake, category: 'Desserts' as const },
    { label: 'Drinks', icon: GlassWater, category: 'Drinks' as const },
    { label: 'Breakfast', icon: Sunrise, category: 'Breakfast' as const },
  ];

  const popularPicks = MENU_ITEMS.filter((item) => item.isPopular).slice(0, 6);

  return (
    <div className="w-full bg-[#120E0B] text-[#EDE7DE] pt-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Full-bleed background with atmospheric scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={CAFE_IMAGES.hero}
            alt="Artisan barista crafting coffee at Brew & Bliss"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120E0B] via-[#120E0B]/70 to-[#120E0B]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#120E0B]/90 via-[#120E0B]/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#261E18]/85 border border-[#C9A87C]/35 text-[#C9A87C] text-xs font-semibold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisan Roastery &amp; Bakehouse</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#FAF6F0] leading-[1.05] mb-6">
              Good Coffee. <br />
              <span className="italic font-light text-[#E8CBA3]">Good Vibes.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-[#D6CBC0] font-light leading-relaxed mb-10 max-w-xl text-balance">
              Freshly brewed coffee, handcrafted drinks and delicious food made to brighten your day.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <button
                onClick={() => onNavigate('order')}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#C9A87C] text-[#14100D] font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#D8B98F] active:bg-[#B7956B] transition-all shadow-xl hover:shadow-[#C9A87C]/20 cursor-pointer"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#261E18]/85 text-[#EDE7DE] border border-[#C9A87C]/40 font-medium text-xs sm:text-sm uppercase tracking-wider hover:bg-[#342921] hover:border-[#C9A87C] transition-all backdrop-blur-md cursor-pointer"
              >
                <span>View Menu</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#C9A87C] hover:text-[#FAF6F0] transition-colors py-2 px-1 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table →</span>
              </button>
            </div>

            {/* Mini Trust Stats */}
            <div className="mt-12 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-[#BFB2A3] border-t border-[#C9A87C]/20 pt-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Open Today until 7:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#C9A87C] text-[#C9A87C]" />
                <span className="font-mono tabular-nums">4.9/5 Rating (1,200+ Reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C9A87C]" />
                <span>Downtown Portland</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY ICON SHORTCUTS */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-4 sm:p-6 rounded-3xl bg-[#1A1511]/90 backdrop-blur-xl border border-[#C9A87C]/25 shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {categoryShortcuts.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.label}
                  onClick={() => onNavigate('menu')}
                  className="group p-4 rounded-2xl bg-[#221A15] border border-[#2F241D] hover:border-[#C9A87C] transition-all duration-300 flex flex-col items-center justify-center gap-2.5 text-center cursor-pointer hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2D231C] border border-[#C9A87C]/30 flex items-center justify-center text-[#C9A87C] group-hover:bg-[#C9A87C] group-hover:text-[#14100D] transition-all">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[#FAF6F0] group-hover:text-[#C9A87C] transition-colors">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* POPULAR PICKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A87C] mb-2">
              Customer Favorites
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#FAF6F0] tracking-tight">
              Popular Picks
            </h2>
          </div>

          <button
            onClick={() => onNavigate('menu')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A87C] hover:text-[#FAF6F0] transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>Explore All 25+ Creations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {popularPicks.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-[#1A1512] border border-[#C9A87C]/20 hover:border-[#C9A87C]/60 overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image */}
              <div
                onClick={() => onOpenProductModal(item)}
                className="relative aspect-[4/3] w-full overflow-hidden bg-[#241D17] cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1512] via-transparent to-transparent opacity-80" />

                {/* Rating Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-[#14100D]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#C9A87C]/30 text-xs">
                  <Star className="w-3.5 h-3.5 fill-[#C9A87C] text-[#C9A87C]" />
                  <span className="font-mono font-medium text-[#FAF6F0]">{item.rating}</span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#14100D] bg-[#C9A87C] px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                      onClick={() => onOpenProductModal(item)}
                      className="font-serif text-2xl text-[#FAF6F0] font-medium group-hover:text-[#E8CBA3] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#BFB2A3] font-light line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#29221C] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#8C7D6D] block">Price</span>
                    <span className="font-mono text-xl font-bold text-[#FAF6F0] tabular-nums">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenProductModal(item)}
                      className="px-3.5 py-2 rounded-full border border-[#C9A87C]/30 text-xs text-[#D5C9BD] hover:border-[#C9A87C] hover:text-[#FAF6F0] transition-colors cursor-pointer"
                    >
                      Customize
                    </button>
                    <button
                      onClick={() => onAddToCartDirect(item)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C9A87C] text-[#14100D] font-semibold text-xs uppercase tracking-wider hover:bg-[#D8B98F] transition-all cursor-pointer shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WEEKEND SPECIAL PROMOTIONAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#291F18] via-[#35271E] to-[#241A14] border border-[#C9A87C]/30 shadow-2xl p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A87C]/20 border border-[#C9A87C]/40 text-[#C9A87C] text-xs font-semibold uppercase tracking-wider">
                <Percent className="w-3.5 h-3.5" />
                <span>Weekend Special Offer</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FAF6F0] font-normal tracking-tight">
                20% OFF Coffee Orders Every Weekend
              </h3>

              <p className="text-sm sm:text-base text-[#D1C7BA] font-light max-w-xl leading-relaxed">
                Enjoy 20% off all single-origin pour-overs, handcrafted espresso drinks, and draft nitro cold brews every Saturday &amp; Sunday. Apply code at checkout or mention in-store.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 bg-[#1C1511] px-4 py-2 rounded-xl border border-[#C9A87C]/30 font-mono text-sm text-[#C9A87C] font-semibold tracking-wider">
                  <span>PROMO: BLISS20</span>
                </div>

                <button
                  onClick={() => onNavigate('order')}
                  className="px-6 py-3 rounded-full bg-[#C9A87C] text-[#14100D] font-semibold text-xs uppercase tracking-wider hover:bg-[#D8B98F] transition-all cursor-pointer shadow-lg"
                >
                  Order With Discount
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 relative flex justify-center">
              <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-[#C9A87C]/30 shadow-2xl relative">
                <img
                  src={CAFE_IMAGES.coldBrew}
                  alt="Cold brew discount beverage"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAFÉ HIGHLIGHTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A87C] mb-2">
            The Brew &amp; Bliss Promise
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#FAF6F0] tracking-tight">
            Why Our Guests Return Daily
          </h2>
          <div className="w-16 h-[2px] bg-[#C9A87C]/50 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Direct-Trade Coffee',
              desc: 'Single-origin beans sourced directly from generational farms in Ethiopia and Colombia, paying 45% above Fair Trade.',
              icon: Coffee,
            },
            {
              title: '5 AM Deck Baking',
              desc: '72-hour laminated French butter croissants and sourdough breads baked fresh from scratch every single morning.',
              icon: Croissant,
            },
            {
              title: 'Cozy Third Place',
              desc: 'Designed with fluted oak booths, soft ambient lighting, and high-speed fiber Wi-Fi for your focus and relaxation.',
              icon: Sparkles,
            },
            {
              title: 'Hospitality First',
              desc: 'Passionate, friendly baristas dedicated to pulling your personalized cup with precision and care every visit.',
              icon: CheckCircle2,
            },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#1A1512] border border-[#2B221B] hover:border-[#C9A87C]/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#261E18] border border-[#C9A87C]/30 flex items-center justify-center text-[#C9A87C] mb-4">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#FAF6F0] mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#BFB2A3] font-light leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-[#181310] border border-[#C9A87C]/20 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Main Featured Testimonial */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C9A87C] text-[#C9A87C]" />
                ))}
                <span className="text-xs uppercase tracking-wider text-[#A89885] ml-2 font-medium">
                  5.0 Verified Guest Review
                </span>
              </div>

              <blockquote className="font-serif text-2xl sm:text-3xl text-[#FAF6F0] font-normal leading-snug">
                &ldquo;{TESTIMONIALS[0].comment}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-full bg-[#2A2019] border border-[#C9A87C]/40 flex items-center justify-center text-[#C9A87C] font-serif text-lg font-semibold">
                  {TESTIMONIALS[0].avatarText}
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#FAF6F0] font-medium leading-none">
                    {TESTIMONIALS[0].name}
                  </h4>
                  <p className="text-xs text-[#A89885] mt-1 font-light">
                    {TESTIMONIALS[0].role} · Loves: {TESTIMONIALS[0].favoriteItem}
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary Testimonials */}
            <div className="lg:col-span-5 space-y-4">
              {TESTIMONIALS.slice(1, 3).map((t) => (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl bg-[#201914] border border-[#2B231D] space-y-2.5"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C9A87C] text-[#C9A87C]" />
                    ))}
                    <span className="text-[11px] font-semibold text-[#FAF6F0] ml-2">{t.name}</span>
                  </div>
                  <p className="text-xs text-[#BFB2A3] font-light leading-relaxed italic">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                  <p className="text-[10px] text-[#C9A87C] uppercase tracking-wider">
                    Favorite: {t.favoriteItem}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOURS & LOCATION PREVIEW TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-[#1A1512] border border-[#C9A87C]/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#261E18] text-[#C9A87C] flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-serif text-2xl text-[#FAF6F0] mb-3">Opening Hours</h3>
              <div className="space-y-2 text-xs text-[#BFB2A3]">
                <div className="flex justify-between border-b border-[#29221C] pb-1.5">
                  <span>Monday – Friday</span>
                  <span className="font-mono text-[#FAF6F0]">6:30 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-[#29221C] pb-1.5">
                  <span>Saturday – Sunday</span>
                  <span className="font-mono text-[#FAF6F0]">7:00 AM – 8:00 PM</span>
                </div>
                <p className="text-[#C9A87C] pt-1">Fresh bakery service starts at 7:00 AM daily.</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('order')}
              className="mt-6 w-full py-2.5 rounded-full border border-[#C9A87C]/40 text-xs text-[#FAF6F0] hover:bg-[#C9A87C] hover:text-[#120E0B] font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              Order for Morning Pickup
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-[#1A1512] border border-[#C9A87C]/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#261E18] text-[#C9A87C] flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-serif text-2xl text-[#FAF6F0] mb-3">Visit the House</h3>
              <p className="text-xs sm:text-sm text-[#BFB2A3] font-light leading-relaxed mb-2">
                742 Evergreen Row, Downtown Artisan District
              </p>
              <p className="text-xs text-[#A89885] mb-4">
                Portland, Oregon 97205 · Free guest parking behind building
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="mt-6 w-full py-2.5 rounded-full bg-[#C9A87C] text-[#14100D] text-xs font-semibold uppercase tracking-wider hover:bg-[#D8B98F] transition-all cursor-pointer"
            >
              Get Directions &amp; View Map
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-[#1A1512] border border-[#C9A87C]/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#261E18] text-[#C9A87C] flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="font-serif text-2xl text-[#FAF6F0] mb-3">Reserve a Seat</h3>
              <p className="text-xs sm:text-sm text-[#BFB2A3] font-light leading-relaxed mb-4">
                Planning a coffee meeting or an afternoon tasting? Reserve one of our sunlit window booths or quiet reading nooks online.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="mt-6 w-full py-2.5 rounded-full border border-[#C9A87C]/40 text-xs text-[#FAF6F0] hover:bg-[#C9A87C] hover:text-[#120E0B] font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              Book a Table Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
