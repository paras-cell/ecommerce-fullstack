import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import './catlog.css';

const Catloghome = forwardRef((props, ref) => {
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
                            <li className="info"><a href="#" style={{color:"cornflowerblue"}} className="cate-info-link">Bed Linen & Furnishing</a> </li>
                            <li className="info"><a href="#" className="info-link">Bed Runners</a> </li>
                            <li className="info"><a href="#" className="info-link">Mattress Protectors</a> </li>
                            <li className="info"><a href="#" className="info-link">Bedsheets</a> </li>
                            <li className="info"><a href="#" className="info-link">Bedding Sets</a> </li>
                            <li className="info"><a href="#" className="info-link">Blankets, Quilts & Dohars</a> </li>
                            <li className="info"><a href="#" className="info-link">Pillows & Pillow Covers</a> </li>
                            <li className="info"><a href="#" className="info-link">Bed Covers</a> </li>
                            <li className="info"><a href="#" className="info-link">Diwan Sets</a> </li>
                            <li className="info"><a href="#" className="info-link">Chair Pads & Covers</a> </li>
                            <li className="info"><a href="#" className="info-link">Sofa Covers</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{color:"cornflowerblue"}}  className="cate-info-link">Flooring</a> </li>
                            <li className="info"><a href="#" className="info-link">Floor Runnerss</a> </li>
                            <li className="info"><a href="#" className="info-link">Carpets</a> </li>
                            <li className="info"><a href="#" className="info-link">Floor Mats & Dhurries</a> </li>
                            <li className="info"><a href="#" className="info-link">Door Mats</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>
                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{color:"cornflowerblue"}} className="cate-info-link">Bottomwear</a> </li>
                            <li className="info"><a href="#" className="info-link">Jeans</a> </li>
                            <li className="info"><a href="#" className="info-link">Casual Trousers </a> </li>
                            <li className="info"><a href="#" className="info-link">Formal Trousers</a> </li>
                            <li className="info"><a href="#" className="info-link">Shorts</a> </li>
                            <li className="info"><a href="#" className="info-link">Track Pants & Joggers</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{color:"cornflowerblue"}} className="cate-info-link">Innerwear & Sleepwear</a> </li>
                            <li className="info"><a href="#" className="info-link">Briefs & Trunks</a> </li>
                            <li className="info"><a href="#" className="info-link">Boxers</a> </li>
                            <li className="info"><a href="#" className="info-link">Vests</a> </li>
                            <li className="info"><a href="#" className="info-link">Sleepwear & Loungewear</a> </li>
                            <li className="info"><a href="#" className="info-link">Thermals</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#"  style={{color:"cornflowerblue"}} className="cate-info-link">Plus Size</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{color:"cornflowerblue"}} className="cate-info-link">Bath</a> </li>
                            <li className="info"><a href="#" className="info-link">Bath Towels</a> </li>
                            <li className="info"><a href="#" className="info-link">Hand & Face Towels</a> </li>
                            <li className="info"><a href="#" className="info-link">Beach Towels</a> </li>
                            <li className="info"><a href="#" className="info-link">Towels Set</a> </li>
                            <li className="info"><a href="#" className="info-link">Bath Rugs</a> </li>
                            <li className="info"><a href="#" className="info-link">Bath Robes</a> </li>
                            <li className="info"><a href="#" className="info-link">Bathroom Accessories</a> </li>
                            <li className="info"><a href="#" className="info-link">Shower Curtains</a> </li>
                            <div className="hrtag"></div>
                            <li className="info"><a href="#" style={{color:"cornflowerblue"}} className="cate-info-link">Lamps & Lighting</a> </li>
                            <li className="info"><a href="#" className="info-link">Floor Lamps</a> </li>
                            <li className="info"><a href="#" className="info-link">Ceiling Lamps</a> </li>
                            <li className="info"><a href="#" className="info-link">Table Lamps</a> </li>
                            <li className="info"><a href="#" className="info-link">Wall Lamps</a> </li>
                            <li className="info"><a href="#" className="info-link">Outdoor Lamps</a> </li>
                            <li className="info"><a href="#" className="info-link">String Lights</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{color:"cornflowerblue"}} className="cate-info-link">Furniture</a> </li>
                            <li className="info"><a href="#" style={{color:"cornflowerblue"}} className="cate-info-link">Home Gift Sets</a> </li>
                            <li className="info"><a href="#" style={{color:"cornflowerblue"}} className="cate-info-link">Kitchen & Table</a> </li>
                            <li className="info"><a href="#" className="info-link">Table Runners</a> </li>
                            <li className="info"><a href="#" className="info-link">Dinnerware & Serveware</a> </li>
                            <li className="info"><a href="#" className="info-link">Cups and Mugs</a> </li>
                            <li className="info"><a href="#" className="info-link">Bakeware & Cookware</a> </li>
                            <li className="info"><a href="#" className="info-link">Kitchen Storage & Tools</a> </li>
                            <li className="info"><a href="#" className="info-link">Bar & Drinkware</a> </li>
                            <li className="info"><a href="#" className="info-link">Table Covers & Furnishings</a> </li>  
                            <div className="hrtag"></div>
                        </ul>
                    </li>

                    <li className="list-info">
                        <ul className="list-info1">
                            <li className="info"><a href="#" style={{color:"cornflowerblue"}} className="cate-info-link">Storage</a> </li>
                            <li className="info"><a href="#" className="info-link">Bins</a> </li>
                            <li className="info"><a href="#" className="info-link">Hangers</a> </li>
                            <li className="info"><a href="#" className="info-link">Organisers</a> </li>
                            <li className="info"><a href="#" className="info-link">Hooks & Holders</a> </li>
                            <li className="info"><a href="#" className="info-link">Laundry Bags</a> </li>
                            <div className="hrtag"></div>
                        </ul>
                    </li>
                </div>
            </div>
        </div>
    );
});

export default Catloghome;