import { Navigate, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/AppNavbar.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ToastHost from "./components/ToastHost.jsx";

export default function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppNavbar />
      <ToastHost />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="border-top bg-white">
        <div className="container py-3 small text-muted d-flex justify-content-between">
          <span>ShopSmart</span>
          <span>React + Bootstrap + Context</span>
        </div>
      </footer>
    </div>
  );
}

