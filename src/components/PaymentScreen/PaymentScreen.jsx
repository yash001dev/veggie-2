import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { savePaymentMethod } from "../../redux/actions/cartActions";
import { createOrder, createOrderData } from "../../redux/actions/orderActions";
import {
  ORDER_RESET,
  ORDER_CREATE_SUCCESS,
} from "../../redux/constants/orderConstants";
import { PaymentContainer } from "./Styles";
import cardIcon from "../../img/card-2.png";
import upiIcon from "../../img/upi.png";
import paytmIcon from "../../img/paytm.png";
import phonepayIcon from "../../img/phonepay.png";
import rsIcon from "../../img/rs.jpg";
import { CART_EMPTY } from "../../redux/constants/cartConstants";
import LoadingBox from "../LoadingBox";
import axios from "axios";

const PaymentScreen = ({ getBasket }) => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  var { cart } = useSelector((state) => state.addToCartReducer);

  var { shippingAddress, itemsPrice, deliveryPrice, taxPrice, totalPrice } =
    cart;

  var hereData = useSelector((state) => state.addToCartReducer);

  var localCardData = JSON.parse(localStorage.getItem("cartUnitData5"));

  var sumArr = [];

  localCardData?.map((item) => {
    if (hereData.cart[item].length) {
      sumArr.push(hereData.cart[item]);
    }
  });

  var orderArr = [];

  const basketNo =
    getBasket === "b1"
      ? 1
      : getBasket === "b2"
      ? 2
      : getBasket === "b3"
      ? 3
      : 0;

  sumArr?.map((item1) => {
    item1?.map((item2) => {
      let orderObj = {};
      orderObj["product_id"] = item2.p_id;
      orderObj["product_price"] = item2.unit_price;
      orderObj["price_unit_id"] = item2.unit_id;
      orderObj["order_quantity"] = item2.qty;
      orderArr.push(orderObj);
    });
  });

  const { success, orders } = useSelector((state) => state.orderReducer);

  deliveryPrice = 0;
  taxPrice = 0;
  totalPrice = itemsPrice + deliveryPrice + taxPrice;

  if (!paymentMethod) {
    history.push("/payment");
  }

  const handlePaymentMethod = (e) => {
    e.preventDefault();

    if (localStorage.getItem("isAddress") === "true") {
      if (JSON.parse(localStorage.getItem("itemsPrice")) > 0) {
        dispatch(savePaymentMethod(paymentMethod));

        let placedOrder = {};
        placedOrder["total"] = Number(totalPrice);
        placedOrder["item"] = orderArr;

        if (paymentMethod === "razorpay") {
          const orderAddress = shippingAddress?.find(
            (item) =>
              item.user_address_name ===
              localStorage.getItem("user_address_ref")
          );

          placedOrder["user_address_id"] = orderAddress.user_address_id
            ? orderAddress.user_address_id
            : 1;
          placedOrder["payment"] = 1;
          placedOrder["basket"] = basketNo;

          dispatch(createOrderData(placedOrder));

          // integration of razorpay

          setTimeout(() => {
            var options = {
              key: "rzp_test_mCQYP1VXS2KYbo",
              amount: Number(totalPrice) * 100,
              currency: "INR",
              name: "Veggie",
              description: "Test Transaction",
              image: "https://example.com/your_logo",
              order_id: localStorage.getItem("order_id_first"),
              handler: (response) => {
                setLoading(true);

                setTimeout(() => {
                  dispatch(
                    createOrder({
                      order_id: localStorage.getItem("order_id"),
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_order_id: localStorage.getItem("order_id_first"),
                      razorpay_signature: response.razorpay_signature,
                    })
                  );
                  setLoading(false);
                }, 5000);
                // setLoading(false);
              },
              prefill: {
                name: "Veggie User",
                email: "",
                contact: "",
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#3399cc",
              },
            };
            var rzp1 = new window.Razorpay(options);

            rzp1.open();
            rzp1.on("payment.failed", function (response) {
              alert(response.error.description);
            });
          }, 2000);
        } else {
          const orderAddress = shippingAddress?.find(
            (item) =>
              item.user_address_name ===
              localStorage.getItem("user_address_ref")
          );

          placedOrder["user_address_id"] = orderAddress.user_address_id
            ? orderAddress.user_address_id
            : 1;
          placedOrder["basket"] = basketNo;
          dispatch(createOrderData(placedOrder));
          // dispatch(createOrder(placedOrder));
        }
      } else {
        alert("Please Add Items to Your Cart");
      }
    } else {
      alert("Please Add Shipping Address");
    }
  };

  useEffect(() => {
    if (success) {
      history.push(`/your-order-his`);
      dispatch({ type: ORDER_RESET });
      dispatch({ type: CART_EMPTY });
    }
  }, [orders, history, success]);

  return (
    <>
      {loading && <LoadingBox />}
      <form onSubmit={handlePaymentMethod}>
        <PaymentContainer>
          <div className="payment-options">
            <input
              type="radio"
              id="cod"
              value="cod"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
              defaultChecked
              // required
            />
            <div className="pay-icon">
              <div className="icon-one">Cash on Delivery</div>
              <div className="icon-two">
                <img src={rsIcon} alt="rs" className="rsIcon" />
              </div>
            </div>
          </div>
          <br />
          <div className="payment-options">
            <input
              type="radio"
              id="razorpay"
              value="razorpay"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
              // required
            />
            <div className="pay-icon">
              <div className="icon-one">RazorPay</div>
              <div className="icon-two">
                <img src={cardIcon} alt="card" className="cardImg" />
                <img src={upiIcon} alt="upi" className="upiImg" />
                <img src={paytmIcon} alt="paytm" className="paytmImg" />
                <img
                  src={phonepayIcon}
                  alt="phonepay"
                  className="phonepayImg"
                />
              </div>
            </div>
          </div>
          <br />
          <div className="payment-options">
            <button type="submit">Make Payment</button>
          </div>
        </PaymentContainer>
      </form>
    </>
  );
};

export default PaymentScreen;
