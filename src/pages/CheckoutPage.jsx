import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../state/cart/CartContext.jsx";
import { useToast } from "../state/toast/ToastContext.jsx";
import { formatEgpFromUsd } from "../utils/currency.js";

const initialForm = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  phone: "",
  notes: ""
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + shipping;

  const missing = useMemo(() => {
    const req = ["fullName", "email", "address", "city", "phone"];
    return req.filter((k) => !String(form[k]).trim());
  }, [form]);

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (items.length === 0) return;
    if (missing.length > 0) return;
    clearCart();
    showToast({
      title: "Order confirmed",
      message: `Thanks, ${form.fullName}! Your order is on the way.`,
      variant: "success",
      durationMs: 4500
    });
    navigate("/products", { state: { justOrdered: true, name: form.fullName } });
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
        <div>
          <h1 className="h3 mb-1">Checkout</h1>
          <div className="text-muted">Fill in your details and place the order.</div>
        </div>
        <Link to="/cart" className="btn btn-outline-secondary">
          Back to cart
        </Link>
      </div>

      {items.length === 0 && (
        <div className="alert alert-warning">
          Your cart is empty. <Link to="/products">Go to products</Link>.
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <form className="bg-white border rounded-4 shadow-sm p-3 p-md-4" onSubmit={onSubmit}>
            <h2 className="h5 mb-3">Customer info</h2>

            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Full name</label>
                <input
                  className={`form-control ${
                    submitted && !form.fullName.trim() ? "is-invalid" : ""
                  }`}
                  value={form.fullName}
                  onChange={onChange("fullName")}
                  placeholder="Gasser"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${
                    submitted && !form.email.trim() ? "is-invalid" : ""
                  }`}
                  value={form.email}
                  onChange={onChange("email")}
                  placeholder="zeyad@email.com"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Phone</label>
                <input
                  className={`form-control ${
                    submitted && !form.phone.trim() ? "is-invalid" : ""
                  }`}
                  value={form.phone}
                  onChange={onChange("phone")}
                  placeholder="+20 ..."
                />
              </div>

              <div className="col-12">
                <label className="form-label">Address</label>
                <input
                  className={`form-control ${
                    submitted && !form.address.trim() ? "is-invalid" : ""
                  }`}
                  value={form.address}
                  onChange={onChange("address")}
                  placeholder="Street, building, apartment"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">City</label>
                <input
                  className={`form-control ${
                    submitted && !form.city.trim() ? "is-invalid" : ""
                  }`}
                  value={form.city}
                  onChange={onChange("city")}
                  placeholder="Cairo"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Notes (optional)</label>
                <input
                  className="form-control"
                  value={form.notes}
                  onChange={onChange("notes")}
                  placeholder="Leave at the door..."
                />
              </div>
            </div>

            {submitted && missing.length > 0 && (
              <div className="alert alert-danger mt-3 mb-0">
                Please fill required fields.
              </div>
            )}

            <button className="btn btn-primary mt-3" type="submit" disabled={items.length === 0}>
              Place order
            </button>
          </form>
        </div>

        <div className="col-12 col-lg-5">
          <div className="bg-white border rounded-4 shadow-sm p-3 p-md-4">
            <h2 className="h5 mb-3">Summary</h2>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Items</span>
              <span>{items.length}</span>
            </div>
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
            <div className="small text-muted mt-2">
              This is a UI demo; no real payment is taken.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

