import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../state/cart/CartContext.jsx";

const BrandDot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--brand), var(--brand-2));
  margin-right: 10px;
`;

export default function AppNavbar() {
  const { count } = useCart();

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-semibold d-flex align-items-center" to="/products">
          <BrandDot />
          <span className="brand-text">ShopSmart</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                Cart{" "}
                <span className="badge text-bg-primary align-middle" style={{ marginLeft: 6 }}>
                  {count}
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="btn btn-outline-primary btn-sm" to="/checkout">
                Checkout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

