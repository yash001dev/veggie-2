import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PaymentScreen from "../../components/PaymentScreen/PaymentScreen";
import { PlaceOrderContainer } from "./Styles";
import { useSelector } from "react-redux";
import OrderCart from "../../components/OrderCart/OrderCart";
import ShippingNew from "../../components/ShippingNew/ShippingNew";
import { useHistory } from "react-router-dom";
import basket1 from "../../img/basket1.jpeg";
import basket2 from "../../img/basket2.jpeg";
import basket3 from "../../img/basket3.jpeg";
import { checkBasketGift } from "../../Gift";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const PlaceOrderScreen = () => {
  const [basketDetail, setBasketDetail] = useState([]);
  const { user } = useSelector((state) => state.userLoginReducer);
  const history = useHistory();

  if (!Object.keys(user).length) {
    history.push("/login");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const classes = useStyles();

  // expand accordingly
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { cart } = useSelector((state) => state.addToCartReducer);

  const { itemsPrice, deliveryPrice, taxPrice, totalPrice } = cart;
  const [getBasket, setBasket] = useState();

  
  useEffect(() => {
   
    checkBasketGift(totalPrice, setBasket);
  }, [totalPrice]);
 

  return (
    <PlaceOrderContainer>
      <div className="accordian-container" style={{ width: "100%" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          style={{ padding: "1rem 0", borderRadius: "5px" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Shipping Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ShippingNew expanded={expanded} setExpanded={setExpanded} />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <br />
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          style={{ padding: "1rem 0", borderRadius: "5px" }}
          // disabled={Object.keys(shippingAddress).length ? false : true}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Order Summary</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <OrderCart expanded={expanded} setExpanded={setExpanded} />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <br />
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          style={{ padding: "1rem 0", borderRadius: "5px" }}
          // disabled={Object.keys(shippingAddress).length ? false : true}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>Payment Options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <PaymentScreen getBasket={getBasket}/>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="price-summary-container">
        <h2>PRICE DETAILS</h2>
        <hr />
        <p style={{ fontWeight: "bold", color: "#797878" }}>
          Items Price : <span style={{ color: "green" }}>₹{itemsPrice}</span>
        </p>
        <p style={{ fontWeight: "bold", color: "#797878" }}>
          Delivery Price :{" "}
          <span style={{ color: "green" }}>
            {deliveryPrice === 0 ? "Free" : "₹" + deliveryPrice}
          </span>
        </p>
        <p style={{ fontWeight: "bold", color: "#797878" }}>
          Tax Price :{" "}
          <span style={{ color: "green" }}>
            {taxPrice === 0 ? "No Tax" : "₹" + taxPrice}
          </span>
        </p>
        <h3 style={{ color: "green" }}>Total Price : ₹{totalPrice}</h3>
        
        {getBasket !== undefined ? (
          <div
            style={{
              display: "flex",
              margin: "-1rem 0",
              alignItems: "center",
            }}
          >
            <img
              src={
                getBasket === "b1"
                  ? basket1
                  : getBasket === "b2"
                  ? basket2
                  : basket3
              }
              alt="Gift"
              style={{ height: "4rem", width: "4rem" }}
            />
            <p
              style={{
                fontWeight: "bold",
                color: "green",
                marginLeft: ".5rem",
              }}
            >
              Congrats!! You Got a Gift
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </PlaceOrderContainer>
  );
};

export default PlaceOrderScreen;
