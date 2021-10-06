import React from "react";
import bannerImg from "../../img/banner.png";
import CabCard from "../CabCard/CabCard";
import { BannerContainer } from "./Style";

const Home = () => {
  return (
    <BannerContainer>
      <img className="banner-img" src={bannerImg} alt="banner-img" />
      <div className="cab-card">
        <CabCard />
      </div>
    </BannerContainer>
  );
};

export default Home;
