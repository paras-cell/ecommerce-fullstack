import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const History = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrders(storedOrders);
  }, []);

  const handleRemoveOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>📜 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              margin: "20px 0px",
              backgroundColor: "#f9f9f9",
              position: "relative",
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              {order.products.map((item) => (
                <Link
                  key={item.id}
                  to={`/summary/${item.id}`}
                  onClick={() => {
                    localStorage.setItem(
                      "selectedProduct",
                      JSON.stringify(item)
                    );
                    localStorage.setItem(
                      "selectedAddress",
                      JSON.stringify(order.address)
                    );
                    localStorage.setItem(
                      "selectedPayment",
                      order.paymentMethod
                    );
                  }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    style={{
                      width: "180px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "10px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "245px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                    <p>{item.brand}</p>
                    <p>{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div  style={{display:"flex", flexDirection:"column",gap:"16px",marginLeft:"73px"}}>
              <h3 style={{marginBottom:"55px"}} >🧾 Order #{order.id}</h3>
              <p>
                Status: <strong>{order.status}</strong>
              </p>
              <p>Placed on: {order.timestamp}</p>
              <p>Payment: {order.paymentMethod}</p>
              <p>
                Delivery: {order.address.name}, {order.address.city}
              </p>
            </div>

            <button
              onClick={() => handleRemoveOrder(order.id)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel Order
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
