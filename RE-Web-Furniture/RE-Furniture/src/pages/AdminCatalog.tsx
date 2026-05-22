/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AdminSidebar } from '../components/Navigation';
import { Product } from '../constants';
import { getStoredProducts, saveStoredProducts } from '../lib/state';
import { cn } from '../lib/utils';

interface ArtifactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product | null;
}

const ArtifactModal: React.FC<ArtifactModalProps> = ({ isOpen, onClose, onSave, product }) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      sku: '',
      category: 'Seating',
      price: 0,
      stock: 0,
      description: '',
      material: '',
      finish: '',
      dimensions: '',
      leadTime: '',
      features: [],
      images: { primary: '', gallery: [] }
    }
  );

  const [featuresText, setFeaturesText] = useState('');

  React.useEffect(() => {
    if (product) {
      setFormData(product);
      setFeaturesText(product.features.join('\n'));
    } else {
      setFormData({
        name: '',
        sku: '',
        category: 'Seating',
        price: 0,
        stock: 0,
        description: '',
        material: '',
        finish: '',
        dimensions: '',
        leadTime: '',
        features: [],
        images: { primary: '', gallery: [] }
      });
      setFeaturesText('');
    }
  }, [product]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalFeatures = featuresText.split('\n').map(f => f.trim()).filter(f => f.length > 0);
    onSave({
      ...formData,
      features: finalFeatures,
    } as Product);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-on-surface/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-brand-surface-lowest w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col"
      >
        <div className="p-8 border-b border-brand-outline-variant/10 flex justify-between items-center bg-brand-surface-low/50">
          <div>
            <h3 className="text-2xl font-serif italic text-brand-on-surface">{product ? 'Refine Artifact' : 'Catalog New Artifact'}</h3>
            <p className="text-xs text-brand-secondary font-sans uppercase tracking-widest mt-1">Curator Input Portal</p>
          </div>
          <button onClick={onClose} className="material-symbols-outlined hover:rotate-90 transition-transform">close</button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth no-scrollbar">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary opacity-60">Artifact Name</label>
              <input 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-brand-surface-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary"
                placeholder="e.g. The Monolith"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary opacity-60">Catalog SKU</label>
              <input 
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full bg-brand-surface-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary"
                placeholder="ART-CH-0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary opacity-60">Collection</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-brand-surface-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary"
              >
                {['Seating', 'Tables', 'Furniture', 'Lighting', 'Storage'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary opacity-60">Price (₱)</label>
              <input 
                required
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-brand-surface-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary opacity-60">Inventory Stock</label>
              <input 
                required
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full bg-brand-surface-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary opacity-60">Poetic Description</label>
            <textarea 
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-brand-surface-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary h-32 resize-none"
              placeholder="Describe the soul of this piece..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary opacity-60">Primary Material</label>
              <input 
                required
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                className="w-full bg-brand-surface-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary"
                placeholder="e.g. American Walnut"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary opacity-60">Master Finish</label>
              <input 
                required
                value={formData.finish}
                onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
                className="w-full bg-brand-surface-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary"
                placeholder="e.g. Natural Oil"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary opacity-60">Dimensions</label>
              <input 
                required
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                className="w-full bg-brand-surface-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary"
                placeholder="e.g. 85W × 92D × 80H cm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary opacity-60">Lead Time</label>
              <input 
                required
                value={formData.leadTime}
                onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                className="w-full bg-brand-surface-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary"
                placeholder="e.g. 8–12 Weeks"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary opacity-60">Key Features (One per line)</label>
            <textarea 
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              className="w-full bg-brand-surface-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary h-24 resize-none"
              placeholder="e.g. Handcrafted\nLimited Edition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary opacity-60">Image Archetype URL</label>
            <input 
              required
              value={formData.images?.primary}
              onChange={(e) => setFormData({ ...formData, images: { ...formData.images!, primary: e.target.value } })}
              className="w-full bg-brand-surface-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary"
              placeholder="https://..."
            />
          </div>

          <div className="pt-8 bg-brand-surface-low/30 -mx-8 -mb-8 px-8 py-8 flex gap-4 sticky bottom-0 backdrop-blur-md">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-brand-outline-variant/10 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-surface-low transition-colors rounded-lg bg-white"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] py-3 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all rounded-lg shadow-lg shadow-brand-primary/10"
            >
              Commit to Catalog
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export const AdminCatalog: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(() => getStoredProducts());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      handleAdd();
      // Clear the param after opening
      setSearchParams({}, { replace: true });
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, products]);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to archive this artifact? it will be removed from the active catalog.')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveStoredProducts(updated);
      setOpenMenuId(null);
    }
  };

  const handleSave = (product: Product) => {
    let updated: Product[];
    if (editingProduct) {
      updated = products.map(p => p.id === product.id ? product : p);
    } else {
      const newProduct = {
        ...product,
        id: product.id || `art-${Date.now()}`,
        features: product.features || [],
        images: {
          primary: product.images.primary || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000',
          gallery: product.images.gallery || []
        }
      };
      updated = [newProduct, ...products];
    }
    setProducts(updated);
    saveStoredProducts(updated);
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    const closeMenu = () => setOpenMenuId(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  return (
    <div className="flex bg-brand-background min-h-screen">
      <AdminSidebar onAddClick={handleAdd} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-24 px-12 flex items-center justify-between shrink-0 bg-brand-background">
          <div>
            <h2 className="text-3xl font-serif font-bold text-brand-on-surface tracking-tight">Catalog Management</h2>
            <p className="text-brand-on-surface-variant text-sm mt-1">Curate and organize the digital artifact gallery.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleAdd}
              className="flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-brand-primary/10"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              New Artifact
            </button>
            <div className="relative group ml-4">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60">search</span>
              <input 
                className="bg-brand-surface-low border-none rounded-full pl-12 pr-6 py-2.5 text-sm w-72 focus:ring-2 focus:ring-brand-primary"
                placeholder="Search artifacts..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="px-12 py-6 bg-brand-surface-low flex flex-wrap items-center justify-between gap-6 shrink-0">
          <div className="flex items-center gap-2">
            {['All', 'Seating', 'Tables', 'Furniture'].map((filter) => (
              <button 
                key={filter} 
                onClick={() => setActiveCategory(filter)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                  activeCategory === filter ? "bg-brand-secondary-container text-brand-on-secondary-container" : "bg-brand-surface-lowest text-brand-on-surface/60 hover:text-brand-on-surface"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-8 text-xs font-medium tracking-widest uppercase text-brand-on-surface-variant/70">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
              <span>{filteredProducts.length} Artifacts Shown</span>
            </div>
          </div>
        </div>

        <section className="flex-1 overflow-y-auto px-12 py-8 scroll-smooth no-scrollbar">
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-6 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-on-surface-variant/50">
              <div className="col-span-5">Artifact Details</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Stock Level</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={p.id}
                  className="grid grid-cols-12 gap-6 px-6 py-6 bg-brand-surface-lowest items-center rounded-xl border border-brand-outline-variant/10 hover:shadow-editorial transition-all group shadow-sm cursor-pointer"
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  <div className="col-span-5 flex items-center gap-6">
                    <div className="w-20 h-24 bg-brand-surface-low rounded overflow-hidden flex-shrink-0">
                      <img src={p.images.primary} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-brand-on-surface group-hover:text-brand-primary">{p.name}</h4>
                      <p className="text-[10px] text-brand-on-surface-variant/60 uppercase mt-1">SKU: {p.sku}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="px-3 py-1 bg-brand-surface-low rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-on-surface-variant">{p.category}</span>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1 bg-brand-surface-low rounded-full overflow-hidden">
                        <div className="bg-brand-primary h-full rounded-full" style={{ width: `${(p.stock / 20) * 100}%` }}></div>
                      </div>
                      <span className="text-sm font-semibold">{p.stock}</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm font-bold">₱{p.price.toLocaleString()}</span>
                  </div>
                  <div className="col-span-1 text-right relative">
                    <button 
                      onClick={(e) => toggleMenu(e, p.id)}
                      className="material-symbols-outlined text-brand-on-surface-variant/40 hover:text-brand-primary p-2 rounded-full hover:bg-brand-surface-low transition-all"
                    >
                      more_vert
                    </button>
                    
                    <AnimatePresence>
                      {openMenuId === p.id && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-brand-surface-lowest border border-brand-outline-variant/10 rounded-lg shadow-2xl z-50 overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="py-2">
                            <button 
                              onClick={() => handleEdit(p)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-brand-surface-low flex items-center gap-3 text-brand-on-surface transition-colors"
                            >
                              <span className="material-symbols-outlined text-sm">edit</span>
                              Edit Details
                            </button>
                            <button 
                              onClick={() => navigate(`/product/${p.id}`)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-brand-surface-low flex items-center gap-3 text-brand-on-surface transition-colors"
                            >
                              <span className="material-symbols-outlined text-sm">visibility</span>
                              View Storefront
                            </button>
                            <button 
                              onClick={() => handleEdit(p)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-brand-surface-low flex items-center gap-3 text-brand-on-surface transition-colors"
                            >
                              <span className="material-symbols-outlined text-sm">inventory</span>
                              Adjust Stock
                            </button>
                            <div className="h-px bg-brand-outline-variant/10 my-1"></div>
                            <button 
                              onClick={() => handleDelete(p.id)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-brand-error/10 flex items-center gap-3 text-brand-error transition-colors"
                            >
                              <span className="material-symbols-outlined text-sm">archive</span>
                              Archive Artifact
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <span className="material-symbols-outlined text-4xl text-brand-outline-variant/30 mb-4">search_off</span>
                <p className="text-brand-secondary italic">No artifacts match your current filter.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <ArtifactModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            product={editingProduct}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

