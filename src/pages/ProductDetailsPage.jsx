import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import QuantityPicker from "../components/QuantityPicker.jsx";
import { fetchProductById } from "../api/products.js";
import { useCart } from "../state/cart/CartContext.jsx";
import { useToast } from "../state/toast/ToastContext.jsx";
import { formatEgpFromUsd } from "../utils/currency.js";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setError(null);

    fetchProductById(id, { signal: controller.signal })
      .then((data) => {
        setProduct(data);
        setStatus("success");
      })
      .catch((e) => {
        if (e?.name === "AbortError") return;
        setError(e?.message ?? "Failed to load product");
        setStatus("error");
      });

    return () => controller.abort();
  }, [id]);

  const price = useMemo(() => {
    const p = Number(product?.price ?? 0);
    return Number.isFinite(p) ? p : 0;
  }, [product]);

  return (
    <div className="container py-4">
      <div className="mb-3">
        <Link to="/products" className="text-decoration-none">
          ← Back to products
        </Link>
      </div>

      {status === "loading" && <div className="alert alert-info">Loading…</div>}
      {status === "error" && <div className="alert alert-danger">{error}</div>}

      {status === "success" && product && (
        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-5">
            <div className="bg-white border rounded-4 shadow-sm p-4">
              <div className="ratio ratio-1x1">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className="bg-white border rounded-4 shadow-sm p-4">
              <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                <span className="badge text-bg-light border">{product.category}</span>
                {product?.rating?.rate != null && (
                  <span className="badge text-bg-warning">
                    ★ {Number(product.rating.rate).toFixed(1)}
                  </span>
                )}
              </div>
              <h1 className="h4 mb-2">{product.title}</h1>
              <div className="text-muted mb-3">{product.description}</div>

              <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
                <div className="h3 m-0">{formatEgpFromUsd(price)}</div>
                <div className="d-flex flex-column flex-sm-row gap-2 align-items-sm-center">
                  <QuantityPicker value={qty} onChange={setQty} />
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      addToCart(product, qty);
                      showToast({
                        title: "Added to cart",
                        message: `${qty} × ${product.title}`,
                        variant: "success"
                      });
                    }}
                  >
                    Add to cart
                  </button>
                  <Link className="btn btn-outline-primary" to="/cart">
                    Go to cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

