import React, { useEffect } from "react";
import { AboutContainer } from "./Styles";
import aboutMain from "../../img/about-1.jpg";
import aboutSecondary from "../../img/about-4.jpg";
import { Link } from "react-router-dom";

const AboutScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AboutContainer>
      <div className="left-side">
        <img src={aboutMain} alt="aboutMain" className="img-main" />
        <img
          src={aboutSecondary}
          alt="aboutSecondary"
          className="img-secondary"
        />
      </div>
      <div className="right-side">
        <div className="right-sub">
          <h1>VEGGI 365</h1>
          <p>
            we are only and one stop solution who give facility to our audience
            to choose vegetables and fruits by their hand in ecommerce
            also,because our first priority is our customer's satisfaction.
          </p>
          <Link to="/" style={{ textDecoration: "none", color: "#4ac85d" }}>
            <button className="aboutbtn">Explore Veggi</button>
          </Link>
        </div>
      </div>
    </AboutContainer>
  );
};

export default AboutScreen;
