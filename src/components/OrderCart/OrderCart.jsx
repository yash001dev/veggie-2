import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addToCart,
  decreaseQty,
  orderPrices,
} from "../../redux/actions/cartActions";
import { CartContainer } from "./Styles";

const OrderCart = ({ expanded, setExpanded }) => {
  const dispatch = useDispatch();

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

  var { itemsPrice, deliveryPrice, taxPrice, totalPrice } = cart;

  deliveryPrice = 0;
  taxPrice = 0;
  totalPrice = itemsPrice + deliveryPrice + taxPrice;

  useEffect(() => {
    dispatch(orderPrices(itemsPrice, deliveryPrice, taxPrice, totalPrice));
  }, [itemsPrice, deliveryPrice, taxPrice, totalPrice, dispatch]);

  var hereData = useSelector((state) => state.addToCartReducer);

  var localCardData = JSON.parse(localStorage.getItem("cartUnitData5"));

  var sumArr = [];

  localCardData?.map((item) => {
    if (hereData.cart[item].length) {
      sumArr.push(hereData.cart[item]);
    }
  });

  const handleOrderPrice = () => {
    setExpanded("panel3");
  };

  var date = String(new Date());
  var todayDate = date.split(" ");
  todayDate = todayDate[0] + " " + todayDate[1] + " " + todayDate[2];

  return (
    <>
      {sumArr.length === 0 ? (
        <div>Cart is Empty</div>
      ) : (
        <CartContainer>
          <div className="cart-container">
            <h2>My Orders</h2>
            <hr />
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

                          <button onClick={() => decreaseItemQty(item)}>
                            -
                          </button>
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
              <button
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "#50c85e",
                  color: "white",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  padding: "0.4rem 1rem",
                  width: "100%",
                  cursor: "pointer",
                }}
                onClick={handleOrderPrice}
              >
                Continue
              </button>
            </div>
          </div>
        </CartContainer>
      )}
    </>
  );
};

export default OrderCart;
