/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend, PieChart, Pie
} from 'recharts';
import { AdminSidebar } from '../components/Navigation';
import { cn } from '../lib/utils';

const revenueData = [
  { month: 'Jan', revenue: 450000, orders: 120 },
  { month: 'Feb', revenue: 520000, orders: 145 },
  { month: 'Mar', revenue: 480000, orders: 132 },
  { month: 'Apr', revenue: 610000, orders: 178 },
  { month: 'May', revenue: 840000, orders: 210 },
  { month: 'Jun', revenue: 790000, orders: 195 },
];

const categoryData = [
  { name: 'Seating', value: 45 },
  { name: 'Tables', value: 25 },
  { name: 'Storage', value: 15 },
  { name: 'Lighting', value: 10 },
  { name: 'Misc', value: 5 },
];

const COLORS = ['#1D4ED8', '#3B82F6', '#93C5FD', '#BFDBFE', '#DBEAFE'];

export const AdminAnalytics: React.FC = () => {
  return (
    <div className="flex bg-brand-background min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="material-symbols-outlined text-brand-primary" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
            <h1 className="text-4xl font-serif italic text-brand-on-surface">Data Journal</h1>
          </div>
          <p className="text-brand-on-surface-variant font-body text-lg max-w-2xl leading-relaxed">
            Quantifying the resonance of Atelier Oak. Performance metrics and spatial trends.
          </p>
        </header>

        {/* Global Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Avg Order Value', value: '₱42,500', trend: '+8.2%', positive: true },
            { label: 'Retention Rate', value: '24%', trend: '+2.1%', positive: true },
            { label: 'Return Rate', value: '0.4%', trend: '-0.1%', positive: true },
            { label: 'Net Margin', value: '38%', trend: 'Stable', positive: null },
          ].map((metric) => (
            <div key={metric.label} className="bg-brand-surface-low p-6 rounded-xl border border-brand-outline-variant/10 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-secondary block mb-2">{metric.label}</span>
              <div className="text-2xl font-serif font-bold text-brand-on-surface">{metric.value}</div>
              {metric.trend && (
                <div className={cn(
                  "text-[10px] font-bold mt-2",
                  metric.positive === true ? "text-brand-primary" : metric.positive === false ? "text-brand-error" : "text-brand-secondary/60"
                )}>
                  {metric.trend} vs Last Quarter
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Revenue Over Time */}
          <section className="col-span-12 lg:col-span-8 bg-brand-surface-lowest p-10 rounded-xl shadow-sm border border-brand-outline-variant/10">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-serif italic text-brand-on-surface">Revenue Growth</h2>
              <div className="flex gap-4">
                <button className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-brand-primary text-white rounded">Monthly</button>
                <button className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-brand-surface-low text-brand-secondary rounded">Weekly</button>
              </div>
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 600, fill: '#6B7280' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 600, fill: '#6B7280' }}
                    tickFormatter={(val) => `₱${val/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      borderRadius: '8px', 
                      border: '1px solid #f3f4f6',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#1D4ED8" 
                    fillOpacity={1} 
                    fill="url(#colorRev)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Category Distribution */}
          <section className="col-span-12 lg:col-span-4 bg-brand-surface-lowest p-10 rounded-xl shadow-sm border border-brand-outline-variant/10">
            <h2 className="text-2xl font-serif italic text-brand-on-surface mb-10">Portfolio Mix</h2>
            <div className="h-[300px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {categoryData.map((cat, i) => (
                <div key={cat.name} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                    <span className="font-medium text-brand-on-surface">{cat.name}</span>
                  </div>
                  <span className="font-bold text-brand-secondary">{cat.value}%</span>
                </div>
              ))}
            </div>
          </section>

          {/* Patrons & Traffic */}
          <section className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-brand-surface-low p-10 rounded-xl relative overflow-hidden">
              <h3 className="text-xl font-serif italic mb-6">Channel Performance</h3>
              <div className="space-y-6">
                {[
                  { channel: 'Direct / Word of Mouth', value: 65, color: '#1D4ED8' },
                  { channel: 'Editorial Features', value: 20, color: '#3B82F6' },
                  { channel: 'Social Architecture', value: 10, color: '#93C5FD' },
                  { channel: 'Search Presence', value: 5, color: '#BFDBFE' },
                ].map(item => (
                  <div key={item.channel} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-brand-secondary">
                      <span>{item.channel}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-brand-surface-lowest rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-on-surface p-10 rounded-xl text-white flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-serif italic mb-2">Curator Insight</h3>
                <p className="text-sm opacity-60 leading-relaxed font-body">
                  "PATRONS ARE INCREASINGLY DEMANDING AMERICAN WALNUT FINISHES OVER OAK THIS SEASON. RECOMMEND ADJUSTING INVENTORY PROJECTIONS FOR Q3."
                </p>
              </div>
              <div className="pt-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">psychology</span>
                </div>
                <div className="text-[10px] uppercase font-bold tracking-[0.2em]">AI Predictive Analysis</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
