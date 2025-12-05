import "./filters.css"
import Input from "./input"

const side_filter=({handlechange})=>{
    return(
        <aside className="filters">
            <h1>FILTERS</h1>
            <div className="gender" >
                <h4>Gender</h4>
                <ul className="filter_list">
                    <li><Input handlechange={handlechange} value="MEN" title="MEN"  ></Input></li>
                    <li><Input handlechange={handlechange} value="WOMEN" title="WOMEN"  ></Input></li>
                    <li><Input handlechange={handlechange} value="BOY" title="BOY "  ></Input></li>
                    <li><Input handlechange={handlechange} value="GIRL" title="GIRL"  ></Input></li>
                </ul>
                </div>
            <div className="brand">
                <h4>Brand</h4>
                <ul className="filter_list">
                    <li><Input handlechange={handlechange} value="HIGHLANDER" title="HIGHLANDER"  ></Input></li>
                    <li><Input handlechange={handlechange} value="SOLESTORE" title="SoleStore" ></Input></li>
                    <li><Input handlechange={handlechange} value="HRX by Hrithik Roshan" title="HRX by Hrithik Roshan" ></Input></li>
                    <li><Input handlechange={handlechange} value="Tommy Hilfiger" title="Tommy Hilfiger" ></Input></li>
                    <li><Input handlechange={handlechange} value="SU.S. Polo Assn." title="U.S. Polo Assn." ></Input></li>
                </ul>
               
            </div>
            <div className="Price">
            <h4>Price Range</h4>
            <ul className="filter_list">
                <li><Input handlechange={handlechange} value="0-499" title="0-499" /></li>
                <li><Input handlechange={handlechange} value="499-999" title="499-999" /></li>
                <li><Input handlechange={handlechange} value="999-1499" title="999-1499" /></li>
                <li><Input handlechange={handlechange} value="1499-1999" title="1499-1999" /></li>
                <li><Input handlechange={handlechange} value="1999-2499" title="1999-2499+" /></li>
            </ul>
            </div>
            <div className="color">
            <h4>COLOR</h4>
                <ul className="filter_list">
                    <li><Input handlechange={handlechange} value="Black" title="Black"  ></Input></li>
                    <li><Input handlechange={handlechange} value="Blue" title="Blue"  ></Input></li>
                    <li><Input handlechange={handlechange} value="Green" title="Green"  ></Input></li>
                    <li><Input handlechange={handlechange} value="red" title="red"  ></Input></li>
                    <li><Input handlechange={handlechange} value="Orange" title="Orange"  ></Input></li>
                    <li><Input handlechange={handlechange} value="Pink" title="Pink"  ></Input></li>
                    <li><Input handlechange={handlechange} value="white" title="white"  ></Input></li>

                </ul>
            </div>
            <div className="Discount_Range">
            <h4>Discount Range</h4>
                <ul className="filter_list">
                    <li><Input handlechange={handlechange} value="10" title="10% and above"  ></Input></li>
                    <li><Input handlechange={handlechange} value="20" title="20% and above"  ></Input></li>
                    <li><Input handlechange={handlechange} value="30" title="30% and above"  ></Input></li>
                    <li><Input handlechange={handlechange} value="40" title="40% and above"  ></Input></li>
                    <li><Input handlechange={handlechange} value="50" title="50% and above"  ></Input></li>
                    <li><Input handlechange={handlechange} value="60" title="60% and above"  ></Input></li>
                    <li><Input handlechange={handlechange} value="70" title="70% and above"  ></Input></li>
                    <li><Input handlechange={handlechange} value="80" title="80% and above"  ></Input></li>
                    <li><Input handlechange={handlechange} value="90" title="90% and above"  ></Input></li>
                </ul>
            </div>
        </aside>
    )
}
export default side_filter;