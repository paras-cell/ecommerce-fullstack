import "./upper_filter.css";


const UpperFilter = ({ details, handlesort }) => {
  return (
    <div className="upper_fill">
      <div className="navegoter">
        <a href="/">Home {"/"} </a>
        <a href="/clothing">Clothing {"/"}</a>
        <span>{details.pagename}</span>
      </div>
      <div className="con">
        <h3>{details.pagename}</h3>
        <select className="sort" onChange={handlesort}>
          <option value="original">Recommended</option>
          <option value="price: lower to higher">Price: lower to higher</option>
          <option value="price: higher to lower">Price: higher to lower</option>
        </select>
      </div>
    </div>
  );
};

export default UpperFilter;