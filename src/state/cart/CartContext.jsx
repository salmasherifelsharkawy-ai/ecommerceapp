import React, { createContext, useContext, useMemo, useReducer } from "react";
import { CART_ACTIONS, cartReducer, initialCartState } from "./cartReducer.js";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const value = useMemo(() => {
    const count = state.items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = state.items.reduce((sum, i) => sum + i.qty * Number(i.product.price || 0), 0);

    return {
      items: state.items,
      count,
      subtotal,
      addToCart: (product, qty = 1) =>
        dispatch({ type: CART_ACTIONS.ADD, payload: { product, qty } }),
      removeFromCart: (id) => dispatch({ type: CART_ACTIONS.REMOVE, payload: { id } }),
      setQty: (id, qty) => dispatch({ type: CART_ACTIONS.SET_QTY, payload: { id, qty } }),
      clearCart: () => dispatch({ type: CART_ACTIONS.CLEAR })
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

