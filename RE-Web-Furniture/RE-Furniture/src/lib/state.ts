/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, PRODUCTS } from '../constants';

export interface CartItem {
  id: string; // Matches Product ID
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string; // e.g. "ORD-3024" (no '#' or with '#', we'll support both)
  customerName: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
  date: string;
  status: string; // "Processing" | "Shipped" | "Delivered" | "In Transit"
  total: number;
  shipping: number;
  subtotal: number;
  items: OrderItem[];
}

// Key definitions
const PRODUCTS_KEY = 'atelier_oak_products';
const CART_KEY = 'atelier_oak_cart_list';
const ORDERS_KEY = 'atelier_oak_orders_list';

// Helper to seed products if not present
export const getStoredProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  if (!data) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS));
    return PRODUCTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return PRODUCTS;
  }
};

export const saveStoredProducts = (products: Product[]): void => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  // Dispatch simple event for real-time reactivity
  window.dispatchEvent(new Event('products_updated'));
};

// Seeding standard list of orders that matches the pages
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-3024',
    customerName: 'Julianne De Silva',
    address: 'Unit 402, High Street South Corporate Plaza',
    city: 'Taguig City',
    postalCode: '1634',
    paymentMethod: 'GCash',
    date: 'Oct 24, 2024',
    status: 'In Transit',
    subtotal: 145000,
    shipping: 2500,
    total: 147500,
    items: [
      {
        productId: 'heritage-lounge',
        name: 'The Heritage Lounge',
        price: 145000,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4v6oAXuawdvLta9_ZdpDsKS8jR79Vu8hC3ORstncpVgZnffXwLmYan8ezkkSTEYZWVNFdnbiOl5PCV6C8eDwpxPKySvLW1QNkkPzziYuFf7Ct25bARmlXvpwSAgJJKE38eL5CSX9fU_CSJHC28HyK3hM7DZcoKn8xALHlviNF_GxD9rSv960BRQhvcWOJU47q3_y_Qb7Tt7MRVrrlui-dmr0IlloFSHsxiD54QguX4EOaO4yG1BEmxdbNEyN0Gbno3Jbj54gvTv8'
      }
    ]
  },
  {
    id: 'ORD-2911',
    customerName: 'Elaine Soriano',
    address: '12 Emerald St, Ortigas',
    city: 'Pasig City',
    postalCode: '1600',
    paymentMethod: 'Maya',
    date: 'Aug 12, 2024',
    status: 'Delivered',
    subtotal: 24900,
    shipping: 2500,
    total: 27400,
    items: [
      {
        productId: 'scandi-lounge',
        name: 'Scandi Lounge Chair',
        price: 24900,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe7iS99Hi-ksEuimlF6sJGLr--CFvToWOBu4nTr-vHGMQ4-LUxaY2Lkc3ouQ1zGEdb10-LsFfCwlDM4ocMCnAcfWfoKRBvaJQfntxnrCKwn2LZcgujiexaq4rjLRAgTlFcDP4dH25vHqiTiW1udMxDnPvTC2T_9VplRhErpwz1lzW5vTLUKcmy2KMKB6NEHyKgN0uE5RhUb1C_qZNGjotWlNlZ-KkwEolTrP2NVJ4eoAM7he24P5tIAyBKLbNmBEFFn3firrODUjo'
      }
    ]
  },
  {
    id: 'ORD-9021',
    customerName: 'Rafael de Vera',
    address: '74 Primrose Lane',
    city: 'Makati City',
    postalCode: '1200',
    paymentMethod: 'Maya',
    date: 'May 12, 2024',
    status: 'Processing',
    subtotal: 142500,
    shipping: 2500,
    total: 145000,
    items: [
      {
        productId: 'monolith-sofa',
        name: 'The Monolith Sofa',
        price: 142500,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeaxzYNv3_hvnw_FF5A7WQh-IRjA0fa82WMDjGThJzgI3JQLtCuCawySKEkJvmUAWVjAKdm2ZaUMFknJisZAkiN5wI7KHeS7HC6W3UBOFkBu9xi4YAkR8HOVfka6LzQNkHguk1u5PIzGSkMIbajfZwYpczJTJyc4YcbXyZMcoTysQWg1ZRoTz_Br16bO-xxiMjmppjUASmdHgjlfsFzj3fvxL30hb0SfYf3nkpx9rYoU4wPC24Yz5aOXn8ewcP_8V5U3Vwk0SMs6I'
      }
    ]
  },
  {
    id: 'ORD-8845',
    customerName: 'Elena Soriano',
    address: '12 Emerald St, Ortigas',
    city: 'Pasig City',
    postalCode: '1600',
    paymentMethod: 'Maya',
    date: 'May 10, 2024',
    status: 'Shipped',
    subtotal: 68000,
    shipping: 2500,
    total: 70500,
    items: [
      {
        productId: 'alpine-table',
        name: 'Alpine Dining Table',
        price: 68000,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdz72PH4ooUkQZZHXFj-CKVZ_aj22zeujF3IzQg-rQIP_ncq8X1Lp9kwTsDlJBnMBoJAbRTqAwgA8ck46shXsbrKBJL8_VMbeYV63Ru_M2TZE4COyg3XQvaZvKmsvEfoklIr79jNQNRhak_YyP7rjOtgkC8Jxb3yKKEUKN6Z90BZRMB1K0wGr38osmxlJV0eFdElR9Pp-22QnHMRWxC_l3Yd2FRswUDxBMur1mM5cmXBxe21Smjwrlf32w8m5Kjxduv5Rz_IyOp2M'
      }
    ]
  },
  {
    id: 'ORD-8712',
    customerName: 'Marcus Villaluz',
    address: '19 Mahogany Dr',
    city: 'Cebu City',
    postalCode: '6000',
    paymentMethod: 'Cash on Delivery',
    date: 'May 09, 2024',
    status: 'Delivered',
    subtotal: 145000,
    shipping: 2500,
    total: 147500,
    items: [
      {
        productId: 'heritage-lounge',
        name: 'The Heritage Lounge',
        price: 145000,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4v6oAXuawdvLta9_ZdpDsKS8jR79Vu8hC3ORstncpVgZnffXwLmYan8ezkkSTEYZWVNFdnbiOl5PCV6C8eDwpxPKySvLW1QNkkPzziYuFf7Ct25bARmlXvpwSAgJJKE38eL5CSX9fU_CSJHC28HyK3hM7DZcoKn8xALHlviNF_GxD9rSv960BRQhvcWOJU47q3_y_Qb7Tt7MRVrrlui-dmr0IlloFSHsxiD54QguX4EOaO4yG1BEmxdbNEyN0Gbno3Jbj54gvTv8'
      }
    ]
  }
];

export const getStoredOrders = (): Order[] => {
  const data = localStorage.getItem(ORDERS_KEY);
  if (!data) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_ORDERS;
  }
};

export const saveStoredOrders = (orders: Order[]): void => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  window.dispatchEvent(new Event('orders_updated'));
};

export const addStoredOrder = (order: Order): void => {
  const orders = getStoredOrders();
  saveStoredOrders([order, ...orders]);
};

// Cart mechanisms
export const getStoredCart = (): CartItem[] => {
  const data = localStorage.getItem(CART_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const saveStoredCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cart_updated'));
};

export const addToCart = (productId: string, quantity: number = 1): void => {
  const cart = getStoredCart();
  const index = cart.findIndex(item => item.id === productId);
  if (index > -1) {
    cart[index].quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }
  saveStoredCart(cart);
};

export const updateCartQuantity = (productId: string, delta: number): void => {
  const cart = getStoredCart();
  const index = cart.findIndex(item => item.id === productId);
  if (index > -1) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveStoredCart(cart);
  }
};

export const removeFromCart = (productId: string): void => {
  const cart = getStoredCart();
  const updated = cart.filter(item => item.id !== productId);
  saveStoredCart(updated);
};

export const clearCart = (): void => {
  saveStoredCart([]);
};
