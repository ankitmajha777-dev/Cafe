import React from 'react';
import { Phone, MessageCircle, ShoppingBag } from 'lucide-react';
import { AppPage } from '../types';

interface FloatingActionsProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (page: AppPage) => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
}) => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Floating Call CTA */}
      <a
        href="tel:5035550198"
        aria-label="Call Brew & Bliss"
        className="w-11 h-11 rounded-full bg-[#1C1612] text-[#FAF6F0] hover:text-[#C9A87C] border border-[#C9A87C]/30 shadow-xl flex items-center justify-center hover:scale-105 transition-all"
      >
        <Phone className="w-5 h-5 text-[#C9A87C]" />
      </a>

      {/* Floating WhatsApp CTA */}
      <a
        href="https://wa.me/15035550198"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Brew & Bliss"
        className="w-11 h-11 rounded-full bg-[#1A2E1D] text-emerald-400 border border-emerald-500/40 shadow-xl flex items-center justify-center hover:scale-105 transition-all"
      >
        <MessageCircle className="w-5 h-5" />
      </a>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <button
          onClick={onOpenCart}
          aria-label="View Cart"
          className="px-4 py-2.5 rounded-full bg-[#C9A87C] text-[#14100D] font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 hover:bg-[#D8B98F] active:scale-95 transition-all cursor-pointer animate-in slide-in-from-bottom"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Cart ({cartCount})</span>
        </button>
      )}
    </div>
  );
};
