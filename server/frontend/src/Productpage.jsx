import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "./product_data/data";
import { CartContext } from "./wishlist/cartpage";
import { WishlistContext } from "./wishlist/WishlistCombined";
import "./productpage.css";

export default function ProductPage() {
  const { id } = useParams();
  const productRaw = data.find((item) => item.id === Number(id));
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [userReviews, setUserReviews] = useState([]);

  const { addToCart } = useContext(CartContext) || {};
  const { addToWishlist } = useContext(WishlistContext) || {};

  useEffect(() => {
    if (productRaw) {
      const normalizeImage = (img) => {
        if (!img) return "";
        return img.startsWith("http") ? img : `/${img.replace(/^\/?/, "")}`;
      };

      const image = normalizeImage(productRaw.image);
      const otherImages = productRaw.otherImages?.map(normalizeImage);

      setProduct({ ...productRaw, image, otherImages });
      setMainImage(image);
    }
  }, [productRaw]);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim() && reviewRating > 0) {
      setUserReviews([
        ...userReviews,
        { rating: reviewRating, comment: reviewText.trim() },
      ]);
      setReviewText("");
      setReviewRating(0);
    }
  };

  if (!product) return <p style={{ padding: "30px" }}>⚠️ Product not found.</p>;

  return (
    <div className="product-page">
      <div className="image-section">
        <div className="thumbnail-gallery">
          {[product.image, ...(product.otherImages || [])].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`thumb-${i}`}
              className={`thumbnail ${mainImage === img ? "active" : ""}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>

        <div
          className="main-image-container"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <img src={mainImage} alt="Main" className="main-image" />
          <div
            className="zoom-box"
            style={{
              backgroundImage: `url(${mainImage})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundSize: "200%",
              opacity: hovering ? 1 : 0,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      <div className="product-info">
        <h1>{product.brand}</h1>
        <p>{product.details}</p>
        <p>{product.description}</p>
        <p>
          <strong style={{ fontSize: "x-large" }}>Rs.{product.price}</strong>{" "}
          <span className="strike">Rs.{product.orgprice}</span>{" "}
          <span className="discount">({product.off}% off)</span>
        </p>

        <div className="action-buttons">
          <button onClick={() => addToCart?.(product)}>Add to Cart</button>
          <button onClick={() => addToWishlist?.(product)}>Add to Wishlist</button>
        </div>

        <div className="reviews">
          <h3>Customer Reviews</h3>

          {product.reviews?.map((r, i) => (
            <p key={`existing-${i}`}>
              ⭐️ {r.rating} — {r.comment}
            </p>
          ))}

          {userReviews.map((r, i) => (
            <p key={`user-${i}`}>
              {"⭐️".repeat(r.rating)} — {r.comment}
            </p>
          ))}

          <div className="review-input">
            <div className="star-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= reviewRating ? "active" : ""}`}
                  onClick={() => setReviewRating(star)}
                >
                  ★
                </span>
              ))}
            </div>

            <input
              type="text"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <button onClick={handleReviewSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}