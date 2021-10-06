import {
  ADD_TO_CART,
  DECREASE_QTY,
  SAVE_PAYMENT_METHOD,
  CART_EMPTY,
  ORDER_PRICES,
  ADD_SHIPPING_ADDRESS,
  UPDATE_SHIPPING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
  CREATE_CART_ARRAY,
} from "../constants/cartConstants";
import produce from "immer";

// const local = JSON.parse(localStorage.getItem("cartUnitData"));
// var newLocalOne = [];

// var newLocalKeys = [];
// var newLocalValues = [];

// local?.map((item) => {
//   newLocalOne.push({
//     item: `cartItems${item}`,
//     id: `cartItemsId${item}`,
//   });

//   newLocalKeys.push(`cartItems${item}`);
//   newLocalValues.push(`cartItemsId${item}`);
// });

// // setTimeout(() => {
// localStorage.setItem("cartUnitData2", JSON.stringify(newLocalKeys));
// // }, 1000);

// var newArr = new Map();

// newLocalOne?.map((data) => {
//   newArr.set(
//     data.item,
//     localStorage.getItem(data.item)
//       ? JSON.parse(localStorage.getItem(data.item))
//       : []
//   );
//   newArr.set(
//     data.id,
//     localStorage.getItem(data.id)
//       ? JSON.parse(localStorage.getItem(data.id))
//       : []
//   );
// });

// var latestArr = Object.fromEntries(newArr);

// latestArr = {
//   ...latestArr,
//   cartUnitData: localStorage.getItem("cartUnitData5")
//     ? JSON.parse(localStorage.getItem("cartUnitData5"))
//     : [],
//   cartUnitDataId: localStorage.getItem("cartUnitDataId")
//     ? JSON.parse(localStorage.getItem("cartUnitDataId"))
//     : newLocalValues,
//   cartOnlyId: localStorage.getItem("cartOnlyId")
//     ? JSON.parse(localStorage.getItem("cartOnlyId"))
//     : local,
//   cartIdNew: localStorage.getItem("cartIdNew") ? JSON.parse("cartIdNew") : [],
//   paymentMethod: localStorage.getItem("paymentMethod")
//     ? JSON.parse(localStorage.getItem("paymentMethod"))
//     : "",
//   itemsPrice: localStorage.getItem("itemsPrice")
//     ? JSON.parse(localStorage.getItem("itemsPrice"))
//     : 0,
//   deliveryPrice: 0,
//   taxPrice: 0,
//   totalPrice: 0,
//   shippingAddress: [],
//   savedAddress: {},
// };

// var initialState = {};

