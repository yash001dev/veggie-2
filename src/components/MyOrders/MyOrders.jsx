import React, { useState, useEffect } from "react";
import "./MyOrders.css";
import ProductOrder from "../ProductOrder/ProductOrder";
import CabOrders from "../CabOrders/CabOrders";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import RefreshIcon from "@material-ui/icons/Refresh";

function MyOrders() {
  const { user } = useSelector((state) => state.userLoginReducer);
  const history = useHistory();
  const [active, setActive] = useState("my");
  const [orders, setOrders] = useState([]);
  const userr = JSON.parse(localStorage.getItem("loggedUser"));

  const size = window.screen.width;

  if (!Object.keys(user).length) {
    history.push("/login");
  }

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
      const { data } = await authAxios.get("/caborder");
      setOrders(data);
    };
    fetchProducts();
  }, []);

  let myOrder = orders.filter((ord) => ord.user_id === userr[0].user_id);

  return (
    <div className="MyOrders_container">
      <div className="product_prders">
        <div
          className={
            size > 720
              ? "starproducts_head_title"
              : "starproducts_head_title_phone"
          }
        >
          {size > 720 ? (
            // <div
            //   style={{
            //     display: "flex",
            //     justifyContent: "space-between",
            //     alignItems: "center",
            //   }}
            // >
            <div style={{ display: "flex", alignItems: "center" }}>
              Your Orders
              <RefreshIcon
                style={{ marginLeft: ".5rem", cursor: "pointer" }}
                onClick={() => window.location.reload()}
              />
            </div>
          ) : (
            // </div>
            <div className="pill_class">
              <div
                className={`pill_class_my pill_class_active_left ${
                  active === "my" ? "pill_class_active" : ""
                }`}
                onClick={() => setActive("my")}
              >
                My Order
                <RefreshIcon
                  style={{ marginLeft: ".5rem", cursor: "pointer" }}
                  onClick={() => window.location.reload()}
                />
              </div>
              <div
                className={`pill_class_my pill_class_active_right ${
                  active === "cab" ? "pill_class_active" : ""
                }`}
                onClick={() => setActive("cab")}
              >
                Cab Order
                <RefreshIcon
                  style={{ marginLeft: ".5rem", cursor: "pointer" }}
                  onClick={() => window.location.reload()}
                />
              </div>
            </div>
          )}
        </div>
        <div className={size > 720 ? "starproducts_line" : ""} />
        <ProductOrder label={active} myCabOrder={myOrder} />
      </div>
      <div className={size > 720 ? "cab_orders" : "cab_orders_phone"}>
        <div className="starproducts_head_title">
          Cab Orders
          <RefreshIcon
            style={{ marginLeft: ".5rem", cursor: "pointer" }}
            onClick={() => window.location.reload()}
          />
        </div>
        <div className="starproducts_line" />
        <CabOrders />
      </div>
    </div>
  );
}

export default MyOrders;
