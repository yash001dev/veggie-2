import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_RESET,
} from "../constants/orderConstants";
import { CART_EMPTY } from "../constants/cartConstants";

import axios from "axios";

export const createOrderData = (orderData) => async (dispatch) => {
  dispatch({ type: ORDER_CREATE_REQUEST });

  try {
    
    const authAxios = axios.create({
      baseURL: "https://admin.veggi365.com/api",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    });

    // check id either cash or razorpay
    const response = await authAxios.post("/order", orderData);

    if (orderData.payment === 1) {
      localStorage.removeItem("order_id");
      localStorage.removeItem("order_id_first");
      localStorage.removeItem("order_id_second");
      localStorage.setItem("order_id", response.data.order_id);
      localStorage.setItem("order_id_first", response.data.payment.id);
      localStorage.setItem("order_id_second", response.data.payment.id);
      
    } else {
      if (response.data.status === "success") {
        const { data } = await authAxios.get("/order");

        setTimeout(() => {
          localStorage.removeItem("orders");
          localStorage.setItem("orders", JSON.stringify(data));
        }, 200);
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      }
      localStorage.removeItem("order_id");
      localStorage.removeItem("order_id_first");
      localStorage.removeItem("order_id_second");
      // localStorage.setItem("order_id_first", response.data.order_id);
      dispatch({ type: CART_EMPTY });
      JSON.parse(localStorage.getItem("cartUnitData5"))?.map((item) => {
        localStorage.removeItem(`${item}`);
      });
      localStorage.removeItem("itemsPrice");
      localStorage.removeItem("deliveryPrice");
      localStorage.removeItem("taxPrice");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");
      dispatch({ type: ORDER_RESET });
    }

  } catch (e) {}
};

export const createOrder = (payment) => async (dispatch) => {
  try {
    const authAxios = axios.create({
      baseURL: "https://admin.veggi365.com/api",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    });

    const res = await authAxios.post("/order/payment", payment);
    
    if(res.data.status === "success"){

      const { data } = await authAxios.get("/order");
  
          setTimeout(() => {
            localStorage.removeItem("orders");
            localStorage.setItem("orders", JSON.stringify(data));
          }, 200);
          dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      dispatch({ type: CART_EMPTY });
      JSON.parse(localStorage.getItem("cartUnitData5"))?.map((item) => {
        localStorage.removeItem(`${item}`);
      });
      localStorage.removeItem("itemsPrice");
      localStorage.removeItem("deliveryPrice");
      localStorage.removeItem("taxPrice");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");
      dispatch({ type: ORDER_RESET });
    }
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cancelOrder = (oid) => async (dispatch) => {
  try {
    const authAxios = axios.create({
      baseURL: "https://admin.veggi365.com/api",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    });

    await authAxios.patch("https://admin.veggi365.com/api/order/cancel", {
      order_id: oid,
    });

    dispatch({ type: CART_EMPTY });
    JSON.parse(localStorage.getItem("cartUnitData5"))?.map((item) => {
      localStorage.removeItem(`${item}`);
    });
    localStorage.removeItem("itemsPrice");
    localStorage.removeItem("deliveryPrice");
    localStorage.removeItem("taxPrice");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    dispatch({ type: ORDER_RESET });
  } catch (e) {}
};
