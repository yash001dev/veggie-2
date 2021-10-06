import React from "react";
import { CabContainer } from "./Style";
// import img1 from "../../img/cab-book.svg";
import img2 from "../../img/veggie-card-image.jpg";
import { useHistory } from "react-router-dom";

const CabCard = () => {
  const history = useHistory();

  const handleCabBook = () => {
    history.push("/book-cab");
  };

  return (
    <CabContainer>
      <div className="cab-left">
        <img src={img2} alt="truck-one" />
      </div>
      <div className="cab-right">
        <h1>Book a Cab</h1>
        <p>
          we are only and one stop solution who give facility to our audience to
          choose vegetables and fruits by their hand in ecommerce also,because
          our first priority is our customer's satisfaction.
        </p>
        <button onClick={handleCabBook}>Book a Cab</button>
      </div>
    </CabContainer>
  );
};

export default CabCard;
