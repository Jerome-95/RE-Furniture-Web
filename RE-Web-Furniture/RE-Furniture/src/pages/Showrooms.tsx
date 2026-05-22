/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { getStoredProducts } from '../lib/state';

export const Showrooms: React.FC = () => {
  const navigate = useNavigate();
  // Find the "best" artifact (highest price for now)
  const products = getStoredProducts();
  const bestArtifact = [...products].sort((a, b) => b.price - a.price)[0] || products[0];

  return (
    <MainLayout>
      <div className="px-8 max-w-screen-2xl mx-auto py-24">
        <header className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-brand-primary font-bold text-xs tracking-[0.3em] uppercase mb-4 block">The Digital Atelier</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-on-surface tracking-tighter mb-8 leading-[0.9]">
              Virtual Showrooms.
            </h1>
            <p className="text-brand-secondary text-xl max-w-2xl mx-auto leading-relaxed italic">
              Experience the depth of our curation from anywhere in the world. Each space is a study in texture, light, and the enduring soul of oak.
            </p>
          </motion.div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-brand-primary font-bold text-xs tracking-widest uppercase">Spotlight Artifact</span>
              <h2 className="text-5xl font-serif text-brand-on-surface leading-tight">The Masterpiece:<br />{bestArtifact.name}</h2>
            </div>
            <p className="text-brand-secondary text-lg leading-relaxed">
              Our premier selection, chosen for its exceptional grain character and uncompromising design. 
              {bestArtifact.description}
            </p>
            <div className="flex flex-wrap gap-8 py-8 border-y border-brand-outline-variant/10">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-brand-secondary mb-1">Material</span>
                <span className="font-serif text-brand-on-surface">{bestArtifact.material}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-brand-secondary mb-1">Master Finish</span>
                <span className="font-serif text-brand-on-surface">{bestArtifact.finish}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-brand-secondary mb-1">Lead Time</span>
                <span className="font-serif text-brand-on-surface">{bestArtifact.leadTime}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate(`/product/${bestArtifact.id}`)}
              className="bg-brand-on-surface text-brand-background px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-brand-primary transition-all group flex items-center gap-4"
            >
              Acquire this Artifact
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-[4/5] bg-brand-surface-low rounded-2xl overflow-hidden shadow-2xl relative"
          >
            <img 
              src={bestArtifact.images.primary} 
              alt={bestArtifact.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"></div>
          </motion.div>
        </section>

        <section className="space-y-16">
          <div className="flex justify-between items-end">
            <h3 className="text-4xl font-serif text-brand-on-surface">Curated Environments</h3>
            <p className="text-brand-secondary italic">Explore more thematic spaces coming soon.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'The Minimalist Loft', 
                desc: 'Shadows and crisp lines in a concrete sanctuary.',
                img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800'
              },
              { 
                title: 'The Brutalist Study', 
                desc: 'Raw materials meet refined craftsmanship.',
                img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=800'
              },
              { 
                title: 'The Zen Atelier', 
                desc: 'A meditation on natural light and warm oak.',
                img: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&q=80&w=800'
              }
            ].map((room, i) => (
              <motion.div 
                key={room.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square bg-brand-surface-low rounded-xl overflow-hidden mb-6 relative">
                  <img src={room.img} alt={room.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-brand-on-surface/0 group-hover:bg-brand-on-surface/20 transition-colors"></div>
                </div>
                <h4 className="font-serif text-2xl text-brand-on-surface mb-2">{room.title}</h4>
                <p className="text-brand-secondary text-sm leading-relaxed">{room.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};
