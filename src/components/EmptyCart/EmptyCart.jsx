import React from "react";
import { Link } from "react-router-dom";
import emptyCartImg from "../../img/empty-cart.svg";
import { EmptyCartContainer } from "./Styles";

const EmptyCart = ({ name }) => {
  return (
    <EmptyCartContainer>
      <img src={emptyCartImg} alt="empty-cart" style={{ width: "15vw" }} />
      {
        name === "np" ? <h3>No Products Avialble</h3> : <h3>Your {name} is Empty</h3>
      }
      <Link to="/" className="empty-cart-btn">
        <button>Shop Now</button>
      </Link>
    </EmptyCartContainer>
  );
};

export default EmptyCart;
