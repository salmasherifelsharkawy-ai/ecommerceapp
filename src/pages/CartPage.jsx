import { Link, useNavigate } from "react-router-dom";
import QuantityPicker from "../components/QuantityPicker.jsx";
import { useCart } from "../state/cart/CartContext.jsx";
import { formatEgpFromUsd } from "../utils/currency.js";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, subtotal, removeFromCart, setQty, clearCart } = useCart();

  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap gap-2 justify-content-between align-items-end mb-3">
        <div>
          <h1 className="h3 mb-1">Your cart</h1>
          <div className="text-muted">Update quantities, remove items, then checkout.</div>
        </div>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-secondary" to="/products">
            Continue shopping
          </Link>
          <button
            className="btn btn-outline-danger"
            onClick={clearCart}
            disabled={items.length === 0}
          >
            Clear cart
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border rounded-4 shadow-sm p-4">
          <div className="alert alert-warning mb-0">
            Your cart is empty. Go add something nice.
          </div>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="bg-white border rounded-4 shadow-sm p-3 p-md-4">
              <div className="d-grid gap-3">
                {items.map(({ product, qty }) => (
                  <div
                    key={product.id}
                    className="d-flex gap-3 align-items-start border rounded-4 p-3"
                  >
                    <div className="bg-white border rounded-3 p-2" style={{ width: 92 }}>
                      <div className="ratio ratio-1x1">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="img-fluid"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between gap-2">
                        <div>
                          <div className="fw-semibold">{product.title}</div>
                          <div className="text-muted small">{product.category}</div>
                        </div>
                        <div className="fw-semibold">
                          {formatEgpFromUsd(Number(product.price) * Number(qty))}
                        </div>
                      </div>
                      <div className="d-flex flex-wrap gap-2 align-items-center mt-2">
                        <QuantityPicker
                          value={qty}
                          onChange={(v) => setQty(product.id, v)}
                        />
                        <Link className="btn btn-light border" to={`/products/${product.id}`}>
                          View
                        </Link>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => removeFromCart(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="bg-white border rounded-4 shadow-sm p-3 p-md-4">
              <h2 className="h5 mb-3">Order summary</h2>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>{formatEgpFromUsd(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping</span>
                <span>{formatEgpFromUsd(shipping)}</span>
              </div>
              <div className="d-flex justify-content-between fw-semibold border-top pt-2">
                <span>Total</span>
                <span>{formatEgpFromUsd(total)}</span>
              </div>
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
              <div className="small text-muted mt-2">
                Demo checkout (no payment processed).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

