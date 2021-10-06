import React, { useState, useEffect } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import "./Footer.css";
import play from "../../img/playstore.svg";
import app from "../../img/appstore.svg";
import axios from "axios";
import { Link } from "react-router-dom";

function Footer() {
  const [cata, setCata] = useState();

  useEffect(() => {
    const authAxios = axios.create({
      baseURL: "https://admin.veggi365.com/api",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    });

    const fetchProducts = async () => {
      const { data } = await authAxios.get("/product/category");
      setCata(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="footer_container">
      <div className="footer_con">
        <div className="footer_regular">
          <div className="footer_categories">
            <div className="cata-inner">
              <h4>CATEGORIES</h4>
              <div className="footer_line" />
              {cata?.slice(0, 5).map((cat, key) => {
                return (
                  <ul key={key}>
                    <Link
                      to={`/products/${cat.category_id}/${cat.category_name}`}
                      style={{
                        textDecoration: "none",
                        color: "#929a9a",
                      }}
                    >
                      <li>{cat.category_name}</li>
                    </Link>
                  </ul>
                );
              })}
            </div>
          </div>
          <div className="footer_buy_with_us">
            <div className="footer_categories_1">
              <h4>BUY WITH US</h4>
              <div className="footer_line" />
              <ul>
                <li>
                  <Link
                    to="aboutus"
                    style={{
                      textDecoration: "none",
                      color: "#929a9a",
                    }}
                  >
                    About us
                  </Link>
                </li>
                <li>Contact Us</li>
                <li>Services</li>
                <li>
                  <Link
                    style={{ listStyle: "none", color: "#929a9a" }}
                    to="/privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>FAQs</li>
              </ul>
            </div>
          </div>
          <div className="footer_about">
            <div className="footer_categories_1">
              <h4>ABOUT</h4>
              <div className="footer_line" />
              <ul>
                <li style={{ textAlign: "justify" }}>
                  we are only and one stop solution who give facility to our
                  audience to choose vegetables and fruits by their hand in ecommerce also,because our first priority is our customer's
                  satisfaction.
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_contact">
            <div className="footer_categories_1">
              <h4>CONNECT US</h4>
              <div className="footer_line" />
              <ul>
                <li
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/veggi_365/",
                      "_blank"
                    )
                  }
                >
                  <InstagramIcon
                    style={{ marginRight: "3", color: "fff", fontSize: 30 }}
                  />
                  Instagram
                </li>
                <li
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/Veggi365-109681551394888",
                      "_blank"
                    )
                  }
                >
                  <FacebookIcon
                    style={{ marginRight: "3", color: "fff", fontSize: 30 }}
                  />
                  Facebook
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer_copy">
          <div className="copyright common_flex" style={{ marginLeft: "2rem" }}>
            ©Copyright 2021 VEGGI365
          </div>

          <div className="play common_flex" style={{ marginRight: "2rem" }}>
            <a href="ab" target="_blank">
              <img
                src={play}
                alt=""
                style={{ height: "2.5rem" }}
                className="playImage"
              />
            </a>
            <a href="ab" target="_blank">
              <img src={app} alt="" style={{ height: "2.5rem" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
