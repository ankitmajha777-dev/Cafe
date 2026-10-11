import React, { useState, useEffect } from 'react';
import { AppPage } from '../types';
import { Coffee, ShoppingBag, Menu as MenuIcon, X, Phone, Calendar } from 'lucide-react';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; page: AppPage }[] = [
    { name: 'Home', page: 'home' },
    { name: 'Menu', page: 'menu' },
    { name: 'About', page: 'about' },
    { name: 'Gallery', page: 'gallery' },
    { name: 'Offers', page: 'offers' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: AppPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#181411]/95 backdrop-blur-md border-b border-[#C9A87C]/25 shadow-xl py-3'
          : 'bg-gradient-to-b from-[#14100D]/95 via-[#14100D]/80 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group focus:outline-none text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#261E18] border border-[#C9A87C]/40 flex items-center justify-center text-[#C9A87C] group-hover:border-[#C9A87C] group-hover:scale-105 transition-all shadow-md">
              <Coffee className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-[#FAF6F0] block leading-tight group-hover:text-[#E8CBA3] transition-colors">
                Brew &amp; Bliss
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A87C] block font-medium">
                Coffee House
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-sm font-medium tracking-wide transition-all py-1 relative cursor-pointer ${
                    isActive
                      ? 'text-[#C9A87C] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C9A87C]'
                      : 'text-[#D5C9BD] hover:text-[#FAF6F0] hover:after:w-full after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C9A87C]/50 after:transition-all after:duration-300'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs: Order Now, Table Reservation, Cart Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Call link for US Cafe feel */}
            <a
              href="tel:5035550198"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs text-[#BFB2A3] hover:text-[#C9A87C] px-3 py-1.5 rounded-full border border-[#C9A87C]/20 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A87C]" />
              <span className="font-mono tabular-nums">(503) 555-0198</span>
            </a>

            {/* Book a Table shortcut */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#D5C9BD] hover:text-[#FAF6F0] border border-[#C9A87C]/30 hover:border-[#C9A87C] rounded-full transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C9A87C]" />
              <span>Book Table</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#241D17] border border-[#C9A87C]/35 hover:border-[#C9A87C] text-[#C9A87C] hover:text-[#FAF6F0] transition-colors cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#8C3A27] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now Button */}
            <button
              onClick={() => handleNavClick('order')}
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#14100D] bg-[#C9A87C] hover:bg-[#D8B98F] active:bg-[#B7956B] rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Order Now</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#D5C9BD] hover:text-[#C9A87C] focus:outline-none rounded-lg cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181411]/98 border-b border-[#C9A87C]/25 px-6 py-6 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page)}
                className={`text-left text-lg font-serif tracking-wide py-2.5 border-b border-[#2B231D] flex items-center justify-between cursor-pointer ${
                  currentPage === link.page ? 'text-[#C9A87C] font-semibold' : 'text-[#EDE7DE] hover:text-[#C9A87C]'
                }`}
              >
                <span>{link.name}</span>
                {currentPage === link.page && <span className="text-xs font-mono text-[#C9A87C]">Active</span>}
              </button>
            ))}

            <div className="pt-3 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] border border-[#C9A87C]/40 rounded-full"
              >
                Book a Table
              </button>
              <button
                onClick={() => handleNavClick('order')}
                className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#14100D] bg-[#C9A87C] hover:bg-[#D8B98F] rounded-full"
              >
                Order Online Now {cartCount > 0 ? `(${cartCount})` : ''}
              </button>
              <a
                href="tel:5035550198"
                className="w-full py-2.5 text-center text-xs text-[#BFB2A3] flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A87C]" />
                <span>Call Us: (503) 555-0198</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
