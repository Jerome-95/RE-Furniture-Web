/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MainLayout } from '../layouts/MainLayout';
import { getStoredCart, getStoredProducts, updateCartQuantity, removeFromCart } from '../lib/state';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => getStoredCart());
  const products = getStoredProducts();

  const cartItems = useMemo(() => {
    return cart.map(item => {
      const product = products.find(p => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    }).filter((item): item is (any & { quantity: number }) => item !== null);
  }, [cart, products]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  }, [cartItems]);

  const handleUpdateQuantity = (id: string, delta: number) => {
    updateCartQuantity(id, delta);
    setCart(getStoredCart());
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setCart(getStoredCart());
  };

  return (
    <MainLayout>
      <div className="px-8 max-w-screen-2xl mx-auto py-12">
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-brand-on-surface">Your Artifacts</h1>
          <p className="text-brand-secondary text-lg mt-4">Review your selected pieces before curation.</p>
        </header>

        {cartItems.length === 0 ? (
          <div className="py-24 text-center max-w-xl mx-auto space-y-6">
            <span className="material-symbols-outlined text-6xl text-brand-outline-variant/30">shopping_bag</span>
            <h2 className="text-3xl font-serif">Your cart holds no artifacts.</h2>
            <p className="text-brand-secondary">Explore our curated collection to choose masterfully crafted pieces for your home.</p>
            <button 
              onClick={() => navigate('/inventory')}
              className="mt-4 px-10 py-4 bg-brand-primary text-white font-bold uppercase tracking-widest text-xs rounded-full hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-brand-primary/10"
            >
              Browse Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-8">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col md:flex-row gap-8 p-6 bg-brand-surface-lowest rounded-xl border border-brand-outline-variant/10 shadow-sm group"
                  >
                    <div className="w-full md:w-48 aspect-[4/5] bg-brand-surface-low rounded-lg overflow-hidden shrink-0">
                      <img src={item.images.primary} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-2">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <h2 className="text-2xl font-serif font-bold text-brand-on-surface hover:text-brand-primary cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h2>
                          <button 
                            onClick={() => handleRemove(item.id)}
                            className="text-brand-outline hover:text-brand-error transition-colors bg-transparent border-none cursor-pointer"
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                        <p className="text-brand-on-surface-variant font-light leading-relaxed max-w-md">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-secondary">SKU: {item.sku}</span>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-secondary">Material: {item.material}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-end mt-8 font-serif">
                        <div className="flex items-center border border-brand-outline-variant/30 rounded px-4 py-2 gap-4">
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="text-brand-secondary hover:text-brand-primary font-bold text-lg bg-transparent border-none cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold w-4 text-center font-sans">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="text-brand-secondary hover:text-brand-primary font-bold text-lg bg-transparent border-none cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-2xl font-serif font-bold text-brand-primary">₱{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <aside className="lg:col-span-4 h-fit sticky top-32">
              <div className="bg-brand-surface-low p-8 rounded-xl space-y-8 shadow-sm border border-brand-outline-variant/10">
                <h3 className="text-2xl font-serif italic text-brand-on-surface">Order Summary</h3>
                <div className="space-y-4 pt-4 border-t border-brand-outline-variant/10">
                  <div className="flex justify-between text-brand-on-surface-variant font-medium uppercase tracking-widest text-xs">
                    <span>Subtotal</span>
                    <span>₱{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-brand-on-surface-variant font-medium uppercase tracking-widest text-xs">
                    <span>Estimated Shipping</span>
                    <span className="text-brand-secondary italic">Calculated at checkout</span>
                  </div>
                </div>
                <div className="pt-6 border-t border-brand-on-surface/10">
                  <div className="flex justify-between items-end">
                    <span className="font-serif text-xl">Total</span>
                    <span className="text-3xl font-bold text-brand-on-surface">₱{subtotal.toLocaleString()}</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full py-5 bg-brand-on-surface text-white rounded font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all shadow-xl"
                >
                  Secure Checkout
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
