import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./wishlist/cartpage.jsx";
import { WishlistProvider } from "./wishlist/WishlistCombined.jsx";
import { AddressProvider } from "./address/AddressContext.jsx";
import PaymentProvider from "./payment/PaymentService.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AddressProvider>
      <PaymentProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </PaymentProvider>
    </AddressProvider>
  </StrictMode>
);