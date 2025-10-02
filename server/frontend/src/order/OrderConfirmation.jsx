import React, { useEffect, useContext, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../wishlist/cartpage";
import ProgressBar from "../components/processbar";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const { products, address, paymentMethod } = state || {};
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const hasStoredOrder = useRef(false); // ✅ prevents duplicate storage

  useEffect(() => {
    if (!hasStoredOrder.current && products && address && paymentMethod) {
      const newOrder = {
        id: Date.now(),
        products,
        address,
        paymentMethod,
        status: "Ordered",
        timestamp: new Date().toLocaleString(),
      };

      const existingOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
      localStorage.setItem("orderHistory", JSON.stringify([...existingOrders, newOrder]));

      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));

      hasStoredOrder.current = true; // ✅ mark as stored
    }
  }, [products, address, paymentMethod, setCart]);

  return (
    <div style={{ padding: "30px", textAlign: "center"
      , background: "linear-gradient(to right bottom, #F06292, #EF9A9A)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
     }}>
      <ProgressBar/>
      <h2>✅ Order Placed Successfully!</h2>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        marginTop: "30px"
      }}>
        {products?.map((item) => (
          <Link
            key={item.id}
            to={`/summary/${item.id}`}
            onClick={() => {
              localStorage.setItem("selectedProduct", JSON.stringify(item));
              localStorage.setItem("selectedAddress", JSON.stringify(address));
              localStorage.setItem("selectedPayment", paymentMethod);
            }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              width: "220px"
            }}>
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/default.png";
                }}
                style={{
                  width: "200px",
                  height: "270px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  backgroundColor: "#f0f0f0"
                }}
              />
              <h4>{item.brand}</h4>
              <p>{item.name}</p>
              <p>Order ID: <strong>{item.orderId}</strong></p>
              <p style={{ color: "blue" }}>View Details ➡️</p>
            </div>
          </Link>
        ))}
      </div>

      <button
        style={{
          marginTop: "40px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
        onClick={() => navigate("/order-history")}
      >
        View All Orders
      </button>
    </div>
  );
};

export default OrderConfirmation;