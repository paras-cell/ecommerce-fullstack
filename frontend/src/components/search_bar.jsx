import { useState } from "react";

const search = () => {

  const [search,setsearch]=useState();

  function handlesearch(e){
    setsearch(e.target.value)
  }

  return (
    <div className="search">
      <a className="search-iconbox">
        <span className="search-icon"></span>
      </a>
      <input
        value={search}
        onChange={handlesearch}
        className="search-text"
        placeholder="search for product, brand and more"
      />
    </div>
  );
};
export default search;
