import "./card.css"
import { useState } from "react";
 function Card (card_data){

    const [hover,sethover] = useState("none");

   const handlehover=()=>{
    sethover(c=>"flex")
   }
   const handleleave=()=>{
    sethover(c=>"none")
   }

    return(
        <>
            
            <div className="card-container" onMouseEnter={handlehover} onMouseLeave={handleleave} >
            
            <a href="">
            <div className="card">
            <div className="card-hover-wishbutton" style={{display:hover}} >
                    <button className="wishbutton">❤️ Wishlist</button>
                    <span style={{marginLeft:12 ,fontSize:"14px" }}>Sizes:44</span>    
                    </div>

                <span className="rating"> 4⭐| 11</span>
                <img className="card-image" src={card_data.image} alt="" />               

                <div className="card-brandname">
                    <h2 style={{textTransform:"uppercase"}} >{card_data.brand}</h2>
                    <span>{card_data.details}</span>

                    <span  className="price"><b>Rs.{card_data.price} </b>
                        <span className="price-off" style={{ textDecoration: "line-through" }} >Rs.{card_data.orgprice}</span>
                        <span className="price-off" style={{ color:"orange" }}>({card_data.off}% off)</span>
                    </span>
                </div>
            </div>
            </a>
            </div>
            </>

                
        
    )
}
export default Card;