import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { useProducts } from "../hooks/useProducts.js";
import { useCart } from "../state/cart/CartContext.jsx";
import { useToast } from "../state/toast/ToastContext.jsx";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { products, status, error, source } = useProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = category === "all" ? true : p.category === category;
      const hay = `${p.title} ${p.description}`.toLowerCase();
      const matchesQuery = q ? hay.includes(q) : true;
      return matchesCategory && matchesQuery;
    });
  }, [products, query, category]);

  return (
    <div className="container py-4">
      <div
        className="p-4 p-md-5 rounded-4 border bg-white shadow-sm mb-4"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(79, 70, 229, 0.08), rgba(6, 182, 212, 0.08))"
        }}
      >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
          <div>
            <h1 className="h3 mb-1">Discover products</h1>
            <div className="text-muted">
              Browse, filter, and add items to your cart. ({source === "api" ? "API data" : "offline demo"})
            </div>
          </div>
          <div className="d-flex gap-2 flex-column flex-sm-row">
            <input
              className="form-control"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ minWidth: 240 }}
            />
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ minWidth: 220 }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All categories" : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {status === "loading" && (
        <div className="alert alert-info">Loading products…</div>
      )}
      {status === "success" && error && <div className="alert alert-warning">{error}</div>}

      {status === "success" && filtered.length === 0 && (
        <div className="alert alert-warning">No products match your filters.</div>
      )}

      <div className="row g-3 g-md-4">
        {filtered.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <ProductCard
              product={p}
              onAddToCart={(prod) => {
                addToCart(prod, 1);
                showToast({
                  title: "Added to cart",
                  message: prod.title,
                  variant: "success"
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

