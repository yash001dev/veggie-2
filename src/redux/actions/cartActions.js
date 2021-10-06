import {
  ADD_TO_CART,
  DECREASE_QTY,
  SAVE_PAYMENT_METHOD,
  ORDER_PRICES,
  ADD_SHIPPING_ADDRESS,
  CREATE_CART_ARRAY,
  // UPDATE_SHIPPING_ADDRESS,
  // SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
import axios from "axios";

export const createCartArray = (unit_id_array) => (dispatch) => {
  dispatch({ type: CREATE_CART_ARRAY, payload: unit_id_array });
};

export const addToCart = (
  product,
  pid,
  unit_price,
  unit_name,
  unit_id,
  qty
) => {
  return (dispatch, getState) => {
    // const { userReducer: { user }} = getState();
    if (localStorage.getItem("loggedUser")) {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          p_id: pid,
          name: product.product_name,
          about: product.product_about,
          img: product.product_img,
          fresh_till: product.product_fresh_till,
          unit_price: Number(unit_price),
          qty: qty,
          unit_name: unit_name,
          unit_total: Number(unit_price),
          unit_id: Number(unit_id),
        },
      });
    } else {
      // window.location = "https://veggi365.com/login";
    }
  };
};

export const decreaseQty =
  (productId, unitPrice, unitName, unitId) => (dispatch, getState) => {
    // let localCartItems500,
    //   localCartItemsId500,
    //   localCartItems1,
    //   localCartItemsId1,
    //   localCartItems2,
    //   localCartItemsId2;

    // // increase milliseconds if localstorage have some issuues
    // setTimeout(() => {
    //   const {
    //     addToCartReducer: {
    //       cartItems500,
    //       cartItemsId500,
    //       cartItems1,
    //       cartItemsId1,
    //       cartItems2,
    //       cartItemsId2,
    //     },
    //   } = getState();

    //   localCartItems500 = cartItems500;
    //   localCartItemsId500 = cartItemsId500;
    //   localCartItems1 = cartItems1;
    //   localCartItemsId1 = cartItemsId1;
    //   localCartItems2 = cartItems2;
    //   localCartItemsId2 = cartItemsId2;
    // }, 200);

    // setTimeout(() => {
    //   localStorage.setItem("cartItems500", JSON.stringify(localCartItems500));
    //   localStorage.setItem(
    //     "cartItemsId500",
    //     JSON.stringify(localCartItemsId500)
    //   );
    //   localStorage.setItem("cartItems1", JSON.stringify(localCartItems1));
    //   localStorage.setItem("cartItemsId1", JSON.stringify(localCartItemsId1));
    //   localStorage.setItem("cartItems2", JSON.stringify(localCartItems2));
    //   localStorage.setItem("cartItemsId2", JSON.stringify(localCartItemsId2));
    // }, 200);
    dispatch({
      type: DECREASE_QTY,
      payload: {
        pid: productId,
        unitPrice: unitPrice,
        unitName: unitName,
        unitId: unitId,
      },
    });
  };

export const addShippingAddress =
  (val, address, pincode) => async (dispatch) => {
    try {
      const authAxios = axios.create({
        baseURL: "https://admin.veggi365.com/api",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("userToken")
          )}`,
        },
      });

      await authAxios.post("/useraddress", {
        address: [
          {
            user_address_name: val,
            full_address: address,
            city_name: "Rajkot",
            pincode: pincode,
          },
        ],
      });

      // set in localStorage

      setTimeout(async () => {
        const authAxiosTwo = axios.create({
          baseURL: "https://admin.veggi365.com/api",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("userToken")
            )}`,
          },
        });

        const { data } = await authAxiosTwo.get("/useraddress");

        // const filterAddress = data?.find(
        //   (item) =>
        //     item.user_address_name === localStorage.getItem("user_address_ref")
        // );
        dispatch({ type: ADD_SHIPPING_ADDRESS, payload: data.reverse() });
        // dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: filterAddress });

        // localStorage.setItem("shippingAddress", JSON.stringify(data[0]));
      }, 200);
    } catch (err) {
      // alert(err.message);
    }
  };

// export const updateShippingAddress =
//   (userAddressId, val, address, pincode) => async (dispatch) => {
//     try {
//       const authAxios = axios.create({
//         baseURL: "https://admin.veggi365.com/api",
//         headers: {
//           Authorization: `Bearer ${JSON.parse(
//             localStorage.getItem("userToken")
//           )}`,
//         },
//       });

//       await authAxios.patch("/useraddress", {
//         user_address_id: userAddressId,
//         user_address_name: val,
//         full_address: address,
//         pincode: pincode,
//         city_name: "Rajkot",
//       });

//       // set in localStorage

//       setTimeout(async () => {
//         const authAxiosTwo = axios.create({
//           baseURL: "https://admin.veggi365.com/api",
//           headers: {
//             Authorization: `Bearer ${JSON.parse(
//               localStorage.getItem("userToken")
//             )}`,
//           },
//         });

//         const { data } = await authAxiosTwo.get("/useraddress");
//         const filterAddress = data?.find(
//           (item) =>
//             item.user_address_name === localStorage.getItem("user_address_ref")
//         );

//         dispatch({ type: UPDATE_SHIPPING_ADDRESS, payload: data });
//         dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: filterAddress });
//       }, 200);
//     } catch (err) {
//       alert(err);
//     }
//   };

export const savePaymentMethod = (data) => async (dispatch) => {
  setTimeout(() => {
    localStorage.setItem("paymentMethod", JSON.stringify(data));
  }, 200);

  dispatch({ type: SAVE_PAYMENT_METHOD, payload: data });
};

export const orderPrices =
  (itemsPrice, deliveryPrice, taxPrice, totalPrice) => (dispatch) => {
    setTimeout(() => {
      localStorage.setItem("itemsPrice", JSON.stringify(itemsPrice));
      localStorage.setItem("deliveryPrice", JSON.stringify(deliveryPrice));
      localStorage.setItem("taxPrice", JSON.stringify(taxPrice));
      localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    }, 300);

    dispatch({
      type: ORDER_PRICES,
      payload: { itemsPrice, deliveryPrice, taxPrice, totalPrice },
    });
  };

export const addComment = (productId, commentText) => async (dispatch) => {
  try {
    const authAxios = axios.create({
      baseURL: "https://admin.veggi365.com/api",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    });

    await authAxios.post("/comment", {
      product_id: productId,
      comment: commentText,
    });
  } catch (err) {
    // alert(err);
  }
};
