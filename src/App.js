import React, { useEffect, useState } from "react";
import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import AboutScreen from "./Screens/AboutScreen/AboutScreen";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import PrimaryNav from "./components/PrimaryNav/PrimaryNav";
import SecondaryNav from "./components/SecondaryNav/SecondaryNav";
import CartScreen from "./Screens/CartScreen/CartScreen";
import PaymentScreen from "./components/PaymentScreen/PaymentScreen";
import SoloProduct from "./components/SoloProduct/SoloProduct";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen/PlaceOrderScreen";
import AllProducts from "./components/AllProducts/AllProducts";
import MyOrders from "./components/MyOrders/MyOrders";
import CabScreen from "./Screens/CabScreen/CabScreen";
import UpdatePage from "./components/UpdatePage/UpdatePage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createCartArray } from "./redux/actions/cartActions";
import SignUpPageOtp from "./components/SignUpPageForm/SignUpPageOtp";
import PrivacyPolicy from "./components/Privacypolicy/PrivacyPolicy";

function App() {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const [Price, setPrice] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // document.addEventListener("contextmenu", function (e) {
    //   e.preventDefault();
    // });

    // document.onkeydown = function (e) {
    //   if (e.ctrlKey && e.shiftKey && e.keyCode === "I".charCodeAt(0)) {
    //     return false;
    //   }
    // };

    const authAxios = axios.create({
      baseURL: "https://admin.veggi365.com/api",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    });

    const fetchProducts = async () => {
      const { data } = await authAxios.get("/product/price");
      setPrice(data);
    };

    fetchProducts();
  }, []);

  var arr = [];

  Price?.map((p) => {
    if (arr.includes(p.price_unit_id)) {
      return;
    } else {
      arr.push(p.price_unit_id);
    }
  });
  localStorage.setItem("cartUnitData", JSON.stringify(arr.sort()));

  dispatch(createCartArray(arr.sort()));

  return (
    <>
      <Router>
        <PrimaryNav />
        <SecondaryNav setToggle={setToggle} toggle={toggle} />
        <Switch>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/signup" component={SignupPage} exact />
          <Route path="/aboutus" component={AboutScreen} exact />
          <Route path="/cart" component={CartScreen} exact />
          <Route path="/verify-otp" component={SignUpPageOtp} exact />
          <Route path="/privacy-policy" component={PrivacyPolicy} exact />
          <Route path="/payment" component={PaymentScreen} exact />
          <Route path="/product/:pid" component={SoloProduct} exact />
          <Route path="/place-order" component={PlaceOrderScreen} exact />
          <Route
            path="/products/:catID/:catName"
            component={AllProducts}
            exact
          />
          <Route path="/your-order-his" component={MyOrders} exact />
          <Route path="/update-profile" component={UpdatePage} exact />
          <Route path="/book-cab" component={CabScreen} exact />
          <Redirect to="/" />
        </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;
