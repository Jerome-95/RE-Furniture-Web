/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { MainLayout } from '../layouts/MainLayout';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Interior design" 
            className="w-full h-full object-cover scale-105 opacity-40"
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=2000"
          />
        </div>

        <main className="relative z-10 w-full max-w-5xl grid md:grid-cols-12 items-stretch overflow-hidden rounded-xl shadow-2xl bg-brand-background/60 backdrop-blur-md">
          {/* Brand Side */}
          <div className="hidden md:flex md:col-span-7 bg-brand-surface-low p-16 flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-brand-primary font-serif italic text-2xl tracking-tight">Atelier Oak</span>
              <div className="mt-24">
                <h1 className="text-6xl font-bold leading-tight tracking-tighter text-brand-on-surface font-serif">
                  Curating <br/>
                  <span className="italic font-normal">the Soul</span> <br/>
                  of the Home.
                </h1>
                <p className="mt-8 text-lg text-brand-secondary max-w-sm leading-relaxed">
                  Join our curated collection of masterfully crafted artifacts. Explore our latest showrooms or sign in to your personal account.
                </p>
                <div className="mt-12 flex gap-6">
                  <button 
                    onClick={() => navigate('/inventory')}
                    className="bg-brand-primary text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest hover:brightness-110 transition-all"
                  >
                    Shop Collection
                  </button>
                  <button 
                    onClick={() => navigate('/showrooms')}
                    className="border border-brand-primary text-brand-primary px-8 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-brand-primary/5 transition-all"
                  >
                    View Showrooms
                  </button>
                </div>
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-4 text-xs tracking-widest uppercase text-brand-secondary/60">
              <span>EST. 2024</span>
              <span className="w-8 h-px bg-brand-outline-variant"></span>
              <span>Craftsmanship First</span>
            </div>
          </div>

          {/* Login Form Side */}
          <div className="col-span-12 md:col-span-5 p-10 md:p-16 flex flex-col justify-center glass-panel">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-2xl font-serif font-bold text-brand-on-surface mb-2">Curator Access</h2>
              <p className="text-brand-secondary text-sm">Access your private collection and bespoke orders.</p>
            </div>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/inventory'); }}>
              <div className="space-y-1">
                <label className="block text-xs font-semibold tracking-wider uppercase text-brand-on-surface-variant">Email Address</label>
                <input 
                  className="w-full bg-brand-background/40 border-b-2 border-brand-outline-variant/30 focus:border-brand-primary focus:ring-0 transition-all px-0 py-3 text-brand-on-surface placeholder:text-brand-secondary/40"
                  placeholder="curator@atelieroak.com"
                  type="email"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold tracking-wider uppercase text-brand-on-surface-variant">Password</label>
                </div>
                <input 
                  className="w-full bg-brand-background/40 border-b-2 border-brand-outline-variant/30 focus:border-brand-primary focus:ring-0 transition-all px-0 py-3 text-brand-on-surface placeholder:text-brand-secondary/40"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              <button className="w-full py-4 bg-brand-on-surface text-white font-semibold rounded shadow-lg hover:brightness-110 active:scale-95 transition-all">
                Sign In
              </button>
              <div className="mt-4 text-center">
                <a 
                  onClick={() => navigate('/admin-login')}
                  className="text-[10px] uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors cursor-pointer hover:underline"
                >
                  System Administration
                </a>
              </div>
            </form>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};
