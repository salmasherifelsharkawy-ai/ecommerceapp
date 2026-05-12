const API_BASE = "https://fakestoreapi.com";

async function httpGetJson(url, { signal } = {}) {
  let res;
  try {
    res = await fetch(url, { signal });
  } catch (e) {
    const msg =
      e?.name === "AbortError"
        ? "Request cancelled"
        : "Network error: failed to fetch (blocked/offline API)";
    const err = new Error(msg);
    err.cause = e;
    throw err;
  }
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return await res.json();
}

export async function fetchProducts({ signal } = {}) {
  const data = await httpGetJson(`${API_BASE}/products`, { signal });
  return Array.isArray(data) ? data : [];
}

export async function fetchProductById(id, { signal } = {}) {
  if (!id) return null;
  return await httpGetJson(`${API_BASE}/products/${encodeURIComponent(id)}`, { signal });
}

