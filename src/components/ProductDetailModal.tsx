import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { X, Plus, Minus, Star, Sparkles, Check } from 'lucide-react';

interface ProductDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (customizedItem: CartItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const isBeverage = ['Coffee', 'Espresso', 'Cold Coffee', 'Tea', 'Drinks'].includes(item.category);

  const [size, setSize] = useState<'Regular' | 'Large'>('Regular');
  const [milk, setMilk] = useState<string>('Whole Milk');
  const [extraShots, setExtraShots] = useState<number>(0);
  const [syrup, setSyrup] = useState<string>('None');
  const [quantity, setQuantity] = useState<number>(1);
  const [instructions, setInstructions] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Price calculations
  const sizePrice = size === 'Large' ? 1.25 : 0;
  const milkPrice = ['Oat Milk', 'Almond Milk', 'Coconut Milk'].includes(milk) ? 0.75 : 0;
  const shotsPrice = extraShots === 1 ? 1.00 : extraShots === 2 ? 1.75 : 0;
  const syrupPrice = syrup !== 'None' ? 0.60 : 0;

  const unitPrice = isBeverage
    ? item.price + sizePrice + milkPrice + shotsPrice + syrupPrice
    : item.price;

  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const cartItemId = `${item.id}-${size}-${milk}-${extraShots}-${syrup}-${Date.now()}`;
    const cartItem: CartItem = {
      cartItemId,
      menuItem: item,
      quantity,
      unitPrice,
      totalPrice,
      customization: isBeverage
        ? {
            size,
            sizePrice,
            milk,
            milkPrice,
            extraShots,
            extraShotsPrice: shotsPrice,
            syrup: syrup !== 'None' ? syrup : undefined,
            syrupPrice,
            specialInstructions: instructions.trim() || undefined,
          }
        : instructions.trim()
        ? {
            size: 'Standard',
            sizePrice: 0,
            extraShots: 0,
            extraShotsPrice: 0,
            specialInstructions: instructions.trim(),
          }
        : undefined,
    };

    setAddedAnimation(true);
    setTimeout(() => {
      onAddToCart(cartItem);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative z-10 w-full max-w-2xl bg-[#181411] border border-[#C9A87C]/30 rounded-3xl overflow-hidden shadow-2xl text-[#EDE7DE] my-8 animate-in zoom-in-95 duration-200">
        {/* Top Header image with close button */}
        <div className="relative h-56 sm:h-64 w-full bg-[#261E18] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181411] via-[#181411]/50 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C9A87C] hover:text-[#181411] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C9A87C] bg-[#14100D]/80 px-2.5 py-0.5 rounded-full border border-[#C9A87C]/30">
                {item.category}
              </span>
              {item.calories && (
                <span className="text-[11px] text-[#BFB2A3]">· {item.calories}</span>
              )}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#FAF6F0] leading-tight">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Description & Rating */}
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs sm:text-sm text-[#BFB2A3] font-light leading-relaxed">
              {item.description}
            </p>
            <div className="flex items-center gap-1 shrink-0 bg-[#241D17] px-2.5 py-1 rounded-full border border-[#C9A87C]/20">
              <Star className="w-3.5 h-3.5 fill-[#C9A87C] text-[#C9A87C]" />
              <span className="text-xs font-mono font-medium text-[#FAF6F0]">{item.rating}</span>
              <span className="text-[10px] text-[#A89885]">({item.reviewCount})</span>
            </div>
          </div>

          {/* Beverage Customization Options */}
          {isBeverage && (
            <div className="space-y-5 pt-2 border-t border-[#29221C]">
              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#A89885]">
                    Size Option
                  </label>
                  <span className="text-[11px] text-[#C9A87C]">Required</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSize('Regular')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      size === 'Regular'
                        ? 'border-[#C9A87C] bg-[#291F18] text-[#FAF6F0]'
                        : 'border-[#29221C] bg-[#1C1612] text-[#BFB2A3] hover:border-[#C9A87C]/40'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Regular (12 oz)</span>
                      <span className="font-mono text-xs text-[#C9A87C]">Included</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSize('Large')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      size === 'Large'
                        ? 'border-[#C9A87C] bg-[#291F18] text-[#FAF6F0]'
                        : 'border-[#29221C] bg-[#1C1612] text-[#BFB2A3] hover:border-[#C9A87C]/40'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Large (16 oz)</span>
                      <span className="font-mono text-xs text-[#C9A87C]">+$1.25</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Milk Option */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89885] mb-2">
                  Choice of Milk / Dairy
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { name: 'Whole Milk', extra: 0 },
                    { name: 'Oat Milk', extra: 0.75 },
                    { name: 'Almond Milk', extra: 0.75 },
                    { name: 'Coconut Milk', extra: 0.75 },
                  ].map((m) => (
                    <button
                      key={m.name}
                      type="button"
                      onClick={() => setMilk(m.name)}
                      className={`p-2.5 rounded-xl border text-center transition-all text-xs cursor-pointer ${
                        milk === m.name
                          ? 'border-[#C9A87C] bg-[#291F18] text-[#FAF6F0] font-semibold'
                          : 'border-[#29221C] bg-[#1C1612] text-[#BFB2A3] hover:border-[#C9A87C]/30'
                      }`}
                    >
                      <div className="truncate">{m.name}</div>
                      <div className="text-[10px] text-[#A89885] font-mono mt-0.5">
                        {m.extra > 0 ? `+$${m.extra.toFixed(2)}` : 'Free'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Espresso Shots */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89885] mb-2">
                  Espresso Boost
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Standard', count: 0, price: 0 },
                    { label: '+1 Shot', count: 1, price: 1.00 },
                    { label: '+2 Shots', count: 2, price: 1.75 },
                  ].map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setExtraShots(s.count)}
                      className={`p-2 rounded-xl border text-center transition-all text-xs cursor-pointer ${
                        extraShots === s.count
                          ? 'border-[#C9A87C] bg-[#291F18] text-[#FAF6F0] font-semibold'
                          : 'border-[#29221C] bg-[#1C1612] text-[#BFB2A3] hover:border-[#C9A87C]/30'
                      }`}
                    >
                      <div>{s.label}</div>
                      <div className="text-[10px] text-[#C9A87C] font-mono mt-0.5">
                        {s.price > 0 ? `+$${s.price.toFixed(2)}` : 'Standard'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Artisan Syrups */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89885] mb-2">
                  House Flavors &amp; Syrups (+$0.60)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[
                    'None',
                    'Madagascar Vanilla',
                    'Salted Caramel',
                    'Hazelnut',
                    'Lavender',
                  ].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSyrup(s)}
                      className={`p-2 rounded-xl border text-center transition-all text-[11px] cursor-pointer ${
                        syrup === s
                          ? 'border-[#C9A87C] bg-[#291F18] text-[#FAF6F0] font-medium'
                          : 'border-[#29221C] bg-[#1C1612] text-[#BFB2A3] hover:border-[#C9A87C]/30'
                      }`}
                    >
                      <span className="truncate block">{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="pt-2 border-t border-[#29221C]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89885] mb-1.5">
              Special Instructions
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Extra hot, light ice, toast well, on the side..."
              className="w-full bg-[#1C1612] border border-[#2B231D] focus:border-[#C9A87C] rounded-xl px-3.5 py-2 text-xs text-[#FAF6F0] placeholder-[#6E6255] focus:outline-none"
            />
          </div>
        </div>

        {/* Modal Footer: Quantity Stepper & Add to Cart button */}
        <div className="p-6 bg-[#15110E] border-t border-[#29221C] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-[#1F1914] px-3 py-1.5 rounded-full border border-[#3A2F25]">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#A89885] hover:text-[#FAF6F0] transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-sm font-bold text-[#FAF6F0] w-5 text-center tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#A89885] hover:text-[#FAF6F0] transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-[#C9A87C] text-[#120E0B] hover:bg-[#D8B98F] active:bg-[#B7956B]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Add to Cart · ${totalPrice.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
