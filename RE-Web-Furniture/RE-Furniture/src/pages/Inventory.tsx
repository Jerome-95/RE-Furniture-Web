/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { getStoredProducts } from '../lib/state';
import { MainLayout } from '../layouts/MainLayout';
import { cn } from '../lib/utils';

export const Inventory: React.FC = () => {
  const navigate = useNavigate();
  const [products] = useState(() => getStoredProducts());
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const categories = ['All', 'Seating', 'Tables', 'Furniture'];

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, sortBy]);

  return (
    <MainLayout>
      <div className="px-8 max-w-screen-2xl mx-auto py-12">
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-brand-on-surface mb-6">Atelier Oak</h1>
              <p className="font-sans text-xl text-brand-secondary leading-relaxed">
                Hand-carved artifacts for the modern home. Our curations bridge the gap between heritage joinery and contemporary minimalism.
              </p>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all",
                  showFilters ? "bg-brand-primary text-white" : "bg-brand-secondary-container text-brand-on-secondary-container hover:bg-brand-outline-variant/20"
                )}
              >
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Filter
              </button>
              
              <AnimatePresence>
                {showFilters && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-64 bg-brand-surface-lowest border border-brand-outline-variant/10 rounded-xl shadow-xl z-30 p-6 space-y-6"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brand-secondary block mb-4">Sort By</span>
                      <div className="space-y-2">
                        {[
                          { id: 'default', label: 'Default Curation' },
                          { id: 'price-asc', label: 'Price: Low to High' },
                          { id: 'price-desc', label: 'Price: High to Low' },
                        ].map(opt => (
                          <button 
                            key={opt.id}
                            onClick={() => {
                              setSortBy(opt.id as any);
                              setShowFilters(false);
                            }}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded text-sm transition-colors",
                              sortBy === opt.id ? "bg-brand-primary/10 text-brand-primary font-bold" : "hover:bg-brand-surface-low"
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex gap-4 mt-12 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300",
                  activeCategory === cat 
                    ? "bg-brand-on-surface text-white shadow-lg" 
                    : "bg-brand-secondary-container/50 text-brand-on-secondary-container hover:bg-brand-outline-variant/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-12 py-32 text-center">
              <span className="material-symbols-outlined text-6xl text-brand-outline-variant/30 mb-4">inventory_2</span>
              <p className="text-brand-secondary font-serif italic text-xl">No artifacts found in this collection.</p>
            </div>
          ) : (
            filteredProducts.map((product, index) => {
              const isLarge = index === 0 && activeCategory === 'All';
              
              if (isLarge) {
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={product.id}
                    whileHover={{ y: -5 }}
                    className="col-span-12 lg:col-span-8 bg-brand-surface-low rounded-xl overflow-hidden group cursor-pointer shadow-sm"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img 
                        src={product.images.primary} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-6 left-6 bg-brand-surface-lowest/90 backdrop-blur px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">Featured Arrival</div>
                    </div>
                    <div className="p-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                      <div>
                        <h2 className="font-serif text-3xl mb-3">{product.name}</h2>
                        <p className="font-sans text-brand-secondary max-w-md line-clamp-2">{product.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="block font-sans text-brand-secondary text-xs uppercase tracking-widest mb-1">Curation Price</span>
                        <span className="font-serif text-2xl font-bold">₱{product.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={product.id}
                  whileHover={{ y: -5 }}
                  className="col-span-12 md:col-span-6 lg:col-span-4 bg-brand-surface-lowest rounded-xl p-6 flex flex-col group cursor-pointer shadow-sm hover:shadow-editorial transition-all"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="aspect-square overflow-hidden mb-8 rounded-lg bg-brand-surface-low">
                    <img 
                      src={product.images.primary} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-xl group-hover:text-brand-primary transition-colors">{product.name}</h3>
                      <span className="font-sans font-bold text-brand-on-surface">₱{product.price.toLocaleString()}</span>
                    </div>
                    <p className="font-sans text-sm text-brand-secondary leading-relaxed line-clamp-2">{product.description}</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-brand-outline-variant/10 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">View Artifact</span>
                    <span className="material-symbols-outlined text-brand-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">arrow_forward</span>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </MainLayout>
  );
};

