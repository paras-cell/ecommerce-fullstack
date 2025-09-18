import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./card.css";
import { WishlistContext } from "../wishlist/WishlistCombined.jsx";

function Card(props) {
  const { addToWishlist } = useContext(WishlistContext);
  const [hover, setHover] = useState("none");

  const handleWishlistClick = (e) => {
    e.preventDefault(); // prevent navigation when clicking wishlist
    if (!props.id) {
      console.warn("Missing 'id' in product:", props);
      return;
    }
    addToWishlist(props);
    console.log("Adding to wishlist:", props);
  };

  return (
    <Link to={`/product/${props.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        className="card-container"
        onMouseEnter={() => setHover("flex")}
        onMouseLeave={() => setHover("none")}
      >
        <div className="card">
          <div className="card-hover-wishbutton" style={{ display: hover }}>
            <button className="wishbutton" onClick={handleWishlistClick}>
              ❤️ Wishlist
            </button>
            <span style={{ marginLeft: 12, fontSize: "14px" }}>Sizes:44</span>
          </div>

          <span className="rating"> 4⭐ | 11</span>
          <img className="card-image" src={props.image} alt={props.brand} />

          <div className="card-brandname">
            <h2 style={{ textTransform: "uppercase" }}>{props.brand}</h2>
            <span>{props.details}</span>
            <span className="price">
              <b>Rs.{props.price}</b>
              <span className="price-off" style={{ textDecoration: "line-through" }}>
                Rs.{props.orgprice}
              </span>
              <span className="price-off" style={{ color: "orange" }}>
                ({props.off}% off)
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;