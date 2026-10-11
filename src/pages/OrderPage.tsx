import React, { useState } from 'react';
import { CartItem, MenuItem, MenuCategory } from '../types';
import { MENU_ITEMS } from '../data/cafeData';
import {
  ShoppingBag,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  CreditCard,
  Banknote,
  Smartphone,
  Tag,
  ArrowRight,
  Truck,
  Store,
  Sparkles,
} from 'lucide-react';

interface OrderPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOpenProductModal: (item: MenuItem) => void;
  onAddToCartDirect: (item: MenuItem) => void;
  appliedDiscount: number;
  discountCode: string;
  onApplyDiscount: (code: string) => { success: boolean; message: string };
}

export const OrderPage: React.FC<OrderPageProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenProductModal,
  onAddToCartDirect,
  appliedDiscount,
  discountCode,
  onApplyDiscount,
}) => {
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup');
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>('All');
  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  // Checkout form fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [timeSlot, setTimeSlot] = useState('ASAP (~15-20 min)');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash'>('card');

  // Order submission state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderTicket, setOrderTicket] = useState<{
    id: string;
    total: number;
    items: CartItem[];
    time: string;
    type: 'pickup' | 'delivery';
  } | null>(null);

  // Calculations
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const discountAmount = subtotal * appliedDiscount;
  const deliveryFee = fulfillmentType === 'delivery' && subtotal > 0 ? 3.50 : 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.08;
  const total = taxableAmount + tax + deliveryFee;

  const categories: MenuCategory[] = [
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

  const filteredItems = activeCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((i) => i.category === activeCategory);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyDiscount(promoInput.trim());
    setPromoFeedback({ text: res.message, isError: !res.success });
    if (res.success) setPromoInput('');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const randomId = `BB-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderTicket({
      id: randomId,
      total,
      items: [...cartItems],
      time: timeSlot,
      type: fulfillmentType,
    });
    setOrderPlaced(true);
    onClearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppOrder = () => {
    const itemsList = cartItems
      .map((i) => `${i.quantity}x ${i.menuItem.name} ($${i.totalPrice.toFixed(2)})`)
      .join(', ');
    const text = encodeURIComponent(
      `Hello Brew & Bliss! I would like to place an order for ${fulfillmentType}:\n${
        itemsList || 'Quick Coffee Order'
      }\nTotal: $${total.toFixed(2)}\nName: ${customerName || 'Guest'}`
    );
    window.open(`https://wa.me/15035550198?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-[#120E0B] text-[#EDE7DE] pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#241D17] border border-[#C9A87C]/30 text-[#C9A87C] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Fast Café Ordering</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#FAF6F0] tracking-tight">
            Order Online for Pickup or Delivery
          </h1>
          <p className="text-xs sm:text-sm text-[#BFB2A3] font-light mt-2">
            Freshly pulled, baked at dawn, and packaged carefully for you.
          </p>
        </div>

        {/* ORDER CONFIRMATION VIEW */}
        {orderPlaced && orderTicket ? (
          <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#1A1512] border border-[#C9A87C]/40 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#C9A87C] font-semibold">
                Order Confirmed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF6F0] mt-1">
                Your Brew is Being Handcrafted!
              </h2>
              <p className="text-sm text-[#BFB2A3] mt-2 font-light">
                Ticket <span className="font-mono text-[#C9A87C] font-bold">{orderTicket.id}</span> sent to the barista bar.
              </p>
            </div>

            {/* Live Status Tracker */}
            <div className="p-4 rounded-2xl bg-[#221A15] border border-[#2D231C] text-left">
              <div className="flex justify-between items-center mb-2 text-xs">
                <span className="text-[#A89885]">Preparation Status</span>
                <span className="text-emerald-400 font-medium">Grinding Beans &amp; Heating Milk</span>
              </div>
              <div className="w-full bg-[#14100D] h-2 rounded-full overflow-hidden">
                <div className="bg-[#C9A87C] h-full w-2/5 animate-pulse" />
              </div>
              <div className="flex justify-between text-[11px] text-[#8C7D6D] mt-2">
                <span>Received</span>
                <span className="text-[#C9A87C]">Brewing</span>
                <span>Ready for {orderTicket.type === 'pickup' ? 'Pickup' : 'Dispatch'}</span>
              </div>
            </div>

            {/* Receipt Summary */}
            <div className="p-5 rounded-2xl bg-[#221A15] border border-[#C9A87C]/20 text-left space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-[#2D231C]">
                <span className="text-[#A89885]">Estimated Readiness</span>
                <span className="text-[#FAF6F0] font-medium">{orderTicket.time}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#2D231C]">
                <span className="text-[#A89885]">Fulfillment</span>
                <span className="text-[#FAF6F0] capitalize">{orderTicket.type} ({orderTicket.type === 'pickup' ? '742 Evergreen Row' : customerName})</span>
              </div>
              <div className="space-y-1 py-1">
                {orderTicket.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between text-[#D5C9BD]">
                    <span>{i.quantity}x {i.menuItem.name}</span>
                    <span className="font-mono">${i.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-2 border-t border-[#2D231C] text-sm font-semibold text-[#FAF6F0]">
                <span>Total Paid</span>
                <span className="font-mono text-[#C9A87C]">${orderTicket.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => setOrderPlaced(false)}
                className="flex-1 py-3.5 rounded-full bg-[#C9A87C] text-[#14100D] font-semibold text-xs uppercase tracking-wider hover:bg-[#D8B98F] transition-all cursor-pointer"
              >
                Place Another Order
              </button>
              <a
                href="tel:5035550198"
                className="px-6 py-3.5 rounded-full border border-[#C9A87C]/40 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#251E18] transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A87C]" />
                <span>Call Café Bar</span>
              </a>
            </div>
          </div>
        ) : (
          /* STANDARD ORDERING LAYOUT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT / CENTER: MENU SELECTION & FULFILLMENT TOGGLE */}
            <div className="lg:col-span-7 space-y-6">
              {/* Pickup / Delivery Segmented Control */}
              <div className="p-2 rounded-2xl bg-[#1A1512] border border-[#2B221B] grid grid-cols-2 gap-2 shadow-md">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    fulfillmentType === 'pickup'
                      ? 'bg-[#C9A87C] text-[#14100D] shadow-md'
                      : 'text-[#BFB2A3] hover:text-[#FAF6F0]'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>In-Store Pickup (Free)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    fulfillmentType === 'delivery'
                      ? 'bg-[#C9A87C] text-[#14100D] shadow-md'
                      : 'text-[#BFB2A3] hover:text-[#FAF6F0]'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Local Delivery ($3.50)</span>
                </button>
              </div>

              {/* Category Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                <button
                  onClick={() => setActiveCategory('All')}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === 'All'
                      ? 'bg-[#C9A87C] text-[#14100D] font-semibold'
                      : 'bg-[#1A1512] text-[#BFB2A3] border border-[#2B221B]'
                  }`}
                >
                  All Items
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === c
                        ? 'bg-[#C9A87C] text-[#14100D] font-semibold'
                        : 'bg-[#1A1512] text-[#BFB2A3] border border-[#2B221B]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Food and Drink Product Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#1A1512] border border-[#2B221B] hover:border-[#C9A87C]/40 transition-all flex flex-col justify-between"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        onClick={() => onOpenProductModal(item)}
                        className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          onClick={() => onOpenProductModal(item)}
                          className="font-serif text-lg text-[#FAF6F0] font-normal leading-tight truncate hover:text-[#C9A87C] cursor-pointer"
                        >
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#A89885] line-clamp-2 mt-1 font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#261E18]">
                      <span className="font-mono text-base font-bold text-[#FAF6F0] tabular-nums">
                        ${item.price.toFixed(2)}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onOpenProductModal(item)}
                          className="px-2.5 py-1 text-[11px] rounded-full border border-[#C9A87C]/30 text-[#BFB2A3] hover:text-[#FAF6F0] hover:border-[#C9A87C] transition-colors cursor-pointer"
                        >
                          Customize
                        </button>
                        <button
                          onClick={() => onAddToCartDirect(item)}
                          className="px-3 py-1 rounded-full bg-[#C9A87C] text-[#14100D] font-semibold text-[11px] uppercase tracking-wider hover:bg-[#D8B98F] transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3 stroke-[3]" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: CART SIDEBAR + CHECKOUT FORM */}
            <div className="lg:col-span-5 space-y-6">
              {/* Cart Summary Card */}
              <div className="p-6 rounded-3xl bg-[#1A1512] border border-[#C9A87C]/25 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#29221C]">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#C9A87C]" />
                    <h3 className="font-serif text-xl font-semibold text-[#FAF6F0]">
                      Your Cart ({cartItems.length})
                    </h3>
                  </div>
                  {cartItems.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-[11px] text-[#8C7D6D] hover:text-[#E57373] transition-colors cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Items List */}
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-xs text-[#8C7D6D] space-y-2">
                    <p>No items added yet.</p>
                    <p className="text-[11px] text-[#BFB2A3]">
                      Click "+ Add" on any coffee or breakfast item on the left.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {cartItems.map((ci) => (
                      <div
                        key={ci.cartItemId}
                        className="p-3 rounded-xl bg-[#221A15] border border-[#2C221B] flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#FAF6F0] truncate">{ci.menuItem.name}</p>
                          {ci.customization && (
                            <p className="text-[10px] text-[#A89885] truncate">
                              {ci.customization.size} · {ci.customization.milk}
                            </p>
                          )}
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center gap-1.5 bg-[#17130F] px-2 py-0.5 rounded-full border border-[#35281F]">
                          <button
                            onClick={() => onUpdateQuantity(ci.cartItemId, -1)}
                            className="text-[#A89885] hover:text-[#FAF6F0]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs w-3 text-center">{ci.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(ci.cartItemId, 1)}
                            className="text-[#A89885] hover:text-[#FAF6F0]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono font-semibold text-[#C9A87C] tabular-nums">
                          ${ci.totalPrice.toFixed(2)}
                        </span>

                        <button
                          onClick={() => onRemoveItem(ci.cartItemId)}
                          className="text-[#8C7D6D] hover:text-[#E57373]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Promo Code Input */}
                <form onSubmit={handleApplyCode} className="flex gap-2">
                  <div className="flex-1 flex items-center bg-[#14100D] rounded-full border border-[#2B221B] px-3 py-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#8C7D6D] mr-2" />
                    <input
                      type="text"
                      placeholder="Promo code (BLISS20)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      className="w-full bg-transparent text-xs text-[#FAF6F0] uppercase placeholder-[#6E6255] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-full bg-[#292019] text-[#C9A87C] hover:bg-[#C9A87C] hover:text-[#14100D] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {promoFeedback && (
                  <p className={`text-[11px] ${promoFeedback.isError ? 'text-[#E57373]' : 'text-emerald-400'}`}>
                    {promoFeedback.text}
                  </p>
                )}

                {/* Totals Breakdown */}
                <div className="space-y-1.5 pt-3 border-t border-[#29221C] text-xs">
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
                  {fulfillmentType === 'delivery' && (
                    <div className="flex justify-between text-[#A89885]">
                      <span>Delivery Fee</span>
                      <span className="font-mono text-[#FAF6F0] tabular-nums">${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#A89885]">
                    <span>Tax (8%)</span>
                    <span className="font-mono text-[#FAF6F0] tabular-nums">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#FAF6F0] pt-2 border-t border-[#29221C]">
                    <span>Total</span>
                    <span className="font-mono text-[#C9A87C] tabular-nums">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Form Card */}
              <form
                onSubmit={handleCheckoutSubmit}
                className="p-6 rounded-3xl bg-[#1A1512] border border-[#2B221B] space-y-4 shadow-xl"
              >
                <h3 className="font-serif text-xl font-semibold text-[#FAF6F0] pb-2 border-b border-[#29221C]">
                  Guest &amp; Delivery Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ethan Helese"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(503) 555-0198"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1">
                    Email for Receipt *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ethan@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                  />
                </div>

                {fulfillmentType === 'delivery' && (
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1">
                      Delivery Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Street address, Apt / Suite #, Portland, OR"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1">
                      Timing Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3 py-2 text-xs text-[#FAF6F0] focus:outline-none cursor-pointer"
                    >
                      <option value="ASAP (~15-20 min)">ASAP (~15-20 min)</option>
                      <option value="In 30-40 min">In 30-40 min</option>
                      <option value="In 1 hour">In 1 hour</option>
                      <option value="Scheduled later today">Scheduled later today</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1">
                      Payment Option
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3 py-2 text-xs text-[#FAF6F0] focus:outline-none cursor-pointer"
                    >
                      <option value="card">Credit Card / Apple Pay</option>
                      <option value="apple_pay">Pay on Pickup Counter</option>
                      <option value="cash">Cash on Delivery / Pickup</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A89885] mb-1">
                    Order Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ring apartment bell 4B, extra napkins"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full bg-[#120E0B] border border-[#2B221B] focus:border-[#C9A87C] rounded-xl px-3 py-2 text-xs text-[#FAF6F0] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={cartItems.length === 0}
                  className="w-full py-4 rounded-full bg-[#C9A87C] text-[#14100D] font-bold text-xs uppercase tracking-wider hover:bg-[#D8B98F] active:bg-[#B7956B] disabled:opacity-40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  <span>Place Order (${total.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Direct Alternative Channels: WhatsApp & Phone */}
              <div className="p-5 rounded-2xl bg-[#1A1512] border border-[#2B221B] space-y-3 text-xs">
                <span className="text-[11px] uppercase tracking-wider text-[#A89885] block font-semibold">
                  Prefer Direct Ordering?
                </span>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="flex-1 py-2.5 px-3 rounded-full bg-[#1E2E1F] hover:bg-[#253A26] border border-emerald-500/40 text-emerald-300 font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Order via WhatsApp</span>
                  </button>

                  <a
                    href="tel:5035550198"
                    className="flex-1 py-2.5 px-3 rounded-full bg-[#241D17] hover:bg-[#2D241C] border border-[#C9A87C]/30 text-[#FAF6F0] font-medium flex items-center justify-center gap-2 transition-colors text-center"
                  >
                    <Phone className="w-4 h-4 text-[#C9A87C]" />
                    <span>Call to Order</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