export const addToCartReducer = produce((state = {}, action) => {
  switch (action.type) {
    case CREATE_CART_ARRAY: {
      // window.onload = function () {
      //   if (!localStorage.justOnce) {
      //     localStorage.setItem("justOnce", "true");
      //     setTimeout(() => {
      //       window.location.reload();
      //     }, 500);
      //   }
      // };

      let newLocalOnee = [];
      let newLocalKeyss = [];
      let newLocalValuess = [];

      action.payload?.map((item) => {
        newLocalOnee.push({
          item: `cartItems${item}`,
          // id: `cartItemsId${item}`,
        });
        newLocalKeyss.push(`cartItems${item}`);
        newLocalValuess.push(`cartItemsId${item}`);
      });

      localStorage.setItem("cartUnitData5", JSON.stringify(newLocalKeyss));
      // state.cartUnitData = newLocalKeyss;

      let newArr = new Map();

      newLocalOnee?.map((data) => {
        newArr.set(
          data.item,
          localStorage.getItem(data.item)
            ? JSON.parse(localStorage.getItem(data.item))
            : []
        );
        // newArr.set(
        //   data.id,
        //   localStorage.getItem(data.id)
        //     ? JSON.parse(localStorage.getItem(data.id))
        //     : []
        // );
      });

      var latestArrr = Object.fromEntries(newArr);

      const newStateArr = {
        ...latestArrr,
        cartUnitData: localStorage.getItem("cartUnitData5")
          ? JSON.parse(localStorage.getItem("cartUnitData5"))
          : [],
        // cartUnitDataId: localStorage.getItem("cartUnitDataId")
        //   ? JSON.parse(localStorage.getItem("cartUnitDataId"))
        //   : newLocalValues,
        // cartOnlyId: localStorage.getItem("cartOnlyId")
        //   ? JSON.parse(localStorage.getItem("cartOnlyId"))
        //   : local,
        // cartIdNew: localStorage.getItem("cartIdNew")
        //   ? JSON.parse("cartIdNew")
        //   : [],
        paymentMethod: localStorage.getItem("paymentMethod")
          ? JSON.parse(localStorage.getItem("paymentMethod"))
          : "",
        itemsPrice: localStorage.getItem("itemsPrice")
          ? JSON.parse(localStorage.getItem("itemsPrice"))
          : 0,
        deliveryPrice: localStorage.getItem("deliveryPrice")
        ? JSON.parse(localStorage.getItem("deliveryPrice"))
        : 0,
        taxPrice: localStorage.getItem("taxPrice")
        ? JSON.parse(localStorage.getItem("taxPrice"))
        : 0,
        totalPrice: localStorage.getItem("totalPrice")
        ? JSON.parse(localStorage.getItem("totalPrice"))
        : 0,
        shippingAddress: [],
        savedAddress: {},
      };

      state.cart = newStateArr;

      // localStorage.setItem("newLocalKeys", JSON.stringify(newLocalKeys));

      return;
    }

    case ADD_TO_CART: {
      const { p_id, qty, unit_price, unit_name, unit_id } = action.payload;

      var unitID = `cartItems${unit_id}`;

      Object.keys(state.cart)?.map((i) => {
        if (i === unitID) {
          if (state.cart[i].length) {
            const foundData = state.cart[i]?.find((item) => item.p_id === p_id);

            if (foundData !== undefined) {
              foundData.qty = foundData.qty + 1;
              foundData.unit_total = foundData.unit_total + unit_price;
            } else {
              state.cart[i].push({ ...action.payload });
            }
          } else {
            state.cart[i].push({ ...action.payload });
          }
        }
      });

      // setTimeout(() => {
      JSON.parse(localStorage.getItem("cartUnitData5"))?.map((cartdata) => {
        localStorage.setItem(
          `${cartdata}`,
          JSON.stringify(state.cart[cartdata])
        );
      });

      // state.cart.itemsPrice = itemtotal;
      // }, 1000);

      var tt = 0;

      JSON.parse(localStorage.getItem("cartUnitData5"))?.map((item) => {
        state.cart[item]?.map((item2) => {
          tt = tt + item2.unit_total;
        });
      });

      state.cart.itemsPrice = tt;
      localStorage.removeItem("itemsPrice");
      localStorage.setItem("itemsPrice", JSON.stringify(tt));

      return;
    }

    case DECREASE_QTY: {
      const { pid, unitPrice, unitName, unitId } = action.payload;

      // decrease qty

      var unitID = `cartItems${unitId}`;
      Object.keys(state.cart)?.map((i) => {
        if (i === unitID) {
          if (state.cart[i].length) {
            var foundData = state.cart[i]?.find((item) => item.p_id === pid);

            if (foundData !== undefined) {
              if (foundData.qty === 1) {
                state.cart[i] = state.cart[i].filter(
                  (item) => item.p_id !== pid
                );
              } else {
                foundData.qty = foundData.qty - 1;
                foundData.unit_total = foundData.unit_total - unitPrice;
              }
            }
          }
        }
      });

      // setTimeout(() => {
      JSON.parse(localStorage.getItem("cartUnitData5"))?.map((cartdata) => {
        localStorage.setItem(
          `${cartdata}`,
          JSON.stringify(state.cart[cartdata])
        );
      });

      // state.cart.itemsPrice = itemtotal;
      // }, 1000);

      var tt = 0;

      JSON.parse(localStorage.getItem("cartUnitData5"))?.map((item) => {
        state.cart[item]?.map((item2) => {
          tt = tt + item2.unit_total;
        });
      });

      state.cart.itemsPrice = tt;
      localStorage.removeItem("itemsPrice");
      localStorage.setItem("itemsPrice", JSON.stringify(tt));

      return;
    }

    case CART_EMPTY: {
      // JSON.parse(localStorage.getItem("cartUnitData5"))?.map((cartdata) => {
      //   localStorage.setItem(`${cartdata}`, JSON.stringify(state.cart[cartdata]));
      // });
      JSON.parse(localStorage.getItem("cartUnitData5"))?.map((item) => {
        localStorage.removeItem(`${item}`);
      });
      localStorage.removeItem("itemsPrice");
      localStorage.removeItem("deliveryPrice");
      localStorage.removeItem("taxPrice");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");
      localStorage.removeItem("isAddress");

      JSON.parse(localStorage.getItem("cartUnitData5"))?.map((data) => {
        state.cart[data] = [];
      });

      return;
    }

    case ADD_SHIPPING_ADDRESS: {
      state.cart.shippingAddress = action.payload;
      return;
    }

    case UPDATE_SHIPPING_ADDRESS: {
      state.cart.shippingAddress = action.payload;
      return;
    }

    case SAVE_SHIPPING_ADDRESS: {
      state.cart.savedAddress = action.payload;
      return;
    }

    case SAVE_PAYMENT_METHOD: {
      state.cart.paymentMethod = action.payload;
      return;
    }

    case ORDER_PRICES: {
      state.cart.itemsPrice = action.payload.itemsPrice;
      state.cart.deliveryPrice = action.payload.deliveryPrice;
      state.cart.taxPrice = action.payload.taxPrice;
      state.cart.totalPrice = action.payload.totalPrice;
      return;
    }

    default:
      return state;
  }
});
