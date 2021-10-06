import React, { useState, useEffect } from "react";
import axios from "axios";
import EmptyOrders from "../EmptyOrders/EmptyOrders";
import cab from "../../img/cab.svg";
import "./CabOrders.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cancelOrder } from "../../redux/actions/orderActions";
import { cancelCabOrder } from "../../redux/actions/cabActions";
import LoadingBox from "../LoadingBox";

function CabOrders() {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.userLoginReducer);
  const [loading, setLoading] = useState(false);
  const userr = JSON.parse(localStorage.getItem("loggedUser"));
  const history = useHistory();
  const dispatch = useDispatch();

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
  const newCabOrder = myOrder.sort((a, b) => {
    return b.cab_order_id - a.cab_order_id;
  });

  const checkStatus = (sta) => {
    if (sta === 0) {
      return "Order Pending";
    } else if (sta === 1) {
      return "Order Accepted";
    } else if (sta === 2) {
      return "Out For the Delivery";
    } else if (sta === 3) {
      return "Deliverd";
    } else if (sta === 4) {
      return "Cancelled";
    }else if (sta === 5) {
      return "Order Pending";
    }else if (sta === 6) {
      return "Order Pending";
    }
  };

  const handleCancel = (oid) => {
    dispatch(cancelCabOrder(oid, 4));
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      window.location.reload();
    }, 5000);
  };

  return (
    <div>
      {newCabOrder.length === 0 ? (
        <EmptyOrders lab="cab" />
      ) : (
        newCabOrder.map((cabo, key) => {
          return (
            <>
              {loading && <LoadingBox />}
              <div className="caborder_card" key={key}>
                <div className="caborder_cab_img">
                  <img src={cab} alt="cab" className="caborder_cab_img_data" />
                </div>
                <div className="caborder_cab_body">
                  <div className="myorder_id">
                    Order Id: {cabo.cab_order_id}
                  </div>
                  <div className="myorder_id">
                    Date: {String(cabo.created_at).substring(0, 10)}
                  </div>
                  <div className="caborder_cab_body_add">
                    <div className="myorder_delivery_add">
                      Delivery Address{" "}
                    </div>
                    <div className="myorder_delivery_add_data">
                      {cabo.user_address + " " + cabo.user_pincode}
                    </div>
                  </div>
                  <div className="myorder_card_body_title">
                    Order Status: {checkStatus(cabo.cab_order_status)}
                    {cabo.cab_order_status === 0 ? (
                      <div
                        className="myorder_cancel_btn"
                        onClick={() => handleCancel(cabo.cab_order_id)}
                      >
                        Cancel
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })
      )}
    </div>
  );
}

export default CabOrders;
