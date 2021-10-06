import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { cancelOrder } from "../../redux/actions/orderActions";
import axios from "axios";
import EmptyOrders from "../EmptyOrders/EmptyOrders";
import LoadingBox from "../LoadingBox";
import cab from "../../img/cab.svg";
import basket1 from "../../img/basket1.jpeg";
import basket2 from "../../img/basket2.jpeg";
import basket3 from "../../img/basket3.jpeg";

function ProductOrder({ label, myCabOrder }) {
  const [orders, setOrders] = useState([]);
  const [soloorder, setSoloprder] = useState([]);
  const [add, setAdd] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const dispatch = useDispatch();

  const handleCancel = (oid) => {
    dispatch(cancelOrder(oid));
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      window.location.reload();
    }, 5000);

    // checkStatus(4);
  };

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
      const { data } = await authAxios.get("/order/all");
      setOrders(data.orderdata);
      setSoloprder(data.orderitem);
      setAdd(data.address);
    };
    fetchProducts();
  }, []);

  let myOrder = orders.filter((ord) => ord.user_id === user[0].user_id);
  const newOrder = myOrder.sort((a, b) => {
    return b.order_id - a.order_id;
  });
  const newCabOrder = myCabOrder.sort((a, b) => {
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
    } else if (sta === 6) {
      return "Order Pending";
    } 
  };

  // return label !== "my" ? myOrder.length : myCabOrder.length === 0 ? (
  //   <EmptyOrders lab={label === "my" ? "pro" : "cab"}/>
  // ) : (

  return label === "my" ? (
    newOrder.length === 0 ? (
      <EmptyOrders lab={label === "my" ? "pro" : "cab"} />
    ) : (
      newOrder?.map((ord, key) => {
        return (
          <>
            {loading && <LoadingBox />}
            <div className="myorder_card" key={key}>
              <div className="myorder_card_head">
                <div>
                  <div className="myorder_id">Order Id: {ord.order_id}</div>
                  <div className="myorder_id">
                    Date: {String(ord.created_at).substring(0, 10)}
                  </div>
                </div>
                <div className="myorder_add">
                  <div className="myorder_delivery_add">Delivery Address </div>
                  <div className="myorder_delivery_add_data">
                    {add
                      .filter(
                        (addId) => addId.user_address_id === ord.user_address_id
                      )
                      .map((ad) => {
                        return (
                          <div>
                            <div>{ad.full_address}</div>
                            <div>{ad.city_name}</div>
                            <div>{ad.pincode}</div>
                          </div>
                        );
                      })}
                  </div>{" "}
                </div>
              </div>
              <hr />
              {soloorder
                .filter((solo) => solo.order_id === ord.order_id)
                .map((solod, key) => {
                  return (
                    <div key={key} className="myorder_card_body_con">
                      <div className="myorder_card_body">
                        <div className="myorder_card_body_img">
                          <img
                            src={solod.product_img}
                            alt={solod.product_img}
                            className="myorder_card_body_img"
                          />
                        </div>
                        <div className="myorder_card_body_con">
                          <div
                            className="myorder_card_body_title"
                            style={{ marginBottom: ".3rem" }}
                          >
                            {solod.product_name}
                          </div>
                          <div
                            className="myorder_id"
                            style={{ marginBottom: ".3rem" }}
                          >
                            Unit: {solod.price_unit_name}
                          </div>
                          <div
                            className="myorder_card_body_qty"
                            style={{ marginBottom: ".3rem" }}
                          >
                            Total QTY: {solod.order_quantity}
                          </div>
                          <div className="myorder_card_body_price">
                            Price: ₹{solod.product_price}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
              <div className="myorder_delivery_footer">
                <div className="myorder_card_body_title">
                  Total: ₹{ord.order_total}
                </div>
                
                <div className="myorder_card_body_title">
                  Status: {checkStatus(ord.order_status)}
                  {ord.order_status === 0 ? (
                    <div
                      className="myorder_cancel_btn"
                      onClick={() => handleCancel(ord.order_id)}
                    >
                      Cancel
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {
                ord.basket !== 0 ? 
              
              <div style={{display:"flex",margin:".5rem 0 -1rem 0",alignItems:"center"}}>
              <img src={ord.basket === 1 ? basket1 : ord.basket === 2 ? basket2 : basket3} alt="Gift" style={{height:"4rem",width:"4rem"}}/>
              <p style={{fontWeight:"bold",color:"green",marginLeft:".5rem"}}>Congrats!! You Got a Gift</p>
            </div> : ""
            }
            </div>
          </>
        );
      })
    )
  ) : newCabOrder.length === 0 ? (
    <EmptyOrders lab={label === "my" ? "pro" : "cab"} />
  ) : (
    newCabOrder?.map((cabo, key) => {
      return (
        <div className="caborder_card" key={key}>
          <div className="caborder_cab_img">
            <img src={cab} alt="cab" className="caborder_cab_img_data" />
          </div>
          <div className="caborder_cab_body">
            <div className="myorder_id">Order Id: {cabo.cab_order_id}</div>
            <div className="myorder_id">
              Date: {String(cabo.created_at).substring(0, 10)}
            </div>
            <div className="caborder_cab_body_add">
              <div className="myorder_delivery_add">Delivery Address </div>
              <div className="myorder_delivery_add_data">
                {cabo.user_address + " " + cabo.user_pincode}
              </div>
            </div>
            <div className="myorder_card_body_title">
              Order Status: {checkStatus(cabo.cab_order_status)}
            </div>
          </div>
        </div>
      );
    })
  );
}

export default ProductOrder;
