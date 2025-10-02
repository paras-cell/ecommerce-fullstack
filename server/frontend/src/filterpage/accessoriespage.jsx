import "./filterpage.css";
import { useState } from "react";
import Card from "../components/card.jsx";
import Filter from "../components/side_filters.jsx";
import UpperFilter from "../components/upper_filter.jsx";
import accessories from "../product_data/accessories.jsx";

function beautypage() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortedData, setSortedData] = useState(accessories);

  // Filter logic
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(value)
        ? prevFilters.filter((filter) => filter !== value)
        : [...prevFilters, value]
    );
  };

  const filteredData = (products, filters) => {
    if (filters.length === 0) return products;

    return products.filter((product) => {
      const fields = {
        color: product.color.toLowerCase(),
        brand: product.brand.toLowerCase(),
        price: product.price,
        off: product.off,
        gender: product.gender.toLowerCase(),
      };

      const genderMatch = filters.includes(fields.gender);
      const brandMatch = filters.includes(fields.brand);
      const priceMatch = filters.some((filter) => {
        if (filter.includes("-")) {
          const [min, max] = filter.split("-").map(Number);
          return fields.price >= min && fields.price <= max;
        }
        return false;
      });
      const colorMatch = filters.includes(fields.color);
      const offMatch = filters.includes(fields.off);

      return (
        (!filters.some((f) => ["men", "women", "boy", "girl"].includes(f)) || genderMatch) &&
        (!filters.some((f) => ["highlander", "solestore"].includes(f)) || brandMatch) &&
        (!filters.some((f) => f.includes("-")) || priceMatch) &&
        (!filters.some((f) => ["white", "black", "pink"].includes(f)) || colorMatch) &&
        (!filters.some((f) => !isNaN(Number(f))) || offMatch)
      );
    });
  };

  // Sorting logic
  const productsort = (e) => {
    const sortOption = e.target.value.toLowerCase();
    let sorted = [...data];

    if (sortOption === "price: lower to higher") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price: higher to lower") {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      sorted = [...data];
    }

    setSortedData(sorted);
  };

  const result = filteredData(sortedData, selectedFilters);

  return (
    <div>
      <UpperFilter handlesort={productsort} details={{ pagename: "T-shirt" }} />
      <div style={{ display: "flex" }}>
        <Filter handlechange={handleChange} />
        {result.length ? (
          <div className="fill-container">
            {result.map((product) => (
              <Card key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="notfound">
            <img style={{ height: 250 }} src="./notfound.jpg" alt="Not Found" />
            <p>No products match your filter criteria.</p>
            <p>Or</p>
            <p>Try one filter at a time from every field</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default beautypage;