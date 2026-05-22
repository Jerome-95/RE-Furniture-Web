/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MainLayout } from '../layouts/MainLayout';
import { getStoredOrders } from '../lib/state';
import { cn } from '../lib/utils';

export const CustomerOrders: React.FC = () => {
  const navigate = useNavigate();
  const [storedOrders] = useState(() => getStoredOrders());
  
  const orders = storedOrders.map(o => {
    const mainItem = o.items[0] || {
      name: 'Bespoke Oak Artifact',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000',
      price: o.total
    };
    return {
      id: o.id.startsWith('#') ? o.id : `#${o.id}`,
      rawId: o.id.replace('#', ''),
      date: o.date,
      status: o.status,
      item: o.items.length > 1 ? `${mainItem.name} + ${o.items.length - 1} more` : mainItem.name,
      price: `₱${o.total.toLocaleString()}`,
      img: mainItem.image
    };
  });

  return (
    <MainLayout>
      <div className="px-8 max-w-5xl mx-auto py-12">
        <header className="mb-16">
          <h1 className="text-5xl font-serif font-bold text-brand-on-surface">Order History</h1>
          <p className="text-brand-secondary text-lg mt-4">Trace the journey of your curated pieces.</p>
        </header>

        {orders.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-brand-surface-lowest rounded-xl border border-brand-outline-variant/10 shadow-sm p-8">
            <span className="material-symbols-outlined text-5xl text-brand-outline-variant/30">receipt_long</span>
            <p className="text-brand-secondary font-serif italic text-lg">You have no recorded acquisitions at present.</p>
            <button onClick={() => navigate('/inventory')} className="mt-4 px-8 py-3 bg-brand-primary text-white text-xs font-bold uppercase tracking-widest rounded-full">
              Explore Atelier
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-brand-surface-lowest rounded-xl border border-brand-outline-variant/10 shadow-sm overflow-hidden"
              >
                <div className="px-8 py-4 bg-brand-surface-low flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-brand-secondary opacity-60">Order Placed</p>
                      <p className="text-sm font-medium mt-1 uppercase tracking-tighter">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-brand-secondary opacity-60">Total</p>
                      <p className="text-sm font-bold mt-1 text-brand-primary">{order.price}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-brand-secondary opacity-60">Order Number</p>
                    <p className="text-sm font-medium mt-1">{order.id}</p>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-24 h-32 bg-brand-surface-low rounded overflow-hidden shrink-0">
                    <img referrerPolicy="no-referrer" src={order.img} alt={order.item} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow space-y-4">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-2 h-2 rounded-full", 
                        order.status === 'Processing' || order.status === 'In Transit' ? "bg-brand-primary animate-pulse" : "bg-brand-secondary"
                      )}></span>
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-on-surface">{order.status}</span>
                    </div>
                    <h3 className="text-2xl font-serif text-brand-on-surface">{order.item}</h3>
                  </div>
                  <div className="flex flex-col gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => navigate(`/order-tracking?code=${order.rawId}`)}
                      className="px-8 py-3 bg-brand-on-surface text-white rounded text-xs font-bold uppercase tracking-widest hover:opacity-90 cursor-pointer"
                    >
                      Track Progress
                    </button>
                    <button 
                      onClick={() => navigate(`/order-tracking?code=${order.rawId}`)} 
                      className="px-8 py-3 border border-brand-outline-variant/30 text-brand-on-surface rounded text-xs font-bold uppercase tracking-widest hover:bg-brand-surface-low cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};
