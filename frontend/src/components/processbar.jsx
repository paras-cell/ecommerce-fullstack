import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./input.css";

function ProgressBar() {
  const location = useLocation();

  const steps = [
    { path: "/savedaddress", label: "Address" },
    { path: "/payment", label: "Payment" },
    { path: "/order-confirmation", label: "Summary" },
  ];

  const currentIndex = steps.findIndex((step) =>
    location.pathname.startsWith(step.path)
  );
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div style={{ width: "42%", padding: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        {steps.map((step, index) => (
          <div key={step.path} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "16px" }}>
              {index < currentIndex ? (
                <Link to={step.path} style={{ textDecoration: "none" }}>
                  ✅
                </Link>
              ) : index === currentIndex ? (
                "✅"
              ) : (
                "⬜"
              )}
            </div>
            <small>{step.label}</small>
          </div>
        ))}
      </div>

      <progress value={progress} max="100" style={{ width: "100%" }} />
      <p>{Math.round(progress)}%</p>
    </div>
  );
}

export default ProgressBar;