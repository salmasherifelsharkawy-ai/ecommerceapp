import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatEgpFromUsd } from "../utils/currency.js";

const Price = styled.span`
  font-weight: 700;
  letter-spacing: -0.01em;
`;

function shorten(s, n = 90) {
  const str = String(s ?? "");
  if (str.length <= n) return str;
  return `${str.slice(0, n - 1)}…`;
}

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="card h-100 card-hover border-0 shadow-sm">
      <div className="ratio ratio-4x3 bg-white rounded-top">
        <img
          src={product.image}
          alt={product.title}
          className="img-fluid p-3"
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      </div>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <h6 className="card-title mb-1" style={{ lineHeight: 1.25 }}>
            {shorten(product.title, 60)}
          </h6>
          <Price>{formatEgpFromUsd(product.price)}</Price>
        </div>
        <div className="text-muted small mb-3">{shorten(product.description, 110)}</div>
        <div className="mt-auto d-flex gap-2">
          <Link className="btn btn-light border w-100" to={`/products/${product.id}`}>
            View
          </Link>
          <button className="btn btn-primary w-100" onClick={() => onAddToCart(product)}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

