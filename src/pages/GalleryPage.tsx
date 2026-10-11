import React, { useState } from 'react';
import { AppPage, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/cafeData';
import { Camera, Heart, Instagram, X, ArrowRight, Sparkles } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: AppPage) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryItem['category'] | 'All'>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>(
    GALLERY_ITEMS.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.likes }), {})
  );
  const [userLikedMap, setUserLikedMap] = useState<Record<string, boolean>>({});

  const categories: (GalleryItem['category'] | 'All')[] = [
    'All',
    'Café',
    'Coffee',
    'Food',
    'Desserts',
    'Events',
  ];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const hasLiked = userLikedMap[id];
    setUserLikedMap({ ...userLikedMap, [id]: !hasLiked });
    setLikesMap({
      ...likesMap,
      [id]: (likesMap[id] || 0) + (hasLiked ? -1 : 1),
    });
  };

  return (
    <div className="w-full bg-[#120E0B] text-[#EDE7DE] pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#241D17] border border-[#C9A87C]/30 text-[#C9A87C] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Moments</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FAF6F0] font-normal tracking-tight">
            The Café Gallery
          </h1>
          <div className="w-16 h-[2px] bg-[#C9A87C]/50 mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#BFB2A3] font-light leading-relaxed">
            A window into our morning extractions, flour-dusted pastry tables, and warm neighborhood gatherings on Evergreen Row.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A87C] text-[#14100D] font-semibold shadow-md'
                    : 'bg-[#1A1410] text-[#BFB2A3] hover:text-[#FAF6F0] border border-[#2B221B]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry-Style Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isLiked = !!userLikedMap[item.id];
            const currentLikes = likesMap[item.id] || item.likes;

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="group relative rounded-3xl overflow-hidden bg-[#1A1512] border border-[#2B221B] hover:border-[#C9A87C]/50 transition-all duration-500 shadow-xl cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#241D17]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14100D] via-[#14100D]/40 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
                </div>

                {/* Hover Details Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="flex justify-between items-center pointer-events-auto">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#FAF6F0] bg-[#14100D]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#C9A87C]/30">
                      {item.category}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleToggleLike(item.id, e)}
                      className="flex items-center gap-1.5 bg-[#14100D]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#C9A87C]/30 text-xs text-[#FAF6F0] hover:text-[#E57373] transition-colors"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-colors ${
                          isLiked ? 'text-[#E57373] fill-[#E57373]' : 'text-white'
                        }`}
                      />
                      <span className="font-mono tabular-nums">{currentLikes}</span>
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl text-[#FAF6F0] font-normal leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#D1C7BA] line-clamp-2 font-light">
                      {item.description}
                    </p>
                    <span className="text-[10px] text-[#C9A87C] uppercase tracking-wider block pt-1">
                      Click to view full photo →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* INSTAGRAM-STYLE SECTION */}
        <section className="mt-24 p-8 sm:p-12 rounded-3xl bg-[#181310] border border-[#C9A87C]/20 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-[#29221C]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#C9A87C] to-[#E8CBA3] p-[2px]">
                <div className="w-full h-full bg-[#181310] rounded-full flex items-center justify-center text-[#C9A87C]">
                  <Instagram className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#FAF6F0]">@brewandblisscafe</h3>
                <p className="text-xs text-[#A89885]">
                  Over 18,000 coffee enthusiasts following our daily dial-in &amp; baking stories.
                </p>
              </div>
            </div>

            <a
              href="#instagram"
              className="px-6 py-2.5 rounded-full border border-[#C9A87C]/40 text-xs uppercase tracking-wider text-[#FAF6F0] hover:bg-[#C9A87C] hover:text-[#14100D] font-semibold transition-all"
            >
              Follow on Instagram
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {GALLERY_ITEMS.slice(0, 4).map((shot) => (
              <div
                key={shot.id}
                onClick={() => setActiveLightbox(shot)}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={shot.image}
                  alt={shot.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#120E0B]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-[#FAF6F0] gap-1 font-mono">
                  <Heart className="w-4 h-4 fill-[#C9A87C] text-[#C9A87C]" />
                  <span>{shot.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="mt-20 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF6F0]">
            Come Experience It Yourself
          </h2>
          <p className="text-sm text-[#BFB2A3] max-w-md mx-auto">
            Photographs capture the colors, but nothing compares to the aroma of freshly ground Guji beans and butter croissants straight from the oven.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 rounded-full bg-[#C9A87C] text-[#14100D] font-bold text-xs uppercase tracking-wider hover:bg-[#D8B98F] transition-all cursor-pointer shadow-lg flex items-center gap-2"
            >
              <span>Visit Us on Evergreen Row</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>

      {/* LIGHTBOX MODAL */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-[#181310] border border-[#C9A87C]/30 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 animate-in zoom-in-95 duration-200">
            <div className="md:col-span-8 bg-black flex items-center justify-center aspect-square md:aspect-auto">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="w-full h-full object-cover max-h-[600px]"
              />
            </div>

            <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[#1A1512]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#29221C]">
                  <span className="text-[11px] uppercase tracking-wider text-[#C9A87C] font-semibold">
                    {activeLightbox.category} Collection
                  </span>
                  <button
                    onClick={() => setActiveLightbox(null)}
                    className="p-1 rounded-full text-[#A89885] hover:text-[#FAF6F0] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-6 space-y-3">
                  <h3 className="font-serif text-3xl text-[#FAF6F0] font-normal leading-tight">
                    {activeLightbox.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#BFB2A3] font-light leading-relaxed">
                    {activeLightbox.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#29221C] space-y-4">
                <div className="flex items-center justify-between text-xs text-[#FAF6F0]">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-[#C9A87C] text-[#C9A87C]" />
                    <span className="font-mono font-medium">
                      {(likesMap[activeLightbox.id] || activeLightbox.likes).toLocaleString()} loves
                    </span>
                  </div>
                  <span className="text-[#8C7D6D]">Brew &amp; Bliss Archive</span>
                </div>

                <button
                  onClick={() => {
                    setActiveLightbox(null);
                    onNavigate('order');
                  }}
                  className="w-full py-3 rounded-full bg-[#C9A87C] text-[#14100D] font-semibold text-xs uppercase tracking-wider hover:bg-[#D8B98F] transition-all cursor-pointer"
                >
                  Order Favorite Drink
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
