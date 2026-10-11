import React from 'react';
import { AppPage } from '../types';
import { CAFE_IMAGES, TEAM_MEMBERS, STATS, TIMELINE } from '../data/cafeData';
import { Heart, Award, Sprout, Users, ArrowRight, ShieldCheck, Compass, Sparkles } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: AppPage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#120E0B] text-[#EDE7DE] pt-28 pb-24 min-h-screen">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#241D17] border border-[#C9A87C]/30 text-[#C9A87C] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Our Journey &amp; Heritage</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#FAF6F0] tracking-tight leading-tight mb-6">
            More Than Coffee. <br />
            <span className="italic font-light text-[#E8CBA3]">It's a Feeling.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#BFB2A3] font-light leading-relaxed">
            Founded on the belief that a neighborhood café should be an unhurried sanctuary, Brew &amp; Bliss marries ethical single-origin roasts with 5 AM artisan baking and genuine human warmth.
          </p>
        </div>

        {/* Hero Visual Collage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 rounded-3xl overflow-hidden border border-[#C9A87C]/30 shadow-2xl aspect-[16/10] relative">
            <img
              src={CAFE_IMAGES.interior}
              alt="Warm wood interior of Brew & Bliss"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120E0B]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#1A1512]/80 backdrop-blur-md border border-[#C9A87C]/25 text-xs text-[#D1C7BA]">
              Our flagship house on Evergreen Row — natural fluted white oak, ambient linen pendant lamps, and room for 70 coffee lovers.
            </div>
          </div>

          <div className="md:col-span-5 rounded-3xl overflow-hidden border border-[#C9A87C]/30 shadow-2xl aspect-square relative">
            <img
              src={CAFE_IMAGES.team}
              alt="Brew & Bliss Barista Team"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120E0B]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#1A1512]/80 backdrop-blur-md border border-[#C9A87C]/25 text-xs text-[#D1C7BA]">
              Certified Q-Graders, passionate bakers, and baristas united by a devotion to the craft.
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#181310] border border-[#C9A87C]/25 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#C9A87C] block tabular-nums">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#BFB2A3] font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY & CRAFT PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A87C] mb-2">
            The Principles
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#FAF6F0] tracking-tight">
            Our Philosophy &amp; Sourcing
          </h2>
          <div className="w-16 h-[2px] bg-[#C9A87C]/50 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#1A1512] border border-[#2B221B] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#261E18] text-[#C9A87C] flex items-center justify-center">
              <Sprout className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-2xl text-[#FAF6F0]">Direct-Trade Coffee</h3>
            <p className="text-xs sm:text-sm text-[#BFB2A3] font-light leading-relaxed">
              We bypass speculative coffee markets and negotiate directly with farmer cooperatives in Huila, Colombia and Yirgacheffe, Ethiopia. By guaranteeing 45% above Fair Trade prices, we protect farm heritage and secure harvest micro-lots.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#1A1512] border border-[#2B221B] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#261E18] text-[#C9A87C] flex items-center justify-center">
              <Heart className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-2xl text-[#FAF6F0]">72-Hour Lamination</h3>
            <p className="text-xs sm:text-sm text-[#BFB2A3] font-light leading-relaxed">
              We never use frozen doughs or artificial stabilizers. Our executive pastry chef laminates unbleached flour with cultured 84% butterfat French butter over three days, achieving true honeycomb flakiness when hot from our deck ovens.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#1A1512] border border-[#2B221B] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#261E18] text-[#C9A87C] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-2xl text-[#FAF6F0]">Quality Promise</h3>
            <p className="text-xs sm:text-sm text-[#BFB2A3] font-light leading-relaxed">
              If your beverage is not pulled to your absolute liking, our baristas will gladly remake it without question. We calibrate grind size, water mineral PPM, and steam temperature every two hours of service.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A87C] mb-2">
            The Artisans
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#FAF6F0] tracking-tight">
            Meet Our Leadership Team
          </h2>
          <div className="w-16 h-[2px] bg-[#C9A87C]/50 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="group rounded-3xl bg-[#1A1512] border border-[#2B221B] overflow-hidden shadow-lg"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#241D17]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-2xl text-[#FAF6F0]">{member.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#C9A87C]">
                  {member.role}
                </p>
                <p className="text-xs text-[#BFB2A3] font-light leading-relaxed pt-2">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A87C] mb-2">
            Milestones
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#FAF6F0]">
            The Story in Stages
          </h2>
        </div>

        <div className="space-y-8 relative before:content-[''] before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#2B221B]">
          {TIMELINE.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-6 pl-2">
              <div className="w-9 h-9 rounded-full bg-[#C9A87C] text-[#14100D] font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-lg z-10">
                {idx + 1}
              </div>
              <div className="p-6 rounded-2xl bg-[#1A1512] border border-[#2B221B] flex-1">
                <span className="font-mono text-xs text-[#C9A87C] font-semibold block mb-1">
                  {step.year}
                </span>
                <h4 className="font-serif text-xl text-[#FAF6F0] mb-2">{step.title}</h4>
                <p className="text-xs sm:text-sm text-[#BFB2A3] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VISIT CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#291F18] via-[#33251D] to-[#201813] border border-[#C9A87C]/30 text-center space-y-6 shadow-2xl">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FAF6F0] max-w-xl mx-auto leading-tight">
            Ready to Taste the Difference?
          </h2>
          <p className="text-sm sm:text-base text-[#D1C7BA] font-light max-w-lg mx-auto">
            Pull up a chair on Evergreen Row, breathe in the fresh roasts, and let our team brighten your day.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 rounded-full bg-[#C9A87C] text-[#14100D] font-bold text-xs uppercase tracking-wider hover:bg-[#D8B98F] transition-all cursor-pointer shadow-lg"
            >
              Visit Brew &amp; Bliss
            </button>
            <button
              onClick={() => onNavigate('menu')}
              className="px-8 py-3.5 rounded-full border border-[#C9A87C]/40 text-[#FAF6F0] font-semibold text-xs uppercase tracking-wider hover:bg-[#251E18] transition-all cursor-pointer"
            >
              Explore Our Menu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
