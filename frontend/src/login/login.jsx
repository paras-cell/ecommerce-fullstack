import "./login.css";
import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";

const Login = forwardRef((props, ref) => {
  const logreff = useRef(null);
  const [userEmail, setUserEmail] = useState(null);

  // Capitalize only the first word
  const capitalizeFirstWord = (str) => {
    const firstWord = str.split(/[^a-zA-Z0-9]/)[0];
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  };

  // Initial load from localStorage
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      const namePart = email.split("@")[0];
      setUserEmail(capitalizeFirstWord(namePart));
    }
  }, []);

  // Listen for localStorage changes (cross-tab or programmatic)
  useEffect(() => {
    const handleStorageChange = () => {
      const email = localStorage.getItem("userEmail");
      if (email) {
        const namePart = email.split("@")[0];
        setUserEmail(capitalizeFirstWord(namePart));
      } else {
        setUserEmail(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Polling fallback for same-tab updates
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    HoverEffect() {
      if (logreff.current) {
        logreff.current.style.visibility = "visible";
        logreff.current.style.opacity = "1";
        logreff.current.style.transition = "0.5s ease-in-out";
      }
    },
    HoverEffectleave() {
      if (logreff.current) {
        logreff.current.style.visibility = "hidden";
        logreff.current.style.opacity = "0";
      }
    },
  }));

  function HoverEffect() {
    if (logreff.current) {
      logreff.current.style.visibility = "visible";
      logreff.current.style.opacity = "1";
      logreff.current.style.transition = "0.5s ease-in-out";
    }
    if (props.onHover) {
      props.onHover(true);
    }
  }

  function HoverEffectleave() {
    if (logreff.current) {
      logreff.current.style.visibility = "hidden";
      logreff.current.style.opacity = "0";
      logreff.current.style.transition = "0.3s";
    }
    if (props.onHover) {
      props.onHover(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    setUserEmail(null);
  };

  const getLink = (path) => (userEmail ? path : "/Login");

  return (
    <div
      className="profile-container"
      ref={logreff}
      onMouseEnter={HoverEffect}
      onMouseLeave={HoverEffectleave}
    >
      {userEmail ? (
        <div className="profile-info">
          <h3 className="text-name">{userEmail}</h3>
          <a href="/profile">
            <button className="login-button logout">Profile</button>
          </a>
        </div>
      ) : (
        <div className="login-button-dis">
          <h3>Welcome</h3>
          <span>To access account and manage order</span>
          <a href="/Login">
            <button className="login-button">login/signup</button>
          </a>
        </div>
      )}

      <div className="hrtag"></div>
      <div className="user-tools">
        <ul className="tools">
          <li className="tool">
            <a href={getLink("/order-history")}>Order</a>
          </li>
          <li className="tool">
            <a href={getLink("/wishlist")}>Wishlist</a>
          </li>
          <li className="tool">
            <a href={getLink("/showdaddress")}>Saved Address</a>
          </li>
          <div className="hrtag"></div>
          <li className="tool">
            <a href={getLink("/coupons")}>Coupons</a>
          </li>
          <li className="tool">
            <a href={getLink("/saved-coupons")}>Saved Coupons</a>
          </li>
          <li className="tool">
            <a href={getLink("/contact")}>Contact Us</a>
          </li>
        </ul>
        {userEmail && (
          <button className="login-button logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
});

export default Login;