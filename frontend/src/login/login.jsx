import "./login.css";
import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const login= forwardRef((props, ref) => {

    const logreff = useRef(null);

     useImperativeHandle(ref, () => ({
            HoverEffect() {
                if (logreff.current) {
                    logreff.current.style.visibility = 'visible';
                    logreff.current.style.opacity = '1';
                    logreff.current.style.transition = "0.5s ease-in-out";
                }
            },
            HoverEffectleave() {
                if (logreff.current) {
                    logreff.current.style.visibility = 'hidden';
                    logreff.current.style.opacity = '0';
                }
            },
        }));

       function HoverEffect() {
            if (logreff.current) {
                logreff.current.style.visibility = 'visible';
                logreff.current.style.opacity = '1';
                logreff.current.style.transition = "0.5s ease-in-out";
            }
            if (props.onHover) {
                props.onHover(true);
            }
        }
       function HoverEffectleave() {
            if (logreff.current) {
                logreff.current.style.visibility = 'hidden';
                logreff.current.style.opacity = '0';
                logreff.current.style.transition = "0.3s";
            }
            if (props.onHover) {
                props.onHover(false);
            }
        }

    return(
        <div className="profile-container" ref={logreff} onMouseEnter={HoverEffect} onMouseLeave={HoverEffectleave} >
            <div className="login-button-dis">
                <h3>Welcome</h3>
                <span>To access account and manage order</span>
                <a href="/Login"><button className="login-button">login/signup</button></a>
            </div>
            <div className="hrtag"></div>
            <div className="user-tools">
                <ul className="tools">
                    <li className="tool"><a href="">order</a></li>
                    <li className="tool"><a href="">Wishlist</a></li>
                    <li className="tool"><a href="">giftcard</a></li>
                    <li className="tool"><a href="">contact us</a></li>
                    <div className="hrtag"></div>
                    <li className="tool"><a href="">coupons</a></li>
                    <li className="tool"><a href="">saved coupons</a></li>
                    <li className="tool"><a href="">saved address</a></li>
                </ul>
            </div>
        </div>
    )
})

export default login;