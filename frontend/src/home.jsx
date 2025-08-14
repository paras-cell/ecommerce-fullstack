import React from "react";
import "./home.css";
import Carousel from "./components/Carousel.jsx";
import Data from "./data/slide1.json";
import Data2 from "./data/slide2.json";
import Data3 from "./data/slide3.json"


const Body = () => {
  return (
    <div className="main-container">
      
      <Carousel data={Data2} />
      <div className="ad-offer">
        <div className="offer"></div>
      </div>
      <div className="lable">
        <p className="lable-text"></p>bending brands
      </div>
      <Carousel data={Data3} />
      <div className="ad-offer">
        <span className="offer2"></span>
      </div>
      <div className="lable">
        <p className="lable-text"></p>Grand Global Brands
      </div>
      <Carousel data={Data} />
      <div className="lable">
        <p className="lable-text"></p>Shop By Category
      </div>

      <div className="category">
        <div className="back">
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate1-men.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate1-women.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate1-home.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate1-look.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate1-foot.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate1-kids.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate2-home.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate2-look.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate2-men.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate2-women-foot.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate2-women.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate3-foot.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate3-look.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate3-men.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate4-look.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate4-men.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate4-women-men.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate5-look.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate5-men.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate5-women.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate6-men.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate6-look.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate6-women.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate7-look.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate7-women.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate8-women.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate9-women.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate10-women.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate8-look.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate11-women.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate9-look.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate12-women.png" alt="" />
            </div>
          </div>
        </a>
        <a href="">
          <div className="catgory-image">
            <div className="hover">
              <img className="catimg" src="./cate10-look.png" alt="" />
            </div>
          </div>
        </a>
        </div>
        
      </div>
      <hr />
     
   
      

      
    </div>
    
  );
};

export default Body;
