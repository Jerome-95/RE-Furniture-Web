/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { AdminSidebar } from '../components/Navigation';
import { cn } from '../lib/utils';

export const AdminCustomers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patrons, setPatrons] = useState([
    { name: 'Rafael Alcantara', email: 'r.alcantara@studio.ph', ltv: '₱142,500', status: 'Verified' },
    { name: 'Sofia de Leon', email: 'sofia.dl@lifestyle.com', ltv: '₱38,200', status: 'Guest' },
    { name: 'Elena Rustia', email: 'elena.rustia@curation.com', ltv: '₱84,500', status: 'Verified' },
  ]);

  const filteredPatrons = useMemo(() => {
    return patrons.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, patrons]);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEditPatron = (email: string) => {
    const name = patrons.find(p => p.email === email)?.name;
    const newName = prompt('Enter new name for this patron:', name);
    if (newName) {
      setPatrons(patrons.map(p => p.email === email ? { ...p, name: newName } : p));
    }
    setOpenMenuId(null);
  };

  const handleSendSelection = (email: string) => {
    alert(`A curated selection of artifacts has been dispatched to ${email}.`);
    setOpenMenuId(null);
  };

  const handleViewHistory = (name: string) => {
    alert(`Displaying acquisition history for ${name}. (Integration pending)`);
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
      <main className="ml-0 flex-1 p-12 max-w-7xl">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-on-surface tracking-tight mb-4">Patron Directory</h1>
            <p className="text-brand-on-surface-variant font-body text-lg leading-relaxed">
              Managing the individuals who curate their lives with our editorial artifacts.
            </p>
          </div>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-brand-on-surface-variant/40">search</span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-surface-low border-0 border-b-2 border-brand-outline-variant/30 py-4 pl-12 pr-4 focus:ring-0 focus:border-brand-primary transition-all font-body text-sm" 
              placeholder="Search by name..." 
              type="text"
            />
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="md:col-span-2 bg-brand-surface-lowest p-8 rounded border border-brand-outline-variant/10 flex flex-col justify-between relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-brand-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <h3 className="text-xs tracking-[0.2em] font-sans font-bold uppercase text-brand-on-surface-variant">Sentiment Pulse</h3>
              </div>
              <p className="text-2xl font-serif italic text-brand-on-surface leading-tight max-w-lg">
                "Clients are increasingly gravitating toward the <span className="text-brand-primary">walnut textures</span> and expressed a desire for more modular shelving."
              </p>
            </div>
            <div className="mt-8 flex gap-4 overflow-x-auto no-scrollbar pb-2">
              <div className="px-4 py-2 bg-brand-secondary-container/50 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-on-secondary-container">84% Positive Feedback</span>
              </div>
            </div>
          </div>
          <div className="bg-brand-primary p-8 rounded text-white flex flex-col justify-center items-center text-center shadow-lg">
            <h3 className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/60 mb-6">Avg Lifetime Value</h3>
            <div className="text-5xl font-serif font-bold mb-2">₱42.8k</div>
            <p className="text-xs opacity-70 tracking-wide">+12% from previous quarter</p>
          </div>
        </section>

        <div className="bg-brand-surface-low rounded-xl overflow-hidden shadow-sm border border-brand-outline-variant/10">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-brand-surface-low border-b border-brand-outline-variant/10">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-brand-on-surface-variant">Patron</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-brand-on-surface-variant">Contact</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-brand-on-surface-variant text-right">LTV</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-brand-on-surface-variant">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-brand-on-surface-variant text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-outline-variant/10">
              {filteredPatrons.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-brand-secondary italic">
                    No patrons found matching your search.
                  </td>
                </tr>
              ) : (
                filteredPatrons.map((patron) => (
                  <tr key={patron.name} className="hover:bg-brand-surface-lowest transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-serif font-bold text-brand-on-surface text-lg">{patron.name}</p>
                      <p className="text-[10px] uppercase text-brand-on-surface-variant opacity-40">Joined Jan 2024</p>
                    </td>
                    <td className="px-8 py-6 font-sans text-sm text-brand-on-surface-variant">{patron.email}</td>
                    <td className="px-8 py-6 text-right font-bold text-brand-primary">{patron.ltv}</td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                        patron.status === 'Verified' ? "bg-brand-secondary-container text-brand-on-secondary-container" : "bg-brand-surface-variant text-brand-on-surface-variant"
                      )}>
                        {patron.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right relative">
                      <button 
                        onClick={(e) => toggleMenu(e, patron.email)}
                        className="material-symbols-outlined text-brand-on-surface-variant/40 hover:text-brand-primary p-2 rounded-full hover:bg-brand-surface-low transition-all"
                      >
                        more_vert
                      </button>

                      {openMenuId === patron.email && (
                        <div className="absolute right-8 mt-2 w-48 bg-white border border-brand-outline-variant/10 rounded-lg shadow-2xl z-50 overflow-hidden text-left py-2">
                          <button 
                            onClick={() => handleSendSelection(patron.email)}
                            className="w-full px-4 py-2 text-sm hover:bg-brand-surface-low flex items-center gap-3 text-brand-on-surface transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">mail</span>
                            Send Selection
                          </button>
                          <button 
                            onClick={() => handleViewHistory(patron.name)}
                            className="w-full px-4 py-2 text-sm hover:bg-brand-surface-low flex items-center gap-3 text-brand-on-surface transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">history</span>
                            Purchase History
                          </button>
                          <button 
                            onClick={() => handleEditPatron(patron.email)}
                            className="w-full px-4 py-2 text-sm hover:bg-brand-surface-low flex items-center gap-3 text-brand-on-surface transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                            Edit Patron Info
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
