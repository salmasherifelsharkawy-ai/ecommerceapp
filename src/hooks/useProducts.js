import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../api/products.js";
import { mockProducts } from "../api/mockProducts.js";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);
  const [source, setSource] = useState("api"); // api | mock

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setError(null);
    setSource("api");

    fetchProducts({ signal: controller.signal })
      .then((data) => {
        setProducts(data);
        setStatus("success");
      })
      .catch((e) => {
        if (e?.name === "AbortError") return;
        setProducts(mockProducts);
        setSource("mock");
        setStatus("success");
        setError(
          `${e?.message ?? "Failed to load products"} — showing offline demo products instead.`
        );
      });

    return () => controller.abort();
  }, []);

  const byId = useMemo(() => {
    const map = new Map();
    for (const p of products) map.set(String(p.id), p);
    return map;
  }, [products]);

  return { products, byId, status, error, source };
}

