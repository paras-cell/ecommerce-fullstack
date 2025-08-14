import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Intropage from "./home.jsx";
import MenPage from "./men.jsx";
import Header from "./Header.jsx";
import Footer from "./components/Footer.jsx";
import Tshirt from "./filterpage/tshirt.jsx"
import Loginpage from "./OtpLoginPage.jsx"

function App() {
  return (
    <Router>
      <div style={{height:105}}></div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Intropage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/tshirt" element={<Tshirt/>}/>
        <Route path="/login" element={<Loginpage/>}/>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
