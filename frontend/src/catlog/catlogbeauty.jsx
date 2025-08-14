import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import './catlog.css';

const Catlogbeauty = forwardRef((props, ref) => {
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
                            <li className="info"><a href="#" style={{ color: "blueviolet" }} className="cate-info-link">Makeup</a> </li>
                            <li className="info"><a href="#" className="info-link">Lipstick</a> </li>
                            <li className="info"><a href="#" className="info-link">Lip Gloss</a> </li>
                            <li className="info"><a href="#" className="info-link">Lip Liner</a> </li>
                            <li className="info"><a href="#" className="info-link">Mascara</a> </li>
                            <li className="info"><a href="#" className="info-link">Eyeliner</a> </li>
                            <li className="info"><a href="#" className="info-link">Kajal</a> </li>
                            <li className="info"><a href="#" className="info-link">Eyeshadow</a> </li>
                            <li className="info"><a href="#" className="info-link">Foundation</a> </li>
                            <li className="info"><a href="#" className="info-link">Primer</a> </li>
                            <li className="info"><a href="#" className="info-link">Concealer</a> </li>
                            <li className="info"><a href="#" className="info-link">Compact</a> </li>
                            <li className="info"><a href="#" className="info-link">Nail Polish</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>
                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{ color: "blueviolet" }} className="cate-info-link">Skincare, Bath & Body</a> </li>
                            <li className="info"><a href="#" className="info-link">Face Moisturiser</a> </li>
                            <li className="info"><a href="#" className="info-link">Cleanser </a> </li>
                            <li className="info"><a href="#" className="info-link">Masks & Peel</a> </li>
                            <li className="info"><a href="#" className="info-link">Sunscreen</a> </li>
                            <li className="info"><a href="#" className="info-link">Serum</a> </li>
                            <li className="info"><a href="#" className="info-link">Face Wash</a> </li>
                            <li className="info"><a href="#" className="info-link">Eye Cream</a> </li>
                            <li className="info"><a href="#" className="info-link">Lip Balm</a> </li>
                            <li className="info"><a href="#" className="info-link">Body Lotion</a> </li>
                            <li className="info"><a href="#" className="info-link">Body Wash</a> </li>
                            <li className="info"><a href="#" className="info-link">Body Scrub</a> </li>
                            <li className="info"><a href="#" className="info-link">Hand Cream</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{ color: "blueviolet" }} className="cate-info-link">Baby Care</a> </li>
                            <li className="info"><a href="#" style={{ color: "blueviolet" }} className="cate-info-link">Masks</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{ color: "blueviolet" }} className="cate-info-link">Haircare</a> </li>
                            <li className="info"><a href="#" className="info-link">Shampoo</a> </li>
                            <li className="info"><a href="#" className="info-link">Conditioner</a> </li>
                            <li className="info"><a href="#" className="info-link">Hair Cream</a> </li>
                            <li className="info"><a href="#" className="info-link">Hair Oil</a> </li>
                            <li className="info"><a href="#" className="info-link">Hair Gel</a> </li>
                            <li className="info"><a href="#" className="info-link">Hair Color</a> </li>
                            <li className="info"><a href="#" className="info-link">Hair Serum</a> </li>
                            <li className="info"><a href="#" className="info-link">Hair Accessory</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{ color: "blueviolet" }} className="cate-info-link">Fragrances</a> </li>
                            <li className="info"><a href="#" className="info-link">Perfume</a> </li>
                            <li className="info"><a href="#" className="info-link">Deodorant</a> </li>
                            <li className="info"><a href="#" className="info-link">Body Mist</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{ color: "blueviolet" }} className="cate-info-link">Appliances</a> </li>
                            <li className="info"><a href="#" className="info-link">Hair Straightener</a> </li>
                            <li className="info"><a href="#" className="info-link">Hair Dryer</a> </li>
                            <li className="info"><a href="#" className="info-link">Epilator</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{ color: "blueviolet" }} className="cate-info-link">Men's Grooming</a> </li>
                            <li className="info"><a href="#" className="info-link">Trimmers</a> </li>
                            <li className="info"><a href="#" className="info-link">Beard Oil</a> </li>
                            <li className="info"><a href="#" className="info-link">Hair Wax</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{ color: "blueviolet" }} className="cate-info-link">Beauty Gift & Makeup Set</a> </li>
                            <li className="info"><a href="#" className="info-link">Beauty Gift</a> </li>
                            <li className="info"><a href="#" className="info-link">Makeup Kit</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{ color: "blueviolet" }} className="cate-info-link">Premium Beauty</a> </li>
                            <li className="info"><a href="#" style={{ color: "blueviolet" }} className="cate-info-link">Wellness & Hygiene</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{ color: "blueviolet" }} className="cate-info-link">Top Brands</a> </li>
                            <li className="info"><a href="#" className="info-link">Lakme</a> </li>
                            <li className="info"><a href="#" className="info-link">Maybelline</a> </li>
                            <li className="info"><a href="#" className="info-link">LOreal</a> </li>
                            <li className="info"><a href="#" className="info-link">Philips</a> </li>
                            <li className="info"><a href="#" className="info-link">Bath & Body Works</a> </li>
                            <li className="info"><a href="#" className="info-link">THE BODY SHOP</a> </li>
                            <li className="info"><a href="#" className="info-link">Biotique</a> </li>
                            <li className="info"><a href="#" className="info-link">Mamaearth</a> </li>
                            <li className="info"><a href="#" className="info-link">MCaffeine</a> </li>
                            <li className="info"><a href="#" className="info-link">Nivea</a> </li>
                            <li className="info"><a href="#" className="info-link">Lotus Herbals</a> </li>
                            <li className="info"><a href="#" className="info-link">LOreal Professionnel</a> </li>
                            <li className="info"><a href="#" className="info-link">KAMA AYURVEDA</a> </li>
                            <li className="info"><a href="#" className="info-link">M.A.C</a> </li>
                            <li className="info"><a href="#" className="info-link">Forest Essentials</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                </div>
            </div>
        </div>
    );
});

export default Catlogbeauty;