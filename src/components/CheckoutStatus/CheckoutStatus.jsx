import React from "react";
import { CheckoutContainer } from "./Styled";

const CheckoutStatus = () => {
  return (
    <CheckoutContainer>
      <span>Shipping</span>
      <span>Payment</span>
      <span>Review</span>
    </CheckoutContainer>
  );
};

export default CheckoutStatus;
