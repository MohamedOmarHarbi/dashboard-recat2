import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Overview from './pages/Overview';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import ProductDetails from './pages/ProductDetails';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Categories from './pages/Categories';
import Vendors from './pages/Vendors';
import AddVendor from './pages/AddVendor';
import Customers from './pages/Customers';
import SubCategories from './pages/SubCategories';
import HomeLayout from './pages/HomeLayout';
import CustomerDetails from './pages/CustomerDetails';
import Drivers from './pages/Drivers';
import DriverDetails from './pages/DriverDetails';
import Analytics from './pages/Analytics';
import VendorFinance from './pages/VendorFinance';
import FinanceDashboard from './pages/FinanceDashboard';
import DispatchQueue from './pages/DispatchQueue';
import PaymentsReview from './pages/PaymentsReview';
import Settings from './pages/Settings';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GlobalLoader from './components/ui/GlobalLoader';

import ErrorBoundary from './components/system/ErrorBoundary';

function App() {
  console.log("App rendering");
  return (
    <>
      <GlobalLoader />
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Overview />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products/new" element={<AddProduct />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="categories" element={<Categories />} />
              <Route path="subcategories" element={<SubCategories />} />
              <Route path="home-layout" element={<HomeLayout />} />
              <Route path="vendors" element={<Vendors />} />
              <Route path="vendors/add" element={<AddVendor />} />
              <Route path="customers" element={<Customers />} />
              <Route path="customers/:id" element={<CustomerDetails />} />
              <Route path="drivers" element={<Drivers />} />
              <Route path="drivers/:id" element={<DriverDetails />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="vendor-finance" element={<VendorFinance />} />
              <Route path="finance" element={<FinanceDashboard />} />
              <Route path="dispatch-queue" element={<DispatchQueue />} />
              <Route path="payments-review" element={<PaymentsReview />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
