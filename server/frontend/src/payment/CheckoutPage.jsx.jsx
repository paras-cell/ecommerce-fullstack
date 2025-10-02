import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../wishlist/cartpage";
import { useAddress } from "../address/AddressContext";
import { usePayment } from "./PaymentService";
import PaymentOptions from "./PaymentOptions";
import ProgressBar from "../components/processbar";

const CheckoutPage = () => {
  const { cart, totalPrice } = useContext(CartContext);
  const { selectedAddress } = useAddress();
  const { initiatePayment, selectedMethod } = usePayment();
  const navigate = useNavigate();

  const generateOrderId = () =>
    "ORD" + Math.floor(100000 + Math.random() * 900000);

  const handleProceed = () => {
    if (!selectedMethod || !selectedAddress || cart.length === 0) {
      alert("Please complete all steps before proceeding.");
      return;
    }

    initiatePayment(totalPrice, {
      items: cart,
      address: selectedAddress,
      method: selectedMethod,
    });

    const productsWithOrderIds = cart.map((item) => ({
      ...item,
      orderId: generateOrderId(),
    }));

    navigate("/order-confirmation", {
      state: {
        products: productsWithOrderIds,
        address: selectedAddress,
        paymentMethod: selectedMethod,
      },
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "linear-gradient(to right bottom, #F06292, #EF9A9A)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "554px",
      }}
    >
      <ProgressBar />
      <h2>🛍️ Checkout</h2>
      <PaymentOptions />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "8px",
          }}
          onClick={handleProceed}
        >
          Proceed with{" "}
          {selectedMethod ? selectedMethod.toUpperCase() : "Payment"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
