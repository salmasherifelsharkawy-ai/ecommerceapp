# ShopSmart (React E‑Commerce UI)

E‑commerce demo app built with React, featuring products list/details, cart, and checkout.

## Run locally

```bash
cd ecommerce-app
npm install
npm run dev
```

## Features (project requirements)

- **Clear folder structure**: `src/pages`, `src/components`, `src/state`, `src/api`, `src/hooks`
- **Reusable components**: `ProductCard`, `QuantityPicker`, `AppNavbar`
- **Props + mapping**:
  - Products mapped to cards in `ProductsPage`
  - Cart items mapped in `CartPage`
- **User interactions**: search, filter, add/remove items, quantity updates, form inputs, submit checkout
- **Hooks**:
  - `useState` for UI and forms
  - `useEffect` for API fetching
- **API integration**: fetches products from Fake Store API (`fakestoreapi.com`)
- **Context API**: cart global state in `src/state/cart/CartContext.jsx`
- **Styling techniques**:
  - **Bootstrap** (installed + imported in `src/main.jsx`)
  - **External CSS** (`src/styles/global.css`)
  - **Inline styling** (e.g. hero background in `ProductsPage`)
  - **Styled Components** (e.g. `BrandDot` in `AppNavbar`, `Price` in `ProductCard`)

## Pages

- `/products` Products list (search + category filter)
- `/products/:id` Product details + add to cart
- `/cart` Cart summary with quantity update
- `/checkout` Checkout form (demo)

