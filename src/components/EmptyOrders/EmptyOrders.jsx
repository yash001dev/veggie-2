import React from "react";
import emptyCartImg from "../../img/empty-cart.svg";
import cab from "../../img/cab-book.svg";
import { Link } from "react-router-dom";
import "./EmptyOrders.css";

function EmptyOrders({ lab }) {
  return (
    <div
      className={`${
        lab === "pro" ? "EmptyOrders_container" : "EmptyOrders_containerO"
      }`}
    >
      <div className="emptyorders_card">
        <div className="emptyorder_card_img">
          <img
            src={`${lab === "pro" ? emptyCartImg : cab}`}
            alt="EmptyOrderImage"
            className="emptyorder_card_img_data"
          />
        </div>
        <div className="emptyorder-card_btn">
          <Link
            to={`${lab === "pro" ? "/" : "/book-cab"}`}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <span className="empty_btn">
              {lab === "pro" ? "Shop Now" : "Book Now"}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmptyOrders;
