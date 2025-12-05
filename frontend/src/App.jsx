import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Intropage from "./home.jsx";
import Menpage from "./filterpage/tshirt.jsx";
// import All from "../filterpage/all.jsx";
// import Womenpage from "../filterpage/womenpage.jsx";
// import Footwearpage from "../filterpage/footwarepage.jsx";
// import Furniturepage from "../filterpage/furniturepage.jsx";
// import Beautypage from "../filterpage/beauty.jsx";
// import Accessoriespage from "../filterpage/accessoriespage.jsx";
// import Kidpage from "../filterpage/kidspage.jsx";
import Header from "./Header.jsx";
import Footer from "./components/Footer.jsx";
import OtpLoginpage from "./login/OtpLoginPage.jsx";
import NewLoginPage from "./auth/NewLoginPage.jsx";
import RegisterPage from "./auth/RegisterPage.jsx";
import WishlistPage from "./wishlist/WishlistCombined.jsx";
import CartPage from "./wishlist/cartpage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx"
import Addresspage from "./Addresspage.jsx";
import SavedAddresspage from "./address/savedaddress.jsx";
import ShowAddresspage from "./address/showaddress.jsx";
import CheckoutPage from "./payment/CheckoutPage.jsx";
import OrderConfirmation from "./order/OrderConfirmation.jsx";
import OrderHistory from "./order/History.jsx";
import ProductSummary from "./order/ProductSummary.jsx";
import ProductPage from "./Productpage.jsx";
// import SplashScreen from "./splash.jsx";
import ProfilePage from "./profile/ProfilePage.jsx";

function App() {
  const location = useLocation();
  // const [showSplash, setShowSplash] = useState(location.pathname === "/");

  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     const timer = setTimeout(() => {
  //       setShowSplash(false);
  //     }, 3000); // Show splash for 3 seconds
  //     return () => clearTimeout(timer);
  //   } else {
  //     setShowSplash(false); // Disable splash on other routes
  //   }
  // }, [location.pathname]);

  const hideHeaderRoutes = [
    "/addresss",
    "/savedaddress",
    "/payment",
    "/order-confirmation",
    "/login",
    "/register",
    "/otp-login",
  ];

  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  // if (showSplash) {
  //   return <SplashScreen />;
  // }

  return (
    <>
      {shouldShowHeader && <div style={{ height: 105 }}></div>}
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Intropage />} />
        <Route path="/product/:id" element={<ProductPage />} />
         <Route path="/men" element={<Menpage />} />
        {/*<Route path="/women" element={<Womenpage />} />
        <Route path="/footware" element={<Footwearpage />} />
        <Route path="/furniture" element={<Furniturepage />} />
        <Route path="/Beauty" element={<Beautypage />} />
        <Route path="/Accessories" element={<Accessoriespage />} />
        <Route path="/kid" element={<Kidpage />} />
        <Route path="/all" element={<All />} /> */}
        <Route path="/login" element={<NewLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp-login" element={<OtpLoginpage />} />
        <Route path="/addresss" element={<Addresspage />} />
        <Route path="/payment" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/summary/:id" element={<ProductSummary />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/savedaddress" element={<SavedAddresspage />} />
        <Route path="/showdaddress" element={<ShowAddresspage />} />
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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      {shouldShowHeader && <Footer />}
    </>
  );
}

export default App;