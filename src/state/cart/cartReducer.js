export const CART_ACTIONS = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  SET_QTY: "SET_QTY",
  CLEAR: "CLEAR"
};

export const initialCartState = {
  items: []
};

function clampQty(qty) {
  const n = Number(qty);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(99, Math.round(n)));
}

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD: {
      const { product, qty = 1 } = action.payload ?? {};
      if (!product?.id) return state;

      const nextQty = clampQty(qty);
      const idx = state.items.findIndex((i) => i.product.id === product.id);
      if (idx === -1) {
        return { ...state, items: [...state.items, { product, qty: nextQty }] };
      }
      const items = state.items.map((i) =>
        i.product.id === product.id ? { ...i, qty: clampQty(i.qty + nextQty) } : i
      );
      return { ...state, items };
    }
    case CART_ACTIONS.REMOVE: {
      const id = action.payload?.id;
      if (id == null) return state;
      return { ...state, items: state.items.filter((i) => i.product.id !== id) };
    }
    case CART_ACTIONS.SET_QTY: {
      const { id, qty } = action.payload ?? {};
      if (id == null) return state;
      const items = state.items.map((i) =>
        i.product.id === id ? { ...i, qty: clampQty(qty) } : i
      );
      return { ...state, items };
    }
    case CART_ACTIONS.CLEAR:
      return initialCartState;
    default:
      return state;
  }
}

