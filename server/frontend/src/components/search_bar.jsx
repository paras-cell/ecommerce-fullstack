import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Sample data: Replace with actual page links and titles
  const pages = [
    { title: "All Product", link: "/all" },
    { title: "Beauty Product", link: "/beauty" },
    { title: "Footware", link: "/footware" },
    { title: "Accessories", link: "/accessories" },
    { title: "Men ware", link: "/men" },
  ];

  function handleSearch(e) {
    const input = e.target.value;
    setSearch(input);

    // Filter suggestions based on input
    if (input.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = pages.filter((page) =>
        page.title.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }

  return (
    <div className="search" >
      <a className="search-iconbox">
        <span className="search-icon"></span>
      </a>
      <input
        value={search}
        onChange={handleSearch}
        className="search-text"
        placeholder="Search for product, brand and more"
      />

      {/* Dropdown Suggestions */}
      {suggestions.length > 0 && (
        <ul
          className="dropdown"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            listStyle: "none",
            margin: 0,
            padding: "8px 0",
            zIndex: 1000,
          }}
        >
          {suggestions.map((item, index) => (
            <li key={index} style={{ padding: "8px 16px" }}>
              <a href={item.link} style={{display: "block", textdecoration:" none",
              color: "rgb(51, 51, 51)", width: "100%",
}}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;