import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { WishlistProvider } from "./wishlist/WishlistCombined.jsx";
import { CartProvider } from "./wishlist/cartpage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <CartProvider>
  <WishlistProvider>
    <App />
  </WishlistProvider>
</CartProvider>
  </StrictMode>
);
