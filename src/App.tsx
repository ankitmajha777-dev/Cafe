/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AppPage, CartItem, MenuItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingActions } from './components/FloatingActions';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { OrderPage } from './pages/OrderPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { OffersPage } from './pages/OffersPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Discount & loyalty coupons state
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountCode, setDiscountCode] = useState<string>('');

  const cartTotalCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (customizedItem: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (ci) => ci.cartItemId === customizedItem.cartItemId
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + customizedItem.quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          totalPrice: updated[existingIdx].unitPrice * newQty,
        };
        return updated;
      }
      return [...prev, customizedItem];
    });
  };

  const handleAddToCartDirect = (item: MenuItem) => {
    const isBeverage = ['Coffee', 'Espresso', 'Cold Coffee', 'Tea', 'Drinks'].includes(item.category);
    const cartItemId = `${item.id}-Regular-standard-${Date.now()}`;
    const newCartItem: CartItem = {
      cartItemId,
      menuItem: item,
      quantity: 1,
      unitPrice: item.price,
      totalPrice: item.price,
      customization: isBeverage
        ? {
            size: 'Regular',
            sizePrice: 0,
            milk: 'Whole Milk',
            milkPrice: 0,
            extraShots: 0,
            extraShotsPrice: 0,
          }
        : undefined,
    };
    handleAddToCart(newCartItem);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.cartItemId === cartItemId) {
            const newQty = ci.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...ci,
              quantity: newQty,
              totalPrice: ci.unitPrice * newQty,
            };
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleApplyDiscount = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'BLISS20' || cleanCode === 'WELCOME20') {
      setAppliedDiscount(0.20);
      setDiscountCode(cleanCode);
      return { success: true, message: 'Success! 20% discount applied to your order.' };
    }
    if (cleanCode === 'BLISSFREE') {
      setAppliedDiscount(0.25);
      setDiscountCode('BLISSFREE');
      return { success: true, message: 'Free Drink reward voucher applied (25% off)!' };
    }
    if (cleanCode === 'HAPPYHOUR3') {
      setAppliedDiscount(0.15);
      setDiscountCode('HAPPYHOUR3');
      return { success: true, message: 'Happy Hour deal applied (15% off)!' };
    }
    return { success: false, message: 'Invalid coupon code. Try BLISS20 for 20% off.' };
  };

  return (
    <div className="min-h-screen bg-[#120E0B] text-[#EDE7DE] selection:bg-[#C9A87C] selection:text-[#120E0B]">
      {/* Persistent Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartDrawerOpen(true)}
      />

      {/* Main Pages Switcher */}
      <main>
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenProductModal={(item) => setCustomizingItem(item)}
            onAddToCartDirect={handleAddToCartDirect}
          />
        )}

        {currentPage === 'menu' && (
          <MenuPage
            onOpenProductModal={(item) => setCustomizingItem(item)}
            onAddToCartDirect={handleAddToCartDirect}
          />
        )}

        {currentPage === 'order' && (
          <OrderPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onOpenProductModal={(item) => setCustomizingItem(item)}
            onAddToCartDirect={handleAddToCartDirect}
            appliedDiscount={appliedDiscount}
            discountCode={discountCode}
            onApplyDiscount={handleApplyDiscount}
          />
        )}

        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentPage === 'gallery' && <GalleryPage onNavigate={handleNavigate} />}

        {currentPage === 'offers' && (
          <OffersPage
            onNavigate={handleNavigate}
            onApplyDiscount={handleApplyDiscount}
          />
        )}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Persistent Global Footer across all 7 pages */}
      <Footer onNavigate={handleNavigate} />

      {/* Product Detail Customizer Modal */}
      <ProductDetailModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Global Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onNavigate={handleNavigate}
        appliedDiscount={appliedDiscount}
        discountCode={discountCode}
        onApplyDiscount={handleApplyDiscount}
      />

      {/* Floating Call, WhatsApp & Cart Quick Action Buttons */}
      <FloatingActions
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
