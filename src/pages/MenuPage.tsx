import React, { useState } from 'react';
import { MenuCategory, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/cafeData';
import { Search, Star, Plus, SlidersHorizontal, Sparkles } from 'lucide-react';

interface MenuPageProps {
  onOpenProductModal: (item: MenuItem) => void;
  onAddToCartDirect: (item: MenuItem) => void;
}

const CATEGORIES: MenuCategory[] = [
  'Coffee',
  'Espresso',
  'Cold Coffee',
  'Tea',
  'Pastries',
  'Breakfast',
  'Sandwiches',
  'Desserts',
  'Drinks',
];

export const MenuPage: React.FC<MenuPageProps> = ({
  onOpenProductModal,
  onAddToCartDirect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPopularOnly, setFilterPopularOnly] = useState(false);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPopular = !filterPopularOnly || item.isPopular;

    return matchesCategory && matchesSearch && matchesPopular;
  });

  return (
    <div className="w-full bg-[#120E0B] text-[#EDE7DE] pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#241D17] border border-[#C9A87C]/30 text-[#C9A87C] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Crafted Fresh Daily</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FAF6F0] font-normal tracking-tight">
            Our Café Menu
          </h1>
          <div className="w-16 h-[2px] bg-[#C9A87C]/50 mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#BFB2A3] font-light leading-relaxed">
            From single-origin pour-overs to 72-hour laminated French croissants and savory hot paninis. Select any item to customize size, milk, and flavors.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#181310] p-4 sm:p-5 rounded-3xl border border-[#2B221B] mb-8 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#8C7D6D] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drinks, pastries, breakfast..."
              className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-full pl-11 pr-4 py-2.5 text-xs sm:text-sm text-[#FAF6F0] placeholder-[#6E6255] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8C7D6D] hover:text-[#FAF6F0]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => setFilterPopularOnly(!filterPopularOnly)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                filterPopularOnly
                  ? 'bg-[#C9A87C] text-[#14100D]'
                  : 'bg-[#221B16] text-[#BFB2A3] border border-[#2B221B] hover:border-[#C9A87C]/30'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Popular Picks Only</span>
            </button>

            <span className="text-xs text-[#8C7D6D] font-mono tabular-nums hidden sm:inline">
              {filteredItems.length} items
            </span>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-[#C9A87C] text-[#14100D] font-semibold shadow-md'
                : 'bg-[#1A1410] text-[#BFB2A3] hover:text-[#FAF6F0] border border-[#2B221B]'
            }`}
          >
            All Items ({MENU_ITEMS.length})
          </button>

          {CATEGORIES.map((cat) => {
            const count = MENU_ITEMS.filter((i) => i.category === cat).length;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A87C] text-[#14100D] font-semibold shadow-md'
                    : 'bg-[#1A1410] text-[#BFB2A3] hover:text-[#FAF6F0] border border-[#2B221B]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#16120E] rounded-3xl border border-[#2B221B]">
            <p className="font-serif text-2xl text-[#FAF6F0] mb-2">No menu items match your search</p>
            <p className="text-xs text-[#BFB2A3] mb-6">
              Try searching for something else like "cold brew", "croissant", or "panini".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setFilterPopularOnly(false);
              }}
              className="px-6 py-2.5 rounded-full bg-[#C9A87C] text-[#14100D] font-semibold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl bg-[#1A1512] border border-[#2B221B] hover:border-[#C9A87C]/50 transition-all duration-300 overflow-hidden shadow-lg flex flex-col justify-between"
              >
                {/* Image Section */}
                <div
                  onClick={() => onOpenProductModal(item)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#241D17] cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1512] via-transparent to-transparent opacity-75" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FAF6F0] bg-[#14100D]/85 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-[#C9A87C]/25">
                      {item.category}
                    </span>
                    {item.isPopular && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#14100D] bg-[#C9A87C] px-2.5 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-[#14100D]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#C9A87C]/20 text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#C9A87C] text-[#C9A87C]" />
                    <span className="font-mono font-medium text-[#FAF6F0]">{item.rating}</span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h3
                        onClick={() => onOpenProductModal(item)}
                        className="font-serif text-2xl text-[#FAF6F0] font-normal group-hover:text-[#E8CBA3] transition-colors cursor-pointer"
                      >
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#BFB2A3] font-light leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] text-[#A89885] px-2 py-0.5 rounded bg-[#221A15] border border-[#2D231C]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#29221C] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xl font-bold text-[#FAF6F0] tabular-nums">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.calories && (
                        <span className="text-[11px] text-[#8C7D6D] block font-mono">
                          {item.calories}
                        </span>
                      )}
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
        )}
      </div>
    </div>
  );
};
