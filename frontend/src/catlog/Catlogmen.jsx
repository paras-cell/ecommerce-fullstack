import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import './catlog.css';

const Catlogmen = forwardRef((props, ref) => {
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
        <div className="catlog"   ref={catlogreff}>
            <div className="catlog-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={catcantainreff}>
                <div className="list-container">
                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{color:"red"}} className="cate-info-link">Topwear</a> </li>
                            <li className="info"><a href="#" className="info-link">T-Shirts</a> </li>
                            <li className="info"><a href="#" className="info-link">Casual Shirts</a> </li>
                            <li className="info"><a href="#" className="info-link">Formal Shirts</a> </li>
                            <li className="info"><a href="#" className="info-link">Sweatshirts</a> </li>
                            <li className="info"><a href="#" className="info-link">Sweaters</a> </li>
                            <li className="info"><a href="#" className="info-link">Jackets</a> </li>
                            <li className="info"><a href="#" className="info-link">Blazers & Coats</a> </li>
                            <li className="info"><a href="#" className="info-link">Suits</a> </li>
                            <li className="info"><a href="#" className="info-link">Rain Jackets</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{color:"red"}}  className="cate-info-link">Indian & Festive Wear</a> </li>
                            <li className="info"><a href="#" className="info-link">Kurtas & Kurta Sets</a> </li>
                            <li className="info"><a href="#" className="info-link">Sherwanis</a> </li>
                            <li className="info"><a href="#" className="info-link">Nehru Jackets</a> </li>
                            <li className="info"><a href="#" className="info-link">Dhotis</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>
                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{color:"red"}} className="cate-info-link">Bottomwear</a> </li>
                            <li className="info"><a href="#" className="info-link">Jeans</a> </li>
                            <li className="info"><a href="#" className="info-link">Casual Trousers </a> </li>
                            <li className="info"><a href="#" className="info-link">Formal Trousers</a> </li>
                            <li className="info"><a href="#" className="info-link">Shorts</a> </li>
                            <li className="info"><a href="#" className="info-link">Track Pants & Joggers</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{color:"red"}} className="cate-info-link">Innerwear & Sleepwear</a> </li>
                            <li className="info"><a href="#" className="info-link">Briefs & Trunks</a> </li>
                            <li className="info"><a href="#" className="info-link">Boxers</a> </li>
                            <li className="info"><a href="#" className="info-link">Vests</a> </li>
                            <li className="info"><a href="#" className="info-link">Sleepwear & Loungewear</a> </li>
                            <li className="info"><a href="#" className="info-link">Thermals</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#"  style={{color:"red"}} className="cate-info-link">Plus Size</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{color:"red"}} className="cate-info-link">Footwear</a> </li>
                            <li className="info"><a href="#" className="info-link">Casual Shoes</a> </li>
                            <li className="info"><a href="#" className="info-link">Sports Shoes</a> </li>
                            <li className="info"><a href="#" className="info-link">Formal Shoes</a> </li>
                            <li className="info"><a href="#" className="info-link">Sneakers</a> </li>
                            <li className="info"><a href="#" className="info-link">Sandals & Floaters</a> </li>
                            <li className="info"><a href="#" className="info-link">Flip Flops</a> </li>
                            <li className="info"><a href="#" className="info-link">Socks</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{color:"red"}} className="cate-info-link">Personal Care & Grooming</a> </li>
                            <li className="info"><a href="#" style={{color:"red"}}  className="cate-info-link">Sunglasses & Frames</a> </li>
                            <li className="info"><a href="#" style={{color:"red"}}  className="cate-info-link">Watches</a> </li>  
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{color:"red"}} className="cate-info-link">Sports & Active Wear</a> </li>
                            <li className="info"><a href="#" className="info-link">Sports Shoes</a> </li>
                            <li className="info"><a href="#" className="info-link">Sports Sandals</a> </li>
                            <li className="info"><a href="#" className="info-link">Active T-Shirts</a> </li>
                            <li className="info"><a href="#" className="info-link">Track Pants & Shorts</a> </li>
                            <li className="info"><a href="#" className="info-link">Tracksuits</a> </li>
                            <li className="info"><a href="#" className="info-link">Jackets & Sweatshirts</a> </li>
                            <li className="info"><a href="#" className="info-link">Sports Accessories</a> </li>
                            <li className="info"><a href="#" className="info-link">Swimwear</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{color:"red"}} className="cate-info-link">Gadgets</a> </li>
                            <li className="info"><a href="#" className="info-link">Smart Wearables</a> </li>
                            <li className="info"><a href="#" className="info-link">Fitness Gadgets</a> </li>
                            <li className="info"><a href="#" className="info-link">Headphones</a> </li>
                            <li className="info"><a href="#" className="info-link">Speakers</a> </li>  
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{color:"red"}} className="cate-info-link">Fashion Accessories</a> </li>
                            <li className="info"><a href="#" className="info-link">Wallets</a> </li>
                            <li className="info"><a href="#" className="info-link">Belts</a> </li>
                            <li className="info"><a href="#" className="info-link">Perfumes & Body Mists</a> </li>
                            <li className="info"><a href="#" className="info-link">Trimmers</a> </li>
                            <li className="info"><a href="#" className="info-link">Deodorants</a> </li>
                            <li className="info"><a href="#" className="info-link">Ties, Cufflinks & Pocket Squares</a> </li>
                            <li className="info"><a href="#" className="info-link">Accessory Gift Sets</a> </li>
                            <li className="info"><a href="#" className="info-link">Caps & Hats</a> </li>
                            <li className="info"><a href="#" className="info-link">Mufflers, Scarves & Gloves</a> </li>
                            <li className="info"><a href="#" className="info-link">Phone Cases</a> </li>
                            <li className="info"><a href="#" className="info-link">Rings & Wristwear</a> </li>
                            <li className="info"><a href="#" className="info-link">Helmets</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{color:"red"}} className="cate-info-link">Bags & Backpacks</a> </li>
                            <li className="info"><a href="#" style={{color:"red"}} className="cate-info-link">Luggages & Trolleys</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>
                </div>
            </div>
        </div>
    );
});

export default Catlogmen;