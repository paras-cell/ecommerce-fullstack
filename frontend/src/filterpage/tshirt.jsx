import "./filterpage.css";
import { useState } from "react";
import Card from "../components/card.jsx";
import Filter from "../components/side_filters.jsx";
import UpperFilter from "../components/upper_filter.jsx";
import data from "../product_data/tshirt.jsx";

function tshirt() {
  const [selectedFilters, setSelectedFilters] = useState([]); // Store multiple filters
  const [sortedData, setSortedData] = useState(data); // State to store sorted data

  // Filter logic
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(value)) {
        return prevFilters.filter((filter) => filter !== value); // Remove the filter
      } else {
        return [...prevFilters, value]; // Add the filter
      }
    });
  };

  const filteredData = (products, filters) => {
    if (filters.length === 0) return products; // Return all products if no filters are applied
  
    return products.filter((product) => {
      const fields = {
        color: product.color.toLowerCase(),
        brand: product.brand.toLowerCase(),
        price: product.price,
        off: product.off,
        gender: product.gender.toLowerCase(),
      };
  
      // Prioritize filters: gender > brand > price > color > off
      const genderMatch = filters.includes(fields.gender); // Gender filter
      const brandMatch = filters.includes(fields.brand); // Brand filter
      const priceMatch = filters.some((filter) => {
        if (filter.includes("-")) {
          const [min, max] = filter.split("-").map(Number);
          return fields.price >= min && fields.price <= max; // Price range filter
        }
        return false;
      });
      const colorMatch = filters.includes(fields.color); // Dynamic color filter
      const offMatch = filters.includes(fields.off); // Off filter
  
      // Ensure all prioritized filters match 
      return (
        (!filters.some((f) => ["men", "women", "boy", "girl"].includes(f)) || genderMatch) &&
        (!filters.some((f) => ["highlander", "solestore"].includes(f))  || brandMatch) &&
        (!filters.some((f) => f.includes("-")) || priceMatch) &&
        (!filters.some((f) => ["white", "black" , "pink"].includes(f))|| colorMatch) &&
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
      sorted = [...data]; // Reset to original data
    }

    setSortedData(sorted); // Update state with sorted products
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
              <Card
                key={product.key}
                image={product.image}
                brand={product.brand}
                details={product.details}
                price={product.price}
                orgprice={product.orgprice}
                off={product.off}
                color={product.color}
                gender={product.gender}
              />
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

export default tshirt;