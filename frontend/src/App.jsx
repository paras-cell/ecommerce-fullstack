import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intropage from "./home.jsx";
import MenPage from "./men.jsx";
import Header from "./Header.jsx";
import Footer from "./components/Footer.jsx";
import Tshirt from "./filterpage/tshirt.jsx";
import Loginpage from "./login/OtpLoginPage.jsx";
import WishlistPage from "./wishlist/WishlistCombined.jsx";
import CartPage from "./wishlist/cartpage.jsx";
import ProtectedRoute from "./pProtectedRoute.jsx"; // ✅ Import this

function App() {
  return (
    <Router>
      <div style={{ height: 105 }}></div>
      <Header />
      <Routes>
        <Route path="/" element={<Intropage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/tshirt" element={<Tshirt />} />
        <Route path="/login" element={<Loginpage />} />
        {/* ✅ Wrap protected routes */}
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;