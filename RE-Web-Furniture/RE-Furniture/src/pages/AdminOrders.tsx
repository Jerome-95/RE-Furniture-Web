/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../components/Navigation';
import { getStoredOrders, saveStoredOrders } from '../lib/state';
import { cn } from '../lib/utils';

export const AdminOrders: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState(() => {
    const raw = getStoredOrders();
    return raw.map(o => ({
      id: o.id.startsWith('#') ? o.id : `#${o.id}`,
      name: o.customerName,
      date: o.date,
      value: `₱ ${o.total.toLocaleString()}`,
      status: o.status
    }));
  });

  const filteredOrders = useMemo(() => {
    return orders.filter(o => 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      o.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, orders]);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleUpdateStatus = (id: string) => {
    const statusCycle: Record<string, string> = {
      'Processing': 'Shipped',
      'Shipped': 'Delivered',
      'Delivered': 'In Transit',
      'In Transit': 'Processing'
    };
    
    const rawOrders = getStoredOrders();
    const updatedRaw = rawOrders.map(o => {
      const oIdWithHash = o.id.startsWith('#') ? o.id : `#${o.id}`;
      if (oIdWithHash === id) {
        return { ...o, status: statusCycle[o.status] || 'Processing' };
      }
      return o;
    });
    
    saveStoredOrders(updatedRaw);

    setOrders(updatedRaw.map(o => ({
      id: o.id.startsWith('#') ? o.id : `#${o.id}`,
      name: o.customerName,
      date: o.date,
      value: `₱ ${o.total.toLocaleString()}`,
      status: o.status
    })));
    setOpenMenuId(null);
  };

  const handlePrint = () => {
    window.print();
    setOpenMenuId(null);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/order-tracking?code=${id.replace('#', '')}`);
    setOpenMenuId(null);
  };

  React.useEffect(() => {
    const closeMenu = () => setOpenMenuId(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  return (
    <div className="flex bg-brand-background min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-serif italic text-brand-primary leading-tight mb-4">Order Manifest</h2>
            <p className="text-brand-on-surface-variant font-body text-lg leading-relaxed">
              Review and curate the latest acquisitions from our global patrons. Every transaction is a testament to intentional living.
            </p>
          </div>
          <div className="relative group">
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-brand-surface-low border-none border-b border-brand-outline-variant focus:ring-0 focus:border-brand-primary px-4 py-3 w-64 text-sm font-body transition-all" 
              placeholder="Trace order..." 
              type="text"
            />
            <span className="material-symbols-outlined absolute right-3 top-3 text-brand-outline text-xl">search</span>
          </div>
        </header>

        <div className="bg-brand-surface-lowest overflow-hidden shadow-sm border border-brand-outline-variant/10 rounded-xl">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-brand-surface-low">
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-brand-on-surface-variant border-b border-brand-outline-variant/10">Order ID</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-brand-on-surface-variant border-b border-brand-outline-variant/10">Customer Name</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-brand-on-surface-variant border-b border-brand-outline-variant/10">Date</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-brand-on-surface-variant border-b border-brand-outline-variant/10">Value</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-brand-on-surface-variant border-b border-brand-outline-variant/10">Status</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-brand-on-surface-variant border-b border-brand-outline-variant/10 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-outline-variant/5">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-brand-secondary italic">
                    No orders found matching your trace.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-brand-surface-low/30 transition-colors group">
                    <td className="px-8 py-8 font-sans text-sm text-brand-primary font-bold">{order.id}</td>
                    <td className="px-8 py-8 font-serif text-lg text-brand-on-surface">{order.name}</td>
                    <td className="px-8 py-8 font-sans text-sm text-brand-on-surface-variant">{order.date}</td>
                    <td className="px-8 py-8 font-serif text-lg text-brand-on-surface">{order.value}</td>
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-2">
                        <span className={cn("w-2 h-2 rounded-full", order.status === 'Processing' ? "bg-brand-primary animate-pulse" : "bg-brand-secondary")}></span>
                        <span className="text-xs font-bold uppercase tracking-widest">{order.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-8 text-right relative">
                      <button 
                        onClick={(e) => toggleMenu(e, order.id)}
                        className="material-symbols-outlined text-brand-on-surface-variant/40 hover:text-brand-primary p-2 rounded-full hover:bg-brand-surface-low transition-all"
                      >
                        more_vert
                      </button>

                      {openMenuId === order.id && (
                        <div className="absolute right-8 mt-2 w-48 bg-white border border-brand-outline-variant/10 rounded-lg shadow-2xl z-50 overflow-hidden text-left py-2">
                          <button 
                            onClick={() => handleViewDetails(order.id)}
                            className="w-full px-4 py-2 text-sm hover:bg-brand-surface-low flex items-center gap-3 text-brand-on-surface transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">visibility</span>
                            View Details
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(order.id)}
                            className="w-full px-4 py-2 text-sm hover:bg-brand-surface-low flex items-center gap-3 text-brand-on-surface transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">local_shipping</span>
                            Update Status
                          </button>
                          <button 
                            onClick={handlePrint}
                            className="w-full px-4 py-2 text-sm hover:bg-brand-surface-low flex items-center gap-3 text-brand-on-surface transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">receipt_long</span>
                            Print Invoice
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
