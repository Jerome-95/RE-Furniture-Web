/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { getStoredProducts, addToCart } from '../lib/state';
import { MainLayout } from '../layouts/MainLayout';
import { cn } from '../lib/utils';

export const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = getStoredProducts();
  const product = products.find(p => p.id === id);

  if (!product) return (
    <MainLayout>
      <div className="px-8 max-w-7xl mx-auto py-24 text-center">
        <h2 className="text-3xl font-serif">Artifact not found</h2>
        <button onClick={() => navigate('/inventory')} className="mt-8 text-brand-primary underline uppercase tracking-wider text-xs font-bold">Return to shop</button>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <div className="px-8 max-w-screen-2xl mx-auto py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-12 text-sm text-brand-secondary font-medium tracking-wide">
          <a href="/inventory" className="hover:text-brand-primary">Archive</a>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-brand-on-surface">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[4/5] overflow-hidden rounded-lg bg-brand-surface-low"
            >
              <img src={product.images.primary} className="w-full h-full object-cover" alt={product.name} />
            </motion.div>
            
            <div className="grid grid-cols-2 gap-8">
              {product.images.gallery.map((img, i) => (
                <div key={i} className={cn("aspect-square rounded-lg overflow-hidden bg-brand-surface-low", i === 1 && "translate-y-12")}>
                  <img src={img} className="w-full h-full object-cover" alt={`${product.name} detail ${i}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-10">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-serif tracking-tight leading-tight text-brand-on-surface">{product.name}</h1>
              <p className="text-2xl font-serif text-brand-primary tracking-tight">₱ {product.price.toLocaleString()}</p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                {product.features.map(f => (
                  <span key={f} className="px-3 py-1 bg-brand-secondary-container text-brand-on-secondary-container rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {f}
                  </span>
                ))}
              </div>
              <p className="text-lg text-brand-on-surface-variant leading-relaxed font-light">
                {product.description} Masterfully synthesized mid-century restraint with modern excellence.
              </p>
            </div>

            {/* Attributes Bento */}
            <div className="grid grid-cols-2 gap-px bg-brand-outline-variant/20 rounded-xl overflow-hidden shadow-sm border border-brand-outline-variant/10">
              {[
                { label: 'Dimensions', value: product.dimensions },
                { label: 'Material', value: product.material },
                { label: 'Finish', value: product.finish },
                { label: 'Lead Time', value: product.leadTime },
              ].map((attr) => (
                <div key={attr.label} className="bg-brand-surface-lowest p-6 space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-secondary">{attr.label}</span>
                  <p className="text-brand-on-surface font-medium text-sm">{attr.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-8 pt-6">
              <button 
                onClick={() => {
                  addToCart(product.id, 1);
                  navigate('/cart');
                }}
                className="w-full h-14 bg-gradient-to-r from-brand-primary to-brand-primary-container text-white rounded-md font-bold text-sm uppercase tracking-widest shadow-lg hover:brightness-105 transition-all"
              >
                Add to Cart
              </button>
              
              <div className="flex justify-between py-6 border-t border-brand-outline-variant/30 text-[10px] font-bold text-brand-secondary uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">local_shipping</span>
                  <span>White Glove Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">workspace_premium</span>
                  <span>Lifetime Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
