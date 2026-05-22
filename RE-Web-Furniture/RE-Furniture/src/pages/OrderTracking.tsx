/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { getStoredOrders } from '../lib/state';

export const OrderTracking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderCode = searchParams.get('code');
  const [inputCode, setInputCode] = useState('');

  const orders = getStoredOrders();
  // Match with or without "#"
  const orderObj = orders.find(
    o => o.id.replace('#', '').toLowerCase() === orderCode?.replace('#', '').toLowerCase()
  );

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      navigate(`/order-tracking?code=${inputCode.trim().replace('#', '')}`);
    }
  };

  if (!orderCode || !orderObj) {
    return (
      <MainLayout>
        <div className="px-8 max-w-screen-2xl mx-auto py-24 min-h-[70vh] flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl"
          >
            <span className="text-brand-primary font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Trace Portal</span>
            <h1 className="text-5xl font-serif font-bold text-brand-on-surface mb-8">Follow your artifact.</h1>
            <p className="text-brand-secondary text-lg mb-8">
              {!orderObj && orderCode ? (
                <span className="text-brand-error block font-sans text-sm font-semibold mb-4">
                  Order "{orderCode}" could not be located in our atelier registers. Please check the code.
                </span>
              ) : null}
              Enter the unique identification code provided in your acquisition confirmation.
            </p>
            <form onSubmit={handleTrack} className="flex gap-4">
              <input 
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Order ID (e.g. ORD-3024)"
                className="flex-1 bg-brand-surface-low border-b-2 border-brand-outline-variant/30 px-6 py-4 font-serif text-lg focus:outline-none focus:border-brand-primary focus:ring-0 transition-all rounded-lg"
              />
              <button 
                type="submit"
                className="bg-brand-primary text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-brand-primary/10 cursor-pointer"
              >
                Track
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-brand-outline-variant/20 text-left">
              <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-secondary mb-4">Sample Registered Codes</h4>
              <div className="flex flex-wrap gap-3">
                {orders.slice(0, 3).map(o => (
                  <button
                    key={o.id}
                    onClick={() => navigate(`/order-tracking?code=${o.id}`)}
                    className="px-4 py-2 bg-brand-surface-low hover:bg-brand-surface-lowest hover:text-brand-primary text-xs font-mono font-bold rounded border border-brand-outline-variant/15 transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    #{o.id}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  // Calculate status checks
  // Statuses are "Processing" | "Shipped" | "Delivered" | "In Transit"
  const getStepStatus = (stepName: string) => {
    const status = orderObj.status;
    if (stepName === 'Order Confirmed') return true;
    if (stepName === 'Crafting') return status !== 'Processing';
    if (stepName === 'Quality Check') return status !== 'Processing';
    if (stepName === 'In Transit') return status === 'In Transit' || status === 'Shipped' || status === 'Delivered';
    if (stepName === 'Delivered') return status === 'Delivered';
    return false;
  };

  return (
    <MainLayout>
      <div className="px-8 max-w-screen-2xl mx-auto py-12">
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-brand-primary font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Tracking Information</span>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-on-surface tracking-tight mb-4">#{orderObj.id} Journey</h1>
              <p className="text-brand-secondary text-xl max-w-2xl leading-relaxed">
                Handcrafted from masterfully sourced elements, your custom piece has cleared final curation and is navigating the route to your home.
              </p>
            </div>
            <button 
              onClick={() => navigate('/order-tracking')}
              className="text-brand-primary border border-brand-primary/20 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-primary/5 transition-all cursor-pointer"
            >
              Track Another
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-brand-surface-lowest p-8 md:p-12 rounded-xl relative overflow-hidden shadow-sm border border-brand-outline-variant/10">
              <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8">
                {[
                  { label: 'Order Confirmed', date: 'Done', active: getStepStatus('Order Confirmed') },
                  { label: 'Crafting', date: 'Done', active: getStepStatus('Crafting') },
                  { label: 'Quality Check', date: 'Done', active: getStepStatus('Quality Check') },
                  { label: 'In Transit', date: 'In Progress', active: getStepStatus('In Transit'), icon: 'local_shipping' },
                  { label: 'Delivered', date: 'Est. Delivery', active: getStepStatus('Delivered'), icon: 'home' },
                ].map((step, i) => (
                  <div key={step.label} className="relative flex flex-col items-center flex-1 text-center group">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm z-20 mb-4 transition-all",
                      step.active ? "bg-brand-primary text-white" : "bg-brand-surface-low text-brand-outline-variant"
                    )}>
                      {step.icon ? <span className="material-symbols-outlined text-lg">{step.icon}</span> : <span className="material-symbols-outlined text-sm">check</span>}
                    </div>
                    <span className={cn("font-serif text-sm", step.active ? "text-brand-on-surface font-bold" : "text-brand-outline")}>{step.label}</span>
                    <span className="text-brand-secondary text-[10px] uppercase tracking-wider mt-1">
                      {step.active ? step.date : 'Pending'}
                    </span>
                    {i < 4 && <div className={cn("hidden md:block absolute h-[2px] w-full top-5 left-1/2 z-0", step.active ? "bg-brand-primary" : "bg-brand-outline-variant/30")}></div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-brand-surface-low rounded-xl overflow-hidden relative group">
                <img 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1524613032530-449a5d94c285?auto=format&fit=crop&q=80&w=1000" 
                  alt="Delivery map" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-background/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 bg-brand-surface-lowest px-4 py-2 rounded-lg shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
                    <span className="text-xs font-bold tracking-wide text-brand-on-surface uppercase">Live Position: Chelsea Hub</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8 flex flex-col justify-center">
                <div className="space-y-2">
                  <h3 className="text-brand-primary font-serif text-2xl italic">Current Status</h3>
                  <p className="text-4xl font-serif font-bold text-brand-on-surface">{orderObj.status}</p>
                  <p className="text-brand-secondary italic">Updated at: {orderObj.date}</p>
                </div>
                <div className="pt-8 border-t border-brand-outline-variant/20">
                  <h4 className="text-brand-on-surface font-bold text-xs uppercase tracking-widest mb-3">Delivery Address</h4>
                  <p className="text-brand-on-surface leading-relaxed text-lg font-light">
                    {orderObj.customerName}<br/>
                    {orderObj.address}<br/>
                    {orderObj.city}, {orderObj.postalCode}<br/>
                    Payment: {orderObj.paymentMethod}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-surface-low rounded-xl p-8 h-fit lg:sticky lg:top-32 shadow-sm border border-brand-outline-variant/10">
            <h3 className="font-serif text-2xl text-brand-on-surface mb-8 border-b border-brand-outline-variant/20 pb-4">Acquisitions In Order</h3>
            <div className="space-y-6">
              {orderObj.items.map((item, index) => (
                <div key={index} className="flex gap-4 cursor-pointer group" onClick={() => navigate(`/product/${item.productId}`)}>
                  <div className="w-20 h-24 bg-brand-surface-highest rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-serif text-brand-on-surface text-sm group-hover:text-brand-primary transition-colors">{item.name}</h4>
                      <p className="text-brand-secondary text-[10px] uppercase mt-1">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-brand-on-surface font-bold text-lg">₱{item.price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
