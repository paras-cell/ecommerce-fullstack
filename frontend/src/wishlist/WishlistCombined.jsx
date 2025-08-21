import { useState, useEffect, createContext, useContext } from "react";
import "../components/card.css";
import "./wishlist.css";
import { CartContext } from "./cartpage"; // ✅ Added for cart functionality

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item) => {
    const alreadyExists = wishlist.some((wishItem) => wishItem.id === item.id);
    if (!alreadyExists) {
      setWishlist((prev) => [...prev, item]);
      showToast(`Added ${item.brand} to wishlist`);
    } else {
      showToast(`${item.brand} is already in wishlist`);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed item from wishlist`);
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

  const value = { wishlist, addToWishlist, removeFromWishlist };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext); // ✅ Access cart function

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ marginLeft: "80px", fontSize: "X-large" }}>
        My Wishlist ({wishlist.length})
      </h3>
      {Array.isArray(wishlist) && wishlist.length > 0 ? (
        <div className="wishlist-grid">
          {wishlist.map((item, index) => (
            <div key={index} className="wishlist-card">
              <img src={item.image} alt={item.brand} width="180" />
              <h3>{item.brand}</h3>
              <p>{item.details}</p>
              <p><b>Rs.{item.price}</b></p>
              <p style={{ textDecoration: "line-through" }}>Rs.{item.orgprice}</p>
              <p style={{ color: "orange" }}>({item.off}% off)</p>
              <button
                className="remove-button"
                onClick={() => removeFromWishlist(item.id)}
              >
                X
              </button>
              <button
                className="Bag"
                onClick={() => {
                  addToCart(item); // ✅ Add to cart
                  removeFromWishlist(item.id); // ✅ Remove from wishlist
                }}
              >
                Move to Bag
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No items in wishlist yet.</p>
      )}
    </div>
  );
}

export { WishlistContext };