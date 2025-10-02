import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import './catlog.css';

const Catlogkids = forwardRef((props, ref) => {
    const catlogreff = useRef(null);
    const catcantainreff = useRef(null);

   useImperativeHandle(ref, () => ({
           HoverEffect() {
               if (catlogreff.current) {
                   catlogreff.current.style.visibility = 'visible';
                   catlogreff.current.style.opacity = '1';
                   catlogreff.current.style.transition = "0.5s ease-in-out";
               }
               
                   if (catcantainreff.current) {
                       catcantainreff.current.style.visibility = 'visible';
                       catcantainreff.current.style.opacity = '1';
                       catlogreff.current.style.transition = "0.5s ease-in-out";
                   }
                
           },
           HoverEffectleave() {
               if (catlogreff.current) {
                   catlogreff.current.style.visibility = 'hidden';
                   catlogreff.current.style.opacity = '0';
               }
               if (catcantainreff.current) {
                   catcantainreff.current.style.visibility = 'hidden';
                   catcantainreff.current.style.opacity = '0';
               }
           },
       }));
      
   
       const handleMouseEnter = () => {
           if (catlogreff.current) {
               catlogreff.current.style.visibility = "visible";
               catlogreff.current.style.opacity = "1";
               
           }
           if (catcantainreff.current) {
               catcantainreff.current.style.visibility = "visible";
               catcantainreff.current.style.opacity = "1";
               
           }
           if (props.onHover) {
               props.onHover(true);
           }
       };
   
       const handleMouseLeave = () => {
           if (catlogreff.current) {
               catlogreff.current.style.visibility = "hidden";
               catlogreff.current.style.opacity = "0";
               catlogreff.current.style.transition = "0s";
           }
           if (catcantainreff.current) {
               catcantainreff.current.style.visibility = "hidden";
               catcantainreff.current.style.opacity = "0";
               catcantainreff.current.style.transition = "0s";
           }
           if (props.onHover) {
               props.onHover(false);
           }
       };

    return (
        <div className="catlog" ref={catlogreff}>
            <div className="catlog-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={catcantainreff}>
                <div className="list-container">
                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{color:"orange"}} className="cate-info-link">Boys Clothing</a> </li>
                            <li className="info"><a href="#" className="info-link">T-Shirts</a> </li>
                            <li className="info"><a href="#" className="info-link">Shirts</a> </li>
                            <li className="info"><a href="#" className="info-link">Shorts</a> </li>
                            <li className="info"><a href="#" className="info-link">Jeans</a> </li>
                            <li className="info"><a href="#" className="info-link">Trousers</a> </li>
                            <li className="info"><a href="#" className="info-link">Clothing Sets</a> </li>
                            <li className="info"><a href="#" className="info-link">Ethnic Wear</a> </li>
                            <li className="info"><a href="#" className="info-link">Track Pants & Pyjamas</a> </li>
                            <li className="info"><a href="#" className="info-link">Jacket, Sweater & Sweatshirts</a> </li>
                            <li className="info"><a href="#" className="info-link">Party Wear</a> </li>
                            <li className="info"><a href="#" className="info-link">Innerwear & Thermals</a> </li>
                            <li className="info"><a href="#" className="info-link">Nightwear & Loungewear</a> </li>
                            <li className="info"><a href="#" className="info-link">Value Packs</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>
                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{color:"orange"}} className="cate-info-link">Girls Clothing</a> </li>
                            <li className="info"><a href="#" className="info-link">Dresses</a> </li>
                            <li className="info"><a href="#" className="info-link">Tops </a> </li>
                            <li className="info"><a href="#" className="info-link">Tshirts</a> </li>
                            <li className="info"><a href="#" className="info-link">Clothing Sets</a> </li>
                            <li className="info"><a href="#" className="info-link">Lehenga choli</a> </li>
                            <li className="info"><a href="#" className="info-link">Kurta Sets</a> </li>
                            <li className="info"><a href="#" className="info-link">Party wear</a> </li>
                            <li className="info"><a href="#" className="info-link">Dungarees & Jumpsuits</a> </li>
                            <li className="info"><a href="#" className="info-link">Skirts & shorts</a> </li>
                            <li className="info"><a href="#" className="info-link">Tights & Leggings </a> </li>
                            <li className="info"><a href="#" className="info-link">Jeans, Trousers & Capris </a> </li>
                            <li className="info"><a href="#" className="info-link">Jacket, Sweater & Sweatshirts </a> </li>
                            <li className="info"><a href="#" className="info-link">Innerwear & Thermals </a> </li>
                            <li className="info"><a href="#" className="info-link">Nightwear & Loungewear </a> </li>
                            <li className="info"><a href="#" className="info-link">Value Packs </a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{color:"orange"}} className="cate-info-link">Footwear</a> </li>
                            <li className="info"><a href="#" className="info-link">Casual Shoes</a> </li>
                            <li className="info"><a href="#" className="info-link">Sports Shoes</a> </li>
                            <li className="info"><a href="#" className="info-link">Formal Shoes</a> </li>
                            <li className="info"><a href="#" className="info-link">Flats</a> </li>
                            <li className="info"><a href="#" className="info-link">Heels</a> </li>
                            <li className="info"><a href="#" className="info-link">School Shoes</a> </li>
                            <li className="info"><a href="#" className="info-link">Sandals & Floaters</a> </li>
                            <li className="info"><a href="#" className="info-link">Flip Flops</a> </li>
                            <li className="info"><a href="#" className="info-link">Socks</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{color:"orange"}} className="cate-info-link">Toys & Games</a> </li>
                            <li className="info"><a href="#" className="info-link">Learning & Development</a> </li>
                            <li className="info"><a href="#" className="info-link">Activity Toys</a> </li>
                            <li className="info"><a href="#" className="info-link">Soft Toys</a> </li>
                            <li className="info"><a href="#" className="info-link">Action Figure / Play set</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{color:"orange"}} className="cate-info-link">Infants</a> </li>
                            <li className="info"><a href="#" className="info-link">Bodysuits</a> </li>
                            <li className="info"><a href="#" className="info-link">Rompers & Sleepsuits</a> </li>
                            <li className="info"><a href="#" className="info-link">Clothing Sets</a> </li>
                            <li className="info"><a href="#" className="info-link">Tshirts & Tops</a> </li>
                            <li className="info"><a href="#" className="info-link">Dresses</a> </li>
                            <li className="info"><a href="#" className="info-link">Bottom wear </a> </li>
                            <li className="info"><a href="#" className="info-link">Winter Wear</a> </li>
                            <li className="info"><a href="#" className="info-link">Innerwear & Sleepwear</a> </li>
                            <li className="info"><a href="#" className="info-link">Infant Care</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{color:"orange"}} className="cate-info-link">Home & Bath</a> </li>
                            <li className="info"><a href="#" style={{color:"orange"}} className="cate-info-link">Personal Care</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{color:"orange"}} className="cate-info-link">Kids Accessories</a> </li>
                            <li className="info"><a href="#" className="info-link">Bags & Backpacks</a> </li>
                            <li className="info"><a href="#" className="info-link">Watches</a> </li>
                            <li className="info"><a href="#" className="info-link">Jewellery & Hair accessory</a> </li>
                            <li className="info"><a href="#" className="info-link">Sunglasses</a> </li>
                            <li className="info"><a href="#" className="info-link">Masks & Protective Gears</a> </li>
                            <li className="info"><a href="#" className="info-link">Caps & Hats</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{color:"orange"}} className="cate-info-link">Brands</a> </li>
                            <li className="info"><a href="#" className="info-link">H&M</a> </li>
                            <li className="info"><a href="#" className="info-link">Max Kids</a> </li>
                            <li className="info"><a href="#" className="info-link">Pantaloons</a> </li>
                            <li className="info"><a href="#" className="info-link">United Colors Of Benetton Kids</a> </li>
                            <li className="info"><a href="#" className="info-link">YK</a> </li>
                            <li className="info"><a href="#" className="info-link">U.S. Polo Assn. Kids</a> </li>
                            <li className="info"><a href="#" className="info-link">Mothercare</a> </li>
                            <li className="info"><a href="#" className="info-link">HRX</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>
                </div>
            </div>
        </div>
    );
});

export default Catlogkids;