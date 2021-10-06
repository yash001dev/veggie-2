import React, { useState } from "react";
import { PrimaryNavContainer } from "./Styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Bagde from "@material-ui/core/Badge";
import { userLogout } from "../../redux/actions/userActions";
import UpdateIcon from "@material-ui/icons/Update";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import veggieLogo from "../../img/veggie-logo.svg";
import SearchBox from "../SearchBox/SearchBox";

const PrimaryNav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLoginReducer);

  var hereData = useSelector((state) => state.addToCartReducer);

  var localCardData = JSON.parse(localStorage.getItem("cartUnitData5"));
  var sumArr = [];
  hereData.cart &&
    localCardData?.map((item) => {
      if (hereData.cart[item].length) {
        hereData.cart[item]?.map((item2) => {
          sumArr.push(hereData.cart[item]);
        });
      }
    });

  const [profileOptions, setProfileOptions] = useState(false);

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <PrimaryNavContainer>
      <div className="nav-logo">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <img
            src={veggieLogo}
            alt="logo"
            style={{ width: "6vw", padding: ".5rem" }}
          />
        </Link>
      </div>
      <div className="nav-items">
        <div className="primary_serach_box">
          <SearchBox />
        </div>

        <div className="nav-links">
          <Link
            to={Object.keys(user).length ? "" : "/login"}
            className="user-profile"
            onClick={() => {
              Object.keys(user).length && setProfileOptions(!profileOptions);
            }}
          >
            <PersonIcon style={{ marginRight: ".3rem" }} />
            {Object.keys(user).length ? "Hello, " + user.user_name : "Login"}
            <div
              className={
                Object.keys(user).length
                  ? "profile-options"
                  : "no-profile-options"
              }
            >
              <p
                style={{
                  borderBottom: "1px solid lightgray",
                  // textAlign: "center",
                }}
              >
                <Link
                  to="/update-profile"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <UpdateIcon style={{ marginRight: "1rem" }} />
                  Update Password
                </Link>
              </p>

              <p
                style={{
                  borderBottom: "1px solid lightgray",
                  // textAlign: "center",
                }}
              >
                <Link
                  to="/your-order-his"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ShoppingBasketIcon style={{ marginRight: "1rem" }} />
                  Your Orders
                </Link>
              </p>
              <p onClick={handleLogout}>
                <ExitToAppIcon style={{ marginRight: "1rem" }} /> Logout Here
              </p>
            </div>
          </Link>

          <Link
            to={Object.keys(user).length ? "/cart" : "/login"}
            className="nav-specific-link"
          >
            <Bagde
              badgeContent={sumArr.length}
              color="error"
              style={{
                cursor: "pointer",
                marginRight: ".5rem",
              }}
            >
              <ShoppingCartIcon style={{ marginRight: ".3rem" }} />
            </Bagde>
            Cart
          </Link>
        </div>
      </div>
    </PrimaryNavContainer>
  );
};

export default PrimaryNav;
