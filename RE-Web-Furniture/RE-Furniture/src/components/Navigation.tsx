/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

interface NavigationProps {
  isAdmin?: boolean;
}

export const TopNavBar: React.FC<NavigationProps> = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const isUserAdmin = React.useMemo(() => typeof window !== 'undefined' && localStorage.getItem('atelier_oak_is_admin') === 'true', []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-brand-background/80 backdrop-blur-xl border-b border-brand-outline-variant/10">
        <div className="flex justify-between items-center px-8 h-20 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-12">
            <button 
              onClick={() => navigate('/inventory')} 
              className="font-serif italic text-2xl text-brand-on-surface hover:text-brand-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Atelier Oak
            </button>
            {!isAdmin && (
              <div className="hidden md:flex items-center gap-8 font-serif text-lg tracking-tight">
                <button 
                  onClick={() => navigate('/inventory')} 
                  className="text-brand-on-surface/60 hover:text-brand-primary transition-colors bg-transparent border-none cursor-pointer"
                >
                  Shop
                </button>
                <button 
                  onClick={() => navigate('/orders')} 
                  className="text-brand-on-surface/60 hover:text-brand-primary transition-colors bg-transparent border-none cursor-pointer"
                >
                  Orders
                </button>
                <button 
                  onClick={() => navigate('/showrooms')}
                  className="text-brand-on-surface/60 hover:text-brand-primary transition-colors bg-transparent border-none cursor-pointer"
                >
                  Showrooms
                </button>
                {isUserAdmin && (
                  <button 
                    onClick={() => navigate('/admin')}
                    className="ml-4 px-4 py-2 border border-brand-primary/25 rounded-md text-xs font-sans font-bold uppercase tracking-wider text-brand-primary hover:bg-brand-primary hover:text-white transition-all cursor-pointer bg-transparent flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">dashboard</span>
                    Admin Dashboard
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-brand-primary">
              <button 
                onClick={() => navigate('/cart')} 
                className="material-symbols-outlined cursor-pointer hover:scale-110 transition-transform bg-transparent border-none"
              >
                shopping_bag
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="material-symbols-outlined cursor-pointer bg-transparent border-none hover:text-brand-primary transition-colors"
                aria-label="Toggle menu"
              >
                menu
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-background/95 backdrop-blur-2xl z-50 shadow-2xl p-8 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-12 border-b border-brand-outline-variant/10 pb-6">
                  <span className="font-serif italic text-2xl text-brand-on-surface">Atelier Oak</span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="material-symbols-outlined cursor-pointer hover:text-brand-primary transition-colors bg-transparent border-none"
                    aria-label="Close menu"
                  >
                    close
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-8 font-serif text-2xl">
                  <button 
                    onClick={() => { navigate('/inventory'); setIsMobileMenuOpen(false); }} 
                    className="text-left text-brand-on-surface hover:text-brand-primary transition-colors bg-transparent border-none cursor-pointer"
                  >
                    Collection
                  </button>
                  <button 
                    onClick={() => { navigate('/orders'); setIsMobileMenuOpen(false); }} 
                    className="text-left text-brand-on-surface hover:text-brand-primary transition-colors bg-transparent border-none cursor-pointer"
                  >
                    Acquisitions
                  </button>
                  <button 
                    onClick={() => { navigate('/order-tracking'); setIsMobileMenuOpen(false); }} 
                    className="text-left text-brand-on-surface hover:text-brand-primary transition-colors bg-transparent border-none cursor-pointer"
                  >
                    Trace Portal
                  </button>
                  <button 
                    onClick={() => { navigate('/showrooms'); setIsMobileMenuOpen(false); }} 
                    className="text-left text-brand-on-surface hover:text-brand-primary transition-colors bg-transparent border-none cursor-pointer"
                  >
                    Ateliers
                  </button>
                  {isUserAdmin && (
                    <button 
                      onClick={() => { navigate('/admin'); setIsMobileMenuOpen(false); }} 
                      className="text-left text-brand-primary hover:text-text-brand-primary transition-colors bg-transparent border-none cursor-pointer flex items-center gap-2 font-sans text-lg uppercase tracking-wider font-bold pt-4 border-t border-brand-outline-variant/10"
                    >
                      <span className="material-symbols-outlined">dashboard</span>
                      Admin Dashboard
                    </button>
                  )}
                </div>
              </div>

              {/* Drawer Footer with Log out */}
              <div className="border-t border-brand-outline-variant/15 pt-8">
                <button 
                  onClick={() => { 
                    localStorage.removeItem('atelier_oak_is_admin');
                    navigate('/'); 
                    setIsMobileMenuOpen(false); 
                  }} 
                  className="w-full py-4 text-center text-brand-primary hover:text-white hover:bg-brand-primary border border-brand-primary/20 hover:border-transparent font-sans text-xs uppercase tracking-[0.25em] rounded-md transition-all cursor-pointer font-bold"
                >
                  Log out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

interface AdminSidebarProps {
  onAddClick?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onAddClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="bg-brand-surface-low h-screen w-72 border-r border-brand-outline-variant/15 flex flex-col pt-8 pb-12 shrink-0">
      <div className="px-10 mb-10">
        <h1 className="text-xl font-serif text-brand-on-surface tracking-tight">Atelier Admin</h1>
        <p className="font-sans text-[10px] tracking-widest uppercase text-brand-on-surface/50 mt-1">Curator Access</p>
      </div>
      <nav className="flex-1 space-y-1">
        {[
          { icon: 'storefront', label: 'Shop', path: '/admin' },
          { icon: 'receipt_long', label: 'Orders', path: '/admin/orders' },
          { icon: 'chair', label: 'Showrooms', path: '/showrooms' },
          { icon: 'inventory_2', label: 'Inventory', path: '/admin/catalog' },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex items-center w-full px-10 py-4 transition-all text-left bg-transparent border-none cursor-pointer",
              isActive(item.path) 
                ? "bg-brand-surface-lowest text-brand-primary rounded-l-full ml-4 pl-6" 
                : "text-brand-on-surface/50 hover:bg-brand-surface-lowest/50"
            )}
          >
            <span className="material-symbols-outlined mr-4" style={{ fontVariationSettings: isActive(item.path) ? "'FILL' 1" : undefined }}>
              {item.icon}
            </span>
            <span className="font-sans text-sm font-medium tracking-wide uppercase">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="px-10 pt-6 mt-auto space-y-4">
        <button 
          onClick={() => {
            if (onAddClick) onAddClick();
            else navigate('/admin/catalog?action=new');
          }}
          className="w-full bg-gradient-to-r from-brand-primary to-brand-primary-container text-white py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm uppercase text-xs font-bold tracking-widest active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Artifact
        </button>
      </div>
    </aside>
  );
};
