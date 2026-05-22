/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Inventory } from './pages/Inventory';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { CustomerOrders } from './pages/CustomerOrders';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { OrderTracking } from './pages/OrderTracking';
import { Showrooms } from './pages/Showrooms';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminCatalog } from './pages/AdminCatalog';
import { AdminOrders } from './pages/AdminOrders';
import { AdminCustomers } from './pages/AdminCustomers';
import { AdminLogin } from './pages/AdminLogin';
import { AdminAnalytics } from './pages/AdminAnalytics';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<CustomerOrders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/showrooms" element={<Showrooms />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/catalog" element={<AdminCatalog />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
