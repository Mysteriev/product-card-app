import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout/Layout'; // Import Layout
import './styles/global.css'; // Import global styles

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}> {/* Add basename for GitHub Pages */}
      <Layout> {/* Wrap routes in Layout */}
        <Routes>
          {/* Redirect base path to /products */}
          <Route path="/" element={<Navigate replace to="/products" />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
