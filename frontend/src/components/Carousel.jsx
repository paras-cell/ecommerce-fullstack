import "./Carousel.css";
import React, { useState , useRef,useEffect } from "react";

const Carousel = ({ data }) => {
  const [current, setCurrent] = useState(0);
  const { slides } = data;
  const ref = useRef(null)

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!slides || slides.length === 0) {
    return <div>No slides available</div>;
  }

  useEffect(() => {
    ref.current = setInterval(handleNext, 2000);
    return () => {
      clearInterval(ref.current);
    };
  }, []);

  return (
    <div className="Carousel-container"
      onMouseEnter={() => clearInterval(ref.current)}
      onMouseLeave={() => {ref.current = setInterval(handleNext, 2000);}}>
      <button className="left-button" onClick={handlePrev}>{">"}</button>
      <a href={data.slides[current].link} target="_blank" >
        <img
          src={data.slides[current].src}
          alt={data.slides[current].alt}
          className="Carousel-image"
        />
      </a>
      <button className="right-button" onClick={handleNext}>{"<"}</button>


      <div className="indicators">
        {data.slides.map((slide, index) => (
          <span
            key={index}
            className={`dot ${current === index ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
    

    
  );
};

export default Carousel;
