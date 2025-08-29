import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Intropage from "./home.jsx";
import MenPage from "./men.jsx";
import Header from "./Header.jsx";
import Footer from "./components/Footer.jsx";
import Tshirt from "./filterpage/tshirt.jsx";
import Loginpage from "./login/OtpLoginPage.jsx";
import WishlistPage from "./wishlist/WishlistCombined.jsx";
import CartPage from "./wishlist/cartpage.jsx";
import ProtectedRoute from "./pProtectedRoute.jsx";
import Addresspage from "./Addresspage.jsx";
import SavedAddresspage from "./address/savedaddress.jsx";
import ShowAddresspage from "./address/showaddress.jsx";
import CheckoutPage from "./payment/CheckoutPage.jsx.jsx";
import OrderConfirmation from "./order/OrderConfirmation.jsx";
import OrderHistory from "./order/History.jsx";
import ProductSummary from "./order/ProductSummary";
import ProductPage from "./Productpage.jsx";




function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/addresss", "/savedaddress", "/payment","/order-confirmation"]; // 👈 Add any route you want to exclude

  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <div style={{ height: 105 }}></div>}
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Intropage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/tshirt" element={<Tshirt />} />
        <Route path="/login" element={<Loginpage />} />
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
      </Routes>
      {shouldShowHeader && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
