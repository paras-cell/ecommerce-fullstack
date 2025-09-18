import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import './catlog.css';

const Catlogwomen = forwardRef((props, ref) => {
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
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Indian & Fusion Wear</a> </li>
                            <li className="info"><a href="#" className="info-link">Kurtas & Suits</a> </li>
                            <li className="info"><a href="#" className="info-link">Kurtis, Tunics & Tops</a> </li>
                            <li className="info"><a href="#" className="info-link">Sarees</a> </li>
                            <li className="info"><a href="#" className="info-link">Ethnic Wear</a> </li>
                            <li className="info"><a href="#" className="info-link">Leggings, Salwars & Churidars</a> </li>
                            <li className="info"><a href="#" className="info-link">Skirts & Palazzos</a> </li>
                            <li className="info"><a href="#" className="info-link">Dress Materials</a> </li>
                            <li className="info"><a href="#" className="info-link">Lehenga Cholis</a> </li>
                            <li className="info"><a href="#" className="info-link">Dupattas & Shawlss</a> </li>
                            <li className="info"><a href="#" className="info-link">Jackets</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Belts, Scarves & More</a> </li>
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Watches & Wearables</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>
                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Western Wear</a> </li>
                            <li className="info"><a href="#" className="info-link">Dresses</a> </li>
                            <li className="info"><a href="#" className="info-link">Tops </a> </li>
                            <li className="info"><a href="#" className="info-link">Tshirts</a> </li>
                            <li className="info"><a href="#" className="info-link">Jeans</a> </li>
                            <li className="info"><a href="#" className="info-link">Shorts & Skirts</a> </li>
                            <li className="info"><a href="#" className="info-link">Co-ords</a> </li>
                            <li className="info"><a href="#" className="info-link">Playsuits</a> </li>
                            <li className="info"><a href="#" className="info-link">Jumpsuits</a> </li>
                            <li className="info"><a href="#" className="info-link">Shrugs</a> </li>
                            <li className="info"><a href="#" className="info-link">Sweaters & Sweatshirts</a> </li>
                            <li className="info"><a href="#" className="info-link">Jackets & Coats</a> </li>
                            <li className="info"><a href="#" className="info-link">Blazers & Waistcoats</a> </li>
                            <li className="info"><a href="#" className="info-link">Trousers & Capris</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Plus Size</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Maternity</a> </li>
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Sunglasses & Frames</a> </li>
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Footwear</a> </li>
                            <li className="info"><a href="#" className="info-link">Casual Shoes</a> </li>
                            <li className="info"><a href="#" className="info-link">Flats</a> </li>
                            <li className="info"><a href="#" className="info-link">Heels</a> </li>
                            <li className="info"><a href="#" className="info-link">Sports Shoes & Floaters</a> </li>
                            <li className="info"><a href="#" className="info-link">Boots</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Sports & Active Wear</a> </li>
                            <li className="info"><a href="#" className="info-link">Clothing</a> </li>
                            <li className="info"><a href="#" className="info-link">Footwear</a> </li>
                            <li className="info"><a href="#" className="info-link">Sports Accessories</a> </li>
                            <li className="info"><a href="#" className="info-link">Sports Equipment</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Lingerie & Sleepwear</a> </li>
                            <li className="info"><a href="#" className="info-link">Bra</a> </li>
                            <li className="info"><a href="#" className="info-link">Briefs</a> </li>
                            <li className="info"><a href="#" className="info-link">Active T-Shirts</a> </li>
                            <li className="info"><a href="#" className="info-link">Sleepwear & Loungewear</a> </li>
                            <li className="info"><a href="#" className="info-link">Swimwear</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Beauty & Personal Care</a> </li>
                            <li className="info"><a href="#" className="info-link">Makeup</a> </li>
                            <li className="info"><a href="#" className="info-link">Skincare</a> </li>
                            <li className="info"><a href="#" className="info-link">Premium Beauty</a> </li>
                            <li className="info"><a href="#" className="info-link">Lipsticks</a> </li>
                            <li className="info"><a href="#" className="info-link">Fragrances</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Gadgets</a> </li>
                            <li className="info"><a href="#" className="info-link">Smart Wearables</a> </li>
                            <li className="info"><a href="#" className="info-link">Fitness Gadgets</a> </li>
                            <li className="info"><a href="#" className="info-link">Headphones</a> </li>
                            <li className="info"><a href="#" className="info-link">Speakers</a> </li>
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Jewellery</a> </li>
                            <li className="info"><a href="#" className="info-link">Fashion Jewellery</a> </li>
                            <li className="info"><a href="#" className="info-link">Fine Jewellery</a> </li>
                            <li className="info"><a href="#" className="info-link">Earrings</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Backpacks</a> </li>
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Handbags, Bags & Wallets</a> </li>
                            <li className="info"><a href="#" style={{ color: "deeppink" }} className="cate-info-link">Luggages & Trolleys</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                </div>
            </div>
        </div>
    );
});

export default Catlogwomen;