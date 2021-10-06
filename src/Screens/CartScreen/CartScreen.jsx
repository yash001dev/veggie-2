import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EmptyCart from "../../components/EmptyCart/EmptyCart";
import {
  addToCart,
  decreaseQty,
  orderPrices,
} from "../../redux/actions/cartActions";
import basket1 from "../../img/basket1.jpeg";
import basket2 from "../../img/basket2.jpeg";
import basket3 from "../../img/basket3.jpeg";
import axios from "axios";
import {checkBasketGift} from '../../Gift';
import { CartContainer } from "./Style";

const CartScreen = (props) => {
  const [basketDetail, setBasketDetail] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const [dataCounter, setDataCounter] = useState(false);

  const increaseItemQty = (product) => {
    dispatch(
      addToCart(
        product,
        product.p_id,
        product.unit_price,
        product.unit_name,
        product.unit_id,
        1
      )
    );
  };

  const decreaseItemQty = (product) => {
    dispatch(
      decreaseQty(
        product.p_id,
        product.unit_price,
        product.unit_name,
        product.unit_id
      )
    );
  };

  // order save
  const { cart } = useSelector((state) => state.addToCartReducer);
  const { user } = useSelector((state) => state.userLoginReducer);
  const history = useHistory();

  if (!Object.keys(user).length) {
    history.push("/login");
  }

  const { itemsPrice, deliveryPrice, taxPrice, totalPrice } = cart;

  var printtotal = itemsPrice;

  var hereData = useSelector((state) => state.addToCartReducer);

  var localCardData = JSON.parse(localStorage.getItem("cartUnitData5"));

  var sumArr = [];
  var filledArr = [];
  var pushArr = [];

  localCardData?.map((item) => {
    if (hereData.cart[item].length) {
      sumArr.push(hereData.cart[item]);
    }
  });

  const handleOrderPrice = () => {
    dispatch(orderPrices(itemsPrice, deliveryPrice, taxPrice, totalPrice));
    history.push("/place-order");
  };

  var date = String(new Date());
  var todayDate = date.split(" ");
  todayDate = todayDate[0] + " " + todayDate[1] + " " + todayDate[2];

  // var printCartData = [];

  // localCardData?.map((item) => {
  //   for (let i in hereData.cart[item]) {
  //     printCartData.push(hereData.cart[item]);
  //   }
  // });

  const sum = sumArr.reduce((a, b) => a + b, 0);
  var itemSum = 0;

  var grandtotal = printtotal + taxPrice + deliveryPrice;
  const  [getBasket,setBasket] = useState();

  useEffect(() =>{
    
      checkBasketGift(grandtotal,setBasket);
    
  },[grandtotal]);
  
  return (
    <>
      {sumArr.length === 0 ? (
        <EmptyCart name="Cart" />
      ) : (
        <CartContainer>
          <div className="cart-left">
            {sumArr?.map((itemOne) => {
              return itemOne?.map((item) => {
                return (
                  <div>
                    <div key={item.p_id} className="cart-inner-container">
                      <div className="cart-item-img">
                        <img src={item.img} alt="" />
                      </div>
                      <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p>{item.about}</p>

                        <button onClick={() => decreaseItemQty(item)}>-</button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => {
                            increaseItemQty(item);
                          }}
                        >
                          +
                        </button>
                        <h3>
                          (₹{item.unit_price}/{item.unit_name})
                        </h3>

                        <h3> Price: ₹{item.unit_total} </h3>
                      </div>
                      <div className="cart-item-delivery-details">
                        <p>Delivery by {todayDate}</p>
                      </div>
                    </div>
                  </div>
                );
              });
            })}
          </div>
          <div className="cart-right">
            <h3>PRICE DETAILS</h3>
            <hr />
            <p style={{ fontWeight: "bold", color: "#797878" }}>
              Items Price :{" "}
              <span style={{ color: "green" }}> ₹{printtotal}</span>
            </p>
            <p style={{ fontWeight: "bold", color: "#797878" }}>
              Delivery Charges :{" "}
              <span style={{ color: "green" }}>
                {deliveryPrice === 0 ? "Free" : "₹" + deliveryPrice}
              </span>
            </p>
            <p style={{ fontWeight: "bold", color: "#797878" }}>
              Tax Price :{" "}
              <span style={{ color: "green" }}>
                {" "}
                {taxPrice === 0 ? "No Tax" : "₹" + taxPrice}
              </span>
            </p>
            <h3 style={{ fontWeight: "bold", color: "black" }}>
              Grand Total of {""}
              {sumArr.length}
              {""} items : ₹{grandtotal}
            </h3>
            {getBasket !== undefined ? (
              <div
                style={{
                  display: "flex",
                  marginTop: "-1rem",
                  marginBottom: ".5rem",
                }}
              >
                <img
                  src={getBasket === 'b1' ? basket1 : getBasket === 'b2' ? basket2 : basket3}
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
            ):""}
            <button className="place-order-btn" onClick={handleOrderPrice}>
              Place Order
            </button>
          </div>
        </CartContainer>
      )}
    </>
  );
};
export default CartScreen;
