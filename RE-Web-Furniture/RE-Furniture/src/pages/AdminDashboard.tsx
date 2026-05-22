/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../components/Navigation';
import { getStoredProducts } from '../lib/state';
import { cn } from '../lib/utils';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Real products and cart state
  const products = useMemo(() => getStoredProducts(), []);

  // UI state
  const [activeCategory, setActiveCategory] = useState<'All' | 'Seating' | 'Tables' | 'Furniture'>('All');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Custom interactive notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Acquisition ORD-3024 cleared final inspection.", time: "2 hours ago", unread: true },
    { id: 2, text: "Low inventory warning: Monolith Sofa (5 left).", time: "4 hours ago", unread: true },
    { id: 3, text: "Bespoke showroom reservation for Julianne De Silva approved.", time: "1 day ago", unread: false },
    { id: 4, text: "Curator catalog update: American Walnut finishes edited.", time: "2 days ago", unread: false }
  ]);

  const unreadCount = useMemo(() => notifications.filter(n => n.unread).length, [notifications]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <div className="flex bg-brand-background min-h-screen text-brand-on-surface antialiased font-sans">
      {/* Left Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Right Luxury Header */}
        <header className="h-20 border-b border-brand-outline-variant/15 px-10 flex items-center justify-between sticky top-0 bg-brand-background/80 backdrop-blur-xl z-30">
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-secondary font-bold">Atelier Curator</span>
            <span className="text-brand-outline-variant/50">/</span>
            <span className="font-serif italic text-sm text-brand-primary">Shop Administration</span>
          </div>

          <div className="flex items-center gap-6">
            {/* Notifications Bell */}
            <div className="relative">
              <button 
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileDropdownOpen(false);
                }}
                className="relative p-2 text-brand-secondary hover:text-brand-primary transition-colors bg-transparent border-none cursor-pointer flex items-center justify-center rounded-full hover:bg-brand-surface-low/50"
                title="Notifications"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-80 bg-brand-surface-lowest border border-brand-outline-variant/20 rounded-xl shadow-editorial p-5 z-50 text-left"
                    >
                      <div className="flex justify-between items-center mb-4 pb-2 border-b border-brand-outline-variant/10">
                        <h4 className="font-serif italic text-sm text-brand-on-surface">Atelier Notices</h4>
                        {unreadCount > 0 && (
                          <button 
                            onClick={markAllRead}
                            className="text-[9px] uppercase tracking-wider text-brand-primary font-bold hover:underline bg-transparent border-none cursor-pointer"
                          >
                            Mark read
                          </button>
                        )}
                      </div>
                      <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
                        {notifications.map(n => (
                          <div key={n.id} className={cn("p-2 rounded text-xs transition-colors", n.unread ? "bg-brand-surface-low/80 font-medium" : "text-brand-on-surface-variant")}>
                            <p>{n.text}</p>
                            <span className="text-[9px] opacity-45 block mt-1">{n.time}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Avatar / Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-brand-surface-low/50 transition-colors bg-transparent border-none cursor-pointer"
                title="Profile Settings"
              >
                <div className="w-8 h-8 rounded-full bg-brand-primary text-white font-serif flex items-center justify-center text-xs font-bold ring-2 ring-brand-outline-variant/30">
                  AO
                </div>
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-56 bg-brand-surface-lowest border border-brand-outline-variant/20 rounded-xl shadow-editorial p-4 z-50 text-left"
                    >
                      <div className="pb-3 border-b border-brand-outline-variant/10 mb-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-brand-on-surface">Atelier Curator</p>
                        <p className="text-[10px] text-brand-outline font-mono">curator@atelieroak.com</p>
                      </div>
                      <div className="space-y-2">
                        <button 
                          onClick={() => { setProfileDropdownOpen(false); navigate('/admin/catalog'); }} 
                          className="w-full text-left py-2 px-1 hover:bg-brand-surface-low rounded text-xs transition-colors bg-transparent border-none cursor-pointer text-brand-on-surface-variant flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit_note</span>
                          Manage Catalog
                        </button>
                        <button 
                          onClick={() => { setProfileDropdownOpen(false); navigate('/admin/orders'); }} 
                          className="w-full text-left py-2 px-1 hover:bg-brand-surface-low rounded text-xs transition-colors bg-transparent border-none cursor-pointer text-brand-on-surface-variant flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                          Order Processing
                        </button>
                        <button 
                          onClick={() => {
                            localStorage.removeItem('atelier_oak_is_admin');
                            setProfileDropdownOpen(false);
                            navigate('/');
                          }}
                          className="w-full text-left mt-2 py-3.5 px-3 bg-brand-error/10 hover:bg-brand-error text-brand-error hover:text-white rounded-lg text-xs font-bold uppercase tracking-widest text-center transition-all bg-transparent cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">logout</span>
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Main Scrollable Section */}
        <main className="flex-1 p-10 overflow-y-auto space-y-12">
          
          {/* Welcome and dynamic statistics summary */}
          <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-brand-outline-variant/10">
            <div>
              <h1 className="text-4xl font-serif text-brand-on-surface font-bold tracking-tight">
                Atelier Oak <span className="italic text-brand-primary font-light">Curated Shop</span>
              </h1>
              <p className="text-brand-on-surface-variant text-sm mt-2 font-light">
                Premium oversight of limited furniture releases and handcrafted boutique collections.
              </p>
            </div>

            {/* Premium Flat Stat Widget */}
            <div className="flex gap-8 bg-brand-surface-lowest border border-brand-outline-variant/10 p-5 rounded-xl shadow-sm">
              <div className="text-left border-r border-brand-outline-variant/20 pr-8">
                <span className="text-[9px] uppercase tracking-wider text-brand-secondary">Showroom Products</span>
                <p className="text-2xl font-serif font-bold text-brand-primary mt-1">{products.length}</p>
              </div>
              <div className="text-left">
                <span className="text-[9px] uppercase tracking-wider text-brand-secondary">Bespoke Curation Value</span>
                <p className="text-2xl font-serif font-bold text-brand-on-surface mt-1">₱14.5M</p>
              </div>
            </div>
          </section>

          {/* Interactive Filters Panel */}
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 p-1 bg-brand-surface-low rounded-lg">
              {(['All', 'Seating', 'Tables', 'Furniture'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-6 py-2.5 rounded-md text-xs uppercase tracking-widest font-bold transition-all cursor-pointer border-none",
                    activeCategory === category 
                      ? "bg-brand-surface-lowest text-brand-primary shadow-sm" 
                      : "text-brand-secondary hover:text-brand-on-surface"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <span className="text-brand-outline text-xs uppercase tracking-widest font-mono">
              Displaying {filteredProducts.length} high-end artifacts
            </span>
          </section>

          {/* Grid of luxury furniture product cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const discountPrice = product.price; // Authentic pricing
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group bg-brand-surface-lowest rounded-2xl border border-brand-outline-variant/10 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-editorial hover:border-brand-primary/20 transition-all duration-500"
                  >
                    {/* Image Area */}
                    <div className="h-72 bg-brand-surface-low overflow-hidden relative">
                      <img 
                        src={product.images.primary} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Absolute product badges */}
                      <span className="absolute top-4 left-4 bg-brand-background/90 backdrop-blur-md px-3 py-1.5 text-[9px] uppercase tracking-widest font-mono font-bold text-brand-primary rounded-full">
                        {product.material}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-8 flex-grow flex flex-col justify-between gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <p className="text-[10px] text-brand-outline tracking-wider uppercase font-mono">{product.sku}</p>
                          <p className="text-[10px] text-brand-primary tracking-widest uppercase font-bold">{product.leadTime}</p>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-brand-on-surface leading-tight hover:text-brand-primary transition-colors cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                          {product.name}
                        </h3>
                        <p className="text-brand-on-surface-variant text-xs line-clamp-2 font-light leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-brand-outline-variant/10 flex items-end justify-between">
                        <div>
                          <span className="text-[9px] text-brand-outline uppercase block tracking-wider mb-0.5">Atelier Price</span>
                          <span className="text-2xl font-serif font-bold text-brand-primary">₱{product.price.toLocaleString()}</span>
                        </div>

                        {/* Interactive action controls */}
                        <div className="flex gap-2">
                          <button 
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="bg-brand-surface-low hover:bg-brand-primary hover:text-white text-xs font-bold uppercase tracking-widest p-3 rounded-lg transition-all cursor-pointer flex items-center justify-center border-none"
                            title="View Curation"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          <button 
                            onClick={() => {
                              navigate(`/admin/catalog?id=${product.id}`);
                            }}
                            className="bg-brand-surface-low hover:bg-brand-secondary hover:text-white text-xs font-bold uppercase tracking-widest p-3 rounded-lg transition-all cursor-pointer flex items-center justify-center border-none"
                            title="Modify Details"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit_note</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </section>

          {/* Luxury Brand Heritage Quote Panel */}
          <section className="bg-brand-surface-low/50 border border-brand-outline-variant/10 p-10 md:p-12 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4 max-w-2xl text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-primary font-bold">Atelier Principle</span>
              <p className="text-xl font-serif italic text-brand-on-surface leading-relaxed">
                "An object should not cry out for attention. It should be parsed slowly, revealing its excellence and proportions through quiet interaction."
              </p>
            </div>
            <button 
              onClick={() => navigate('/inventory')}
              className="bg-brand-on-surface hover:bg-brand-primary text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-lg shadow-md transition-all shrink-0 cursor-pointer"
            >
              Examine Live Vault
            </button>
          </section>

        </main>
      </div>
    </div>
  );
};
