import React, { useEffect, useState } from "react";

const ProductSummary = () => {
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    const storedAddress = localStorage.getItem("selectedAddress");
    const storedPayment = localStorage.getItem("selectedPayment");

    if (storedProduct) {
      const parsedProduct = JSON.parse(storedProduct);

      // ✅ Fix image path if missing leading slash
      const imagePath = parsedProduct.image?.startsWith("/")
        ? parsedProduct.image
        : `/${parsedProduct.image}`;

      parsedProduct.image = imagePath;

      console.log("✅ Product image URL:", imagePath);
      setProduct(parsedProduct);
    }

    if (storedAddress) setAddress(JSON.parse(storedAddress));
    if (storedPayment) setPaymentMethod(storedPayment);
  }, []);

  if (!product) {
    return (
      <p style={{ padding: "30px", textAlign: "center" }}>
        ⚠️ Product data not found.
      </p>
    );
  }

  const trackingStages = ["Ordered", "Shipped", "Near Location", "Delivered"];
  const currentStage = 1;

  return (
    <div style={{ padding: "30px" }}>
      <h2>📦 Product Summary</h2>
      <p>
        Order ID: <strong>{product.orderId}</strong>
      </p>

      <div
        style={{
          display: "flex",
          gap: "30px",
          marginBottom: "30px",
          alignItems: "flex-start",
          marginTop:"38px"
        }}
      >
        <div>
          <img
            src={product.image || "/images/default.png"}
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/default.png";
            }}
            style={{
              width: "200px",
              height: "270px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#f0f0f0",
            }}
          />
        </div>
        <div>
          <div style={{ marginBottom: "38px" }}>
            <h3>Tracking</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {trackingStages.map((stage, index) => (
                <li
                  key={stage}
                  style={{
                    padding: "8px",
                    color: index <= currentStage ? "green" : "#999",
                    fontWeight: index === currentStage ? "bold" : "normal",
                  }}
                >
                  {index <= currentStage ? "✅" : "⬜"} {stage}
                </li>
              ))}
            </ul>
          </div>
          <h3>Delivery Address</h3>
          {address ? (
            <>
              <p>
                {address.name}, {address.building}, {address.street},{" "}
                {address.city}, {address.state}, {address.pincode}
              </p>
              <p>
                <b>Contact</b> 📞 {address.phone} | 📧 {address.email}
              </p>
            </>
          ) : (
            <p style={{ color: "red" }}>⚠️ No address selected.</p>
          )}
        </div>

        <div
          style={{
            display: "flex",

            gap: "5px",
            flexDirection: "column",
            marginLeft: "64px",
            margiTop: "25px",
            borderLeft: "1px solid",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>{product.brand}</h3>
          <p>{product.name}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Unit Price: ₹{product.basePrice}</p>
          <h3>Total Bill</h3>
          <p>
            <strong>₹{product.basePrice * product.quantity}</strong>
          </p>

          <h3>Payment Method</h3>
          <p>
            {paymentMethod ? paymentMethod.toUpperCase() : "⚠️ Not selected"}
          </p>

          {currentStage < 2 && (
            <button
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Cancel This Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
