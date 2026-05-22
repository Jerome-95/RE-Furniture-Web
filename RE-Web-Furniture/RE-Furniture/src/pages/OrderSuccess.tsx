/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MainLayout } from '../layouts/MainLayout';
import { getStoredOrders } from '../lib/state';

export const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  // Retrieve last placed order from storage
  const lastOrderId = localStorage.getItem('atelier_oak_last_order_id') || 'ORD-3024';
  const orders = getStoredOrders();
  const order = orders.find(o => o.id === lastOrderId);

  // Generate a friendly dynamic delivery arrival window
  const getArrivalWindow = () => {
    if (order && order.items && order.items.length > 0) {
      // Return a calculated window based on current date
      const date = new Date();
      const format = (d: Date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[d.getMonth()]} ${d.getDate()}`;
      };
      const start = new Date(date);
      start.setDate(date.getDate() + 5);
      const end = new Date(date);
      end.setDate(date.getDate() + 10);
      return `${format(start)} - ${format(end)}`;
    }
    return 'Oct 24 - 28';
  };

  return (
    <MainLayout>
      <div className="px-8 max-w-7xl mx-auto py-24 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto text-brand-primary">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif tracking-tighter leading-tight text-brand-on-surface">
              Thank you for your <br/><span className="italic text-brand-primary">curation.</span>
            </h1>
            <p className="text-brand-on-surface-variant text-xl leading-relaxed font-light">
              Your piece is being prepared by our master craftsmen. You will receive an update as soon as it clears inspection.
            </p>
          </div>

          <div className="bg-brand-surface-low p-10 rounded-xl space-y-8 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-brand-outline-variant/20 pb-8">
              <div className="text-center md:text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-secondary opacity-60">Order Number</span>
                <p className="font-serif text-2xl mt-1">#{lastOrderId}</p>
              </div>
              <div className="text-center md:text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-secondary opacity-60">Arrival Window</span>
                <p className="font-serif text-2xl mt-1">{getArrivalWindow()}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate(`/order-tracking?code=${lastOrderId}`)}
                className="flex-grow bg-brand-on-surface text-white py-4 rounded font-bold uppercase text-xs tracking-widest hover:opacity-90 cursor-pointer"
              >
                Track Delivery
              </button>
              <button 
                onClick={() => alert(`Receipt downloaded for order #${lastOrderId}`)} 
                className="flex-grow border border-brand-outline-variant/30 text-brand-primary py-4 rounded font-bold uppercase text-xs tracking-widest hover:bg-brand-surface-low cursor-pointer"
              >
                Download Receipt
              </button>
            </div>
          </div>
          
          <div className="pt-12">
            <a onClick={() => navigate('/inventory')} className="text-brand-primary font-bold uppercase text-xs tracking-widest underline underline-offset-8 cursor-pointer">
              Return to Atelier Shop
            </a>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};
