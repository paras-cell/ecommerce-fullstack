import React, { useState, useEffect, createContext, useContext } from "react";
import { WishlistContext } from "./WishlistCombined";
import "../components/card.css";
import "./cart.css";

// 🛒 Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed.map((item) => ({
      ...item,
      quantity: item.quantity ?? 1,
      basePrice: item.basePrice ?? item.price,
    }));
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const alreadyExists = cart.some((cartItem) => cartItem.id === item.id);
    if (!alreadyExists) {
      setCart((prev) => [
        ...prev,
        { ...item, quantity: 1, basePrice: item.price },
      ]);
      showToast(`Added ${item.brand} to cart`);
    } else {
      showToast(`${item.brand} is already in cart`);
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed item from cart`);
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #333;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      z-index: 9999;
      font-size: 14px;
      animation: fadeout 3s forwards;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  // ✅ Add totals to context
  const totalOrgPrice = cart.reduce(
    (sum, item) => sum + item.orgprice * item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.basePrice ?? item.price) * item.quantity,
    0
  );

  const totalDiscount = totalOrgPrice - totalPrice;

  const value = {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalOrgPrice,
    totalDiscount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 🧮 Cart Page
export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalOrgPrice,
    totalDiscount,
  } = useContext(CartContext);

  const { addToWishlist } = useContext(WishlistContext);

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ marginLeft: "80px", fontSize: "X-large" }}>
        My Cart ({cart.length})
      </h3>
      {Array.isArray(cart) && cart.length > 0 ? (
        <>
          <div className="cart-grid">
            {cart.map((item, index) => (
              <div key={index} className="cart-card">
                <div>
                  <img src={item.image} alt={item.brand} width="170" />
                </div>
                <div className="details">
                  <h1
                    style={{ position: "relative", left: "-121%", top: "21%" }}
                  >
                    {item.brand}
                  </h1>
                  <p>{item.details}</p>
                  <p style={{ fontSize: "x-large" }}>
                    <b>Rs.{(item.basePrice ?? item.price) * item.quantity}</b>
                  </p>
                  <p style={{ textDecoration: "line-through" }}>
                    Rs.{item.orgprice * item.quantity}
                  </p>
                  <p style={{ color: "orange" }}>({item.off}% off)</p>

                  <div
                    style={{
                      position: "relative",
                      left: "-118%",
                      top: "-19%",
                      display: "flex",
                    }}
                  >
                    <button
                      className="remove-button-cart"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="wish"
                      onClick={() => {
                        addToWishlist(item);
                        removeFromCart(item.id);
                      }}
                    >
                      Move to WishList
                    </button>

                    <div className="quantity-controls" style={{ padding: "7px" }}>
                      <button
                        className="q-button"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                      <button
                        className="q-button"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h4>🧾 Cart Summary</h4>
            <p>
              Original Total:{" "}
              <span className="total" style={{ left: "102%" }}>
                Rs.{totalOrgPrice}
              </span>
            </p>
            <p
              style={{
                borderBottom: "1px solid #80808061",
                width: "100%",
              }}
            >
              Discount Total:{" "}
              <span className="total" style={{ left: "47%" }}>
                - Rs.{totalDiscount}
              </span>
            </p>
            <p>
              Final Price:{" "}
              <span className="total" style={{ left: "132%" }}>
                Rs.{totalPrice}
              </span>
            </p>
            <p
              style={{
                position: "relative",
                bottom: "4.5%",
                left: "63%",
                fontSize: "14px",
                color: "green",
              }}
            >
              (You Saved: Rs.{totalDiscount})
            </p>
            <a href="/savedaddress">
              <button className="buy-button">Proceed to Buy</button>
            </a>
          </div>
        </>
      ) : (
        <div>
          <p>No items in cart yet.</p>
          <a href="/addresss">
            <button>add new address</button>
          </a>
        </div>
      )}
    </div>
  );
}

export { CartContext };