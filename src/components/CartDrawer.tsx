import React, { useState } from 'react';
import { CartItem, AppPage } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Check, Coffee } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onNavigate: (page: AppPage) => void;
  appliedDiscount: number;
  discountCode: string;
  onApplyDiscount: (code: string) => { success: boolean; message: string };
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  appliedDiscount,
  discountCode,
  onApplyDiscount,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const discountAmount = subtotal * appliedDiscount;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.08;
  const total = taxableAmount + tax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyDiscount(promoInput.trim());
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  const handleProceedToCheckout = () => {
    onClose();
    onNavigate('order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#16120F] border-l border-[#C9A87C]/30 text-[#EDE7DE] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#29221C] flex items-center justify-between bg-[#1A1512]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#261E18] border border-[#C9A87C]/40 flex items-center justify-center text-[#C9A87C]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#FAF6F0]">
                  Your Order Cart
                </h3>
                <p className="text-xs text-[#A89885]">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#A89885] hover:text-[#FAF6F0] hover:bg-[#25201A] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#221B16] border border-[#C9A87C]/20 text-[#A89885] mx-auto flex items-center justify-center">
                  <Coffee className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-[#FAF6F0]">Your cart is empty</h4>
                  <p className="text-xs text-[#BFB2A3] mt-1.5 font-light max-w-xs mx-auto">
                    Explore our artisanal pour-overs, morning French croissants, or draft cold brew on tap.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('menu');
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#C9A87C] text-[#14100D] font-semibold text-xs uppercase tracking-wider hover:bg-[#D8B98F] transition-all cursor-pointer"
                >
                  Browse Full Menu
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-4 rounded-2xl bg-[#1C1612] border border-[#2B231D] flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-medium text-[#FAF6F0] truncate">
                          {item.menuItem.name}
                        </h4>
                        <span className="font-mono text-xs font-semibold text-[#C9A87C] tabular-nums shrink-0">
                          ${item.totalPrice.toFixed(2)}
                        </span>
                      </div>

                      {/* Customization Details */}
                      {item.customization && (
                        <div className="text-[11px] text-[#A89885] mt-1 space-y-0.5 font-light">
                          {item.customization.size && (
                            <div>Size: {item.customization.size}</div>
                          )}
                          {item.customization.milk && (
                            <div>Milk: {item.customization.milk}</div>
                          )}
                          {item.customization.extraShots > 0 && (
                            <div>+{item.customization.extraShots} Espresso Shot(s)</div>
                          )}
                          {item.customization.syrup && (
                            <div>Flavor: {item.customization.syrup}</div>
                          )}
                          {item.customization.specialInstructions && (
                            <div className="italic text-[#C9A87C]/80">
                              Note: {item.customization.specialInstructions}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center gap-2 bg-[#251E18] px-2 py-0.5 rounded-full border border-[#3A2F25]">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[#A89885] hover:text-[#FAF6F0] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-semibold text-[#FAF6F0] w-4 text-center tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[#A89885] hover:text-[#FAF6F0] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="p-1 text-[#8C7D6D] hover:text-[#E57373] transition-colors cursor-pointer ml-auto"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Input */}
                <div className="p-3.5 rounded-2xl bg-[#1C1612] border border-[#2B231D]">
                  <form onSubmit={handleApplyPromo} className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#A89885] shrink-0" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. BLISS20)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-transparent text-xs text-[#FAF6F0] placeholder-[#6E6255] focus:outline-none uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-full bg-[#292019] text-[#C9A87C] hover:bg-[#C9A87C] hover:text-[#120E0B] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {promoMessage && (
                    <p
                      className={`text-[11px] mt-2 ${
                        promoMessage.isError ? 'text-[#E57373]' : 'text-emerald-400'
                      }`}
                    >
                      {promoMessage.text}
                    </p>
                  )}
                  {discountCode && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                      <span>Coupon applied: {discountCode} ({(appliedDiscount * 100).toFixed(0)}% OFF)</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#29221C] bg-[#1A1512] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#A89885]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#FAF6F0] tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({(appliedDiscount * 100).toFixed(0)}%)</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#A89885]">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono text-[#FAF6F0] tabular-nums">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#FAF6F0] pt-2 border-t border-[#29221C]">
                  <span>Estimated Total</span>
                  <span className="font-mono text-[#C9A87C] tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-full bg-[#C9A87C] text-[#120E0B] font-semibold text-xs uppercase tracking-wider hover:bg-[#D8B98F] active:bg-[#B7956B] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
