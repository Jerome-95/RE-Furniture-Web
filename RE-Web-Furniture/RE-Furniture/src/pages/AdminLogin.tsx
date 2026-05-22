/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-brand-surface-low relative overflow-hidden font-sans">
      {/* Editorial Decorative Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/20 via-transparent to-transparent"></div>
        <div className="grid grid-cols-12 h-full w-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-brand-outline-variant/20 h-full"></div>
          ))}
        </div>
      </div>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-brand-surface-lowest p-12 rounded-2xl shadow-2xl border border-brand-outline-variant/10">
          <div className="mb-12 text-center">
            <span className="text-brand-primary font-serif italic text-2xl tracking-tight block mb-2">Atelier Oak</span>
            <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-brand-on-surface-variant opacity-60">Staff Access Portal</h1>
          </div>

          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); localStorage.setItem('atelier_oak_is_admin', 'true'); navigate('/admin'); }}>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-brand-on-surface-variant/70">Staff Identifier</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-brand-on-surface-variant/40 text-lg">person</span>
                <input 
                  required
                  className="w-full bg-transparent border-b border-brand-outline-variant/30 focus:border-brand-primary focus:ring-0 transition-all pl-8 py-3 text-brand-on-surface placeholder:text-brand-secondary/30 text-sm"
                  placeholder="curator.name@atelieroak.com"
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-brand-on-surface-variant/70">Security Token</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-brand-on-surface-variant/40 text-lg">lock</span>
                <input 
                  required
                  className="w-full bg-transparent border-b border-brand-outline-variant/30 focus:border-brand-primary focus:ring-0 transition-all pl-8 py-3 text-brand-on-surface placeholder:text-brand-secondary/30 text-sm"
                  placeholder="••••••••••••"
                  type="password"
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full py-4 bg-brand-on-surface text-white font-bold rounded overflow-hidden relative group transition-all duration-500 hover:shadow-xl hover:shadow-brand-primary/10"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 uppercase text-xs tracking-[0.2em]">
                  Authenticate
                  <motion.span 
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="material-symbols-outlined text-sm"
                  >
                    arrow_forward
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-brand-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
              </button>
            </div>
          </form>

          <button 
            onClick={() => navigate('/')}
            className="mt-12 w-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            Back to Public Atelier
          </button>
        </div>

        <div className="mt-8 text-center px-8">
          <p className="text-[10px] text-brand-secondary/40 leading-relaxed uppercase tracking-widest">
            Authorized Personnel Only. All activities within this portal are logged and monitored under the Curator Governance Protocol.
          </p>
        </div>
      </motion.main>
    </div>
  );
};
