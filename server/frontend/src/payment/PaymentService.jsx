import React, { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

export const usePayment = () => useContext(PaymentContext);

const PaymentProvider = ({ children }) => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const initiatePayment = async (amount, metadata = {}) => {
    if (!selectedMethod) {
      alert("Please select a payment method first.");
      return;
    }

    console.log("🧾 Payment initiated");
    console.log("Method:", selectedMethod);
    console.log("Amount:", amount);
    console.log("Metadata:", metadata);

    // 🔄 Razorpay logic can be added here later
  };

  return (
    <PaymentContext.Provider value={{ selectedMethod, setSelectedMethod, initiatePayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;