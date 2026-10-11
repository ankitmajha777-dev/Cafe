export type AppPage = 'home' | 'menu' | 'order' | 'about' | 'gallery' | 'offers' | 'contact';

export type MenuCategory =
  | 'Coffee'
  | 'Espresso'
  | 'Cold Coffee'
  | 'Tea'
  | 'Pastries'
  | 'Breakfast'
  | 'Sandwiches'
  | 'Desserts'
  | 'Drinks';

export interface CustomizationOption {
  name: string;
  priceDelta: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
  isSeasonal?: boolean;
  calories?: string;
  tags?: string[];
  customizable?: boolean;
}

export interface CartCustomization {
  size: string;
  sizePrice: number;
  milk?: string;
  milkPrice?: number;
  syrup?: string;
  syrupPrice?: number;
  extraShots: number;
  extraShotsPrice: number;
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  customization?: CartCustomization;
  unitPrice: number;
  totalPrice: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Café' | 'Coffee' | 'Food' | 'Desserts' | 'Events' | 'Drinks';
  image: string;
  description: string;
  likes: number;
  aspect?: 'square' | 'portrait' | 'landscape';
}

export interface OfferItem {
  id: string;
  title: string;
  tag: string;
  discount: string;
  description: string;
  code: string;
  validUntil: string;
  image: string;
  isFeatured?: boolean;
}

export interface RewardItem {
  id: string;
  title: string;
  pointsRequired: number;
  description: string;
  badge: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarText: string;
  rating: number;
  comment: string;
  favoriteItem: string;
}
