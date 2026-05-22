/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { getStoredCart, getStoredProducts, addStoredOrder, clearCart } from '../lib/state';
import { MainLayout } from '../layouts/MainLayout';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [cart] = useState(() => getStoredCart());
  const products = getStoredProducts();

  // Form states
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('GCash');
  const [errorMessage, setErrorMessage] = useState('');

  const cartItems = useMemo(() => {
    return cart.map(item => {
      const product = products.find(p => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    }).filter((item): item is (any & { quantity: number }) => item !== null);
  }, [cart, products]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  }, [cartItems]);

  const shipping = 2500;
  const total = subtotal + shipping;

  const handleCompletePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim() || !city.trim() || !postalCode.trim()) {
      setErrorMessage('Please check all delivery details.');
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage('Your shopping cart is empty.');
      return;
    }

    // Create a real order
    const orderId = `ORD-${Math.floor(Math.random() * 9000) + 1000}`;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    const newOrder = {
      id: orderId,
      customerName: name,
      address: address,
      city: city,
      postalCode: postalCode,
      paymentMethod: paymentMethod,
      date: dateStr,
      status: 'Processing',
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      items: cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.images.primary
      }))
    };

    // Add order and clear cart
    addStoredOrder(newOrder);
    localStorage.setItem('atelier_oak_last_order_id', orderId);
    clearCart();

    // Redirect to success
    navigate('/order-success');
  };

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="px-8 max-w-7xl mx-auto py-24 text-center space-y-6">
          <span className="material-symbols-outlined text-6xl text-brand-outline-variant/30">shopping_bag_speed_dial</span>
          <h2 className="text-3xl font-serif">Checkout is empty</h2>
          <p className="text-brand-secondary">You do not have any artifacts in your curation. Please select elements first.</p>
          <button onClick={() => navigate('/inventory')} className="mt-4 px-10 py-4 bg-brand-primary text-white font-bold uppercase tracking-widest text-xs rounded-full hover:brightness-110">
            Browse Archive
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <div className="bg-brand-background min-h-screen antialiased">
      <header className="fixed top-0 w-full z-50 bg-brand-background/80 backdrop-blur-xl border-b border-brand-outline-variant/10">
        <div className="flex justify-between items-center px-6 md:px-12 h-20 w-full max-w-screen-2xl mx-auto">
          <div className="text-2xl font-serif font-bold tracking-tight text-brand-on-surface cursor-pointer" onClick={() => navigate('/')}>Atelier Oak</div>
          <a onClick={() => navigate('/cart')} className="flex items-center gap-2 text-brand-primary font-medium cursor-pointer">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="font-sans text-xs tracking-widest uppercase">Return to Cart</span>
          </a>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <form onSubmit={handleCompletePurchase} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-16">
            <section>
              <div className="mb-8">
                <h2 className="font-serif text-3xl italic text-brand-primary mb-2">Delivery Details</h2>
                <p className="text-brand-on-surface-variant">Where should your artifacts be sent?</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] tracking-widest uppercase text-brand-outline mb-2">Full Name</label>
                  <input 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full bg-brand-surface-low border-b-2 border-brand-outline-variant focus:border-brand-primary mt-1 focus:ring-0 px-4 py-3 text-brand-on-surface rounded-md focus:outline-none transition-all" 
                    placeholder="Julianne De Silva" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] tracking-widest uppercase text-brand-outline mb-2">Shipping Address</label>
                  <input 
                    required 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    className="w-full bg-brand-surface-low border-b-2 border-brand-outline-variant focus:border-brand-primary mt-1 focus:ring-0 px-4 py-3 text-brand-on-surface rounded-md focus:outline-none transition-all" 
                    placeholder="Unit 402, High Street South Corporate Plaza" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-brand-outline mb-2">City</label>
                  <input 
                    required 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    className="w-full bg-brand-surface-low border-b-2 border-brand-outline-variant focus:border-brand-primary mt-1 focus:ring-0 px-4 py-3 text-brand-on-surface rounded-md focus:outline-none transition-all" 
                    placeholder="Taguig City" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-brand-outline mb-2">Postal Code</label>
                  <input 
                    required 
                    value={postalCode} 
                    onChange={(e) => setPostalCode(e.target.value)} 
                    className="w-full bg-brand-surface-low border-b-2 border-brand-outline-variant focus:border-brand-primary mt-1 focus:ring-0 px-4 py-3 text-brand-on-surface rounded-md focus:outline-none transition-all" 
                    placeholder="1634" 
                  />
                </div>
              </div>
            </section>

            <section>
              <div className="mb-8">
                <h2 className="font-serif text-3xl italic text-brand-primary mb-2">Select Payment Method</h2>
                <p className="text-brand-on-surface-variant font-body">Choose your preferred curated gateway.</p>
              </div>
              <div className="space-y-4">
                {['GCash', 'Maya', 'Cash on Delivery'].map((method) => (
                  <label key={method} className="flex items-center justify-between p-6 bg-brand-surface-lowest rounded-xl border border-brand-outline-variant/10 hover:border-brand-primary/20 cursor-pointer shadow-sm group">
                    <div className="flex items-center gap-6">
                      <input 
                        name="payment" 
                        type="radio" 
                        value={method} 
                        checked={paymentMethod === method} 
                        onChange={() => setPaymentMethod(method)} 
                        className="w-5 h-5 text-brand-primary focus:ring-brand-primary border-brand-outline-variant cursor-pointer" 
                      />
                      <div>
                        <span className="font-bold text-lg">{method}</span>
                        <p className="text-[10px] uppercase opacity-40">Verified Secure</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-brand-primary">payments</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-brand-surface-low rounded-2xl p-10 space-y-10 shadow-sm border border-brand-outline-variant/10">
              <h3 className="font-serif text-2xl mb-8">Order Summary</h3>
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 no-scrollbar border-b border-brand-outline-variant/20 pb-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <div className="w-16 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-brand-background">
                      <img src={item.images.primary} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-serif text-lg text-brand-on-surface leading-tight">{item.name}</h4>
                      <p className="text-xs text-brand-on-surface-variant italic">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-brand-primary mt-1">₱{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 font-sans text-sm">
                <div className="flex justify-between text-brand-on-surface-variant uppercase tracking-widest text-[10px]">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-brand-on-surface-variant uppercase tracking-widest text-[10px]">
                  <span>Curated Delivery</span>
                  <span>₱{shipping.toLocaleString()}</span>
                </div>
                {errorMessage && (
                  <p className="text-brand-error text-xs font-semibold">{errorMessage}</p>
                )}
                <div className="pt-6 border-t border-brand-outline-variant/30 flex justify-between items-end">
                  <span className="font-serif text-xl">Total</span>
                  <div className="text-right">
                    <span className="text-[10px] text-brand-outline uppercase block mb-1">Final Amount</span>
                    <span className="text-3xl font-bold">₱{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-brand-primary to-brand-primary-container text-white py-6 rounded-lg font-bold text-lg tracking-widest uppercase hover:opacity-90 transition-all shadow-xl shadow-brand-primary/10 flex items-center justify-center gap-3 cursor-pointer"
              >
                Complete Purchase
                <span className="material-symbols-outlined">lock</span>
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};
