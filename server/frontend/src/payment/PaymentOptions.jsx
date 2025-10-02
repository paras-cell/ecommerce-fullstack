import React from "react";
import { usePayment } from "./PaymentService";

const PaymentOptions = () => {
  const { selectedMethod, setSelectedMethod } = usePayment();

  const options = [
    { id: "upi", label: "UPI", icon: "🧾" },
    { id: "card", label: "Credit/Debit Card", icon: "💳" },
    { id: "cod", label: "Cash on Delivery", icon: "📦" },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h3>Select Payment Method</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {options.map((opt) => (
          <li
            key={opt.id}
            onClick={() => setSelectedMethod(opt.id)}
            style={{
              margin: "10px 0",
              padding: "12px",
              border: selectedMethod === opt.id ? "2px solid #007bff" : "1px solid #ccc",
              borderRadius: "8px",
              cursor: "pointer",
              background: selectedMethod === opt.id ? "#e6f0ff" : "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{opt.icon} {opt.label}</span>
            {selectedMethod === opt.id && <span>✅</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentOptions;