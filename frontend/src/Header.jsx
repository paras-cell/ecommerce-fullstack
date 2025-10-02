import React, { useRef, useState } from "react";
import "./Header.css";
import Catlogmen from "./catlog/catlogmen.jsx";
import Catlogwomen from "./catlog/catlogwomen.jsx";
import Catlogkids from "./catlog/catlogkids.jsx";
import Catloghome from "./catlog/catloghome.jsx";
import Catlogbeauty from "./catlog/catlogbeauty.jsx";
import Login from "./login/login.jsx";
import Search_bar from "./components/search_bar.jsx"

const Header = () => {
  const reffmen = useRef(null);
  const reffwomen = useRef(null);
  const reffkids = useRef(null);
  const reffhome = useRef(null);
  const reffbeauty = useRef(null);
  const logreff = useRef(null);

  const [hoveredItem, setHoveredItem] = useState(null);

  const handleHover = (item, isHovered) => {
    if (isHovered) {
      setHoveredItem(item);
    } else {
      setHoveredItem(null);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo"><a href="/" style={{display: "block",height: "100%"}}></a></div>

        <nav className="navbar">
          <div className="nav-item">
            <a
              href="/men"
              onMouseEnter={() => {
                reffmen.current.HoverEffect();
                handleHover("men", true);
              }}
              onMouseLeave={() => {
                reffmen.current.HoverEffectleave();
                handleHover("men", false);
              }}
              className={`item ${hoveredItem === "men" ? "hovered-men" : ""}`}
            >
              MEN
            </a>
            <Catlogmen ref={reffmen} onHover={(isHovered) => handleHover("men", isHovered)} />
          </div>
          <div className="nav-item">
            <a
              href="/women"
              onMouseEnter={() => {
                reffwomen.current.HoverEffect();
                handleHover("women", true);
              }}
              onMouseLeave={() => {
                reffwomen.current.HoverEffectleave();
                handleHover("women", false);
              }}
              className={`item ${hoveredItem === "women" ? "hovered-women" : ""}`}
            >
              WOMEN
            </a>
            <Catlogwomen ref={reffwomen} onHover={(isHovered) => handleHover("women", isHovered)} />
          </div>
          <div className="nav-item">
            <a
              href="kid"
              onMouseEnter={() => {
                reffkids.current.HoverEffect();
                handleHover("kids", true);
              }}
              onMouseLeave={() => {
                reffkids.current.HoverEffectleave();
                handleHover("kids", false);
              }}
              className={`item ${hoveredItem === "kids" ? "hovered-kids" : ""}`}
            >
              KIDS
            </a>
            <Catlogkids ref={reffkids} onHover={(isHovered) => handleHover("kids", isHovered)} />
          </div>
          <div className="nav-item">
            <a
              href="/furniture"
              onMouseEnter={() => {
                reffhome.current.HoverEffect();
                handleHover("home", true);
              }}
              onMouseLeave={() => {
                reffhome.current.HoverEffectleave();
                handleHover("home", false);
              }}
              className={`item ${hoveredItem === "home" ? "hovered-home" : ""}`}
            >
              HOME & LIVING
            </a>
            <Catloghome ref={reffhome} onHover={(isHovered) => handleHover("home", isHovered)} />
          </div>
          <div className="nav-item">
            <a
              href="/Beauty"
              onMouseEnter={() => {
                reffbeauty.current.HoverEffect();
                handleHover("beauty", true);
              }}
              onMouseLeave={() => {
                reffbeauty.current.HoverEffectleave();
                handleHover("beauty", false);
              }}
              className={`item ${hoveredItem === "beauty" ? "hovered-beauty" : ""}`}
            >
              BEAUTY
            </a>
            <Catlogbeauty ref={reffbeauty} onHover={(isHovered) => handleHover("beauty", isHovered)} />
          </div>
        </nav>

        <Search_bar></Search_bar>

        <div className="main-content">

          <div>
            <a
              href="#"
               className={`item main-item ${hoveredItem === "login" ? "hovered-login" : ""}`}
              onMouseEnter={() => {
                logreff.current.HoverEffect();
                handleHover("login", true);
              }}
              onMouseLeave={() => {
                logreff.current.HoverEffectleave();
                handleHover("login", false);
              }}>
              <span
                className="pofile-icon " style={{ backgroundImage: "url(OIP3.jpg)" }}>
                </span>
              <p> Profile</p>
            </a>
            <Login ref={logreff} onHover={(isHovered) => handleHover("login", isHovered)} ></Login>
          </div>


          <div>
            <a href="/wishlist" className="main-item hover">
              <span
                className="pofile-icon"
                style={{ backgroundImage: "url(OIP4.jpg)" }}
              ></span>
              <p>Wishlist</p>
            </a>
          </div>
          <div>
            <a href="/cart" className="main-item hover">
              <span
                className="pofile-icon"
                style={{ backgroundImage: "url(OIP5.jpg)" }}
              ></span>
              <p style={{ padding: "0 10px" }}>Bag</p>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
