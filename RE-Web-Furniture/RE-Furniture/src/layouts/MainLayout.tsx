/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TopNavBar } from '../components/Navigation';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <TopNavBar />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="pt-20"
      >
        {children}
      </motion.main>
      <footer className="bg-brand-surface-low border-t border-brand-outline-variant/10 py-16 px-12 mt-20">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <span className="font-serif italic text-xl text-brand-on-surface">The Tactile Editorial</span>
            <p className="text-brand-primary text-xs uppercase tracking-widest opacity-70">
              Curation of enduring artifacts for the modern home.
            </p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-xs uppercase tracking-widest text-brand-secondary hover:text-brand-primary">Sustainability</a>
            <a href="#" className="text-xs uppercase tracking-widest text-brand-secondary hover:text-brand-primary">Shipping</a>
            <a href="#" className="text-xs uppercase tracking-widest text-brand-secondary hover:text-brand-primary">Returns</a>
          </div>
          <div className="md:text-right text-xs uppercase tracking-widest text-brand-secondary opacity-60">
            © 2024 Atelier Oak. All prices in ₱.
          </div>
        </div>
      </footer>
    </div>
  );
};
