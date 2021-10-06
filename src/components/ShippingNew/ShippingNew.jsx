import React, { useEffect, useState } from "react";
import "./shippingStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addShippingAddress } from "../../redux/actions/cartActions";

var val = "";

const ShippingNew = ({ expanded, setExpanded }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLoginReducer);
  const { cart } = useSelector((state) => state.addToCartReducer);
  const { shippingAddress } = cart;
  const history = useHistory();

  if (!Object.keys(user).length) {
    history.push("/login");
  }

  const [fullName, setFullName] = useState(
    user.user_name ? user.user_name : ""
  );
  const [mobile, setMobile] = useState(user.user_phone ? user.user_phone : "");
  const [pincode, setPincode] = useState(null);
  const [city, setCity] = useState("Rajkot");
  const [address, setAddress] = useState("");
  const [userAddressId, setUserAddressId] = useState(null);
  const [findAddress, setFindAddress] = useState(null);

  const fetchAddressData = async (a_type) => {
    val = a_type;

    const findAddr = shippingAddress?.find(
      (item) => item.user_address_name === a_type
    );

    if (findAddr !== undefined) {
      setFindAddress(findAddr);
      localStorage.setItem("foundAddr", true);
      setPincode(findAddr.pincode);
      setAddress(findAddr.full_address);
      setUserAddressId(findAddr.user_address_id);
    } else {
      setFindAddress(null);
      setPincode("");
      setAddress("");
      setUserAddressId(null);
      localStorage.removeItem("foundAddr");
    }
  };

  useEffect(() => {
    // val = "home";
    fetchAddressData("home");
  }, []);

  useEffect(() => {
    fetchAddressData(val);
  }, [expanded === "panel1"]);

  const handleShippingAddress = (e) => {
    e.preventDefault();

    dispatch(addShippingAddress(val, address, pincode)); // add new address
    localStorage.removeItem("foundAddr");
    localStorage.removeItem("user_address_ref");
    localStorage.setItem("user_address_ref", val);
    localStorage.setItem("isAddress", true);
    setExpanded("panel2");
  };

  return (
    <form className="shipping-container" onSubmit={handleShippingAddress}>
      <div className="first-sec">
        <div className="sub-sec">
          <label htmlFor="fullname">FullName</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="sub-sec">
          <label htmlFor="mobile">Mobile No</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            minLength={10}
            maxLength={10}
            required
          />
        </div>
      </div>
      <div className="second-sec">
        <div className="sub-sec">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            minLength={6}
            maxLength={6}
            required
          />
        </div>
        <div className="sub-sec">
          <label htmlFor="city">City</label>
          <input type="text" value={city} required disabled />
        </div>
      </div>
      <div className="third-sec">
        <div className="last-sub-sec">
          <label htmlFor="address">Address</label>
          <textarea
            type="text"
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="choose-address">
        <input
          type="radio"
          id="home"
          name="address_type"
          value="home"
          onChange={(e) => fetchAddressData(e.target.value)}
          defaultChecked
        />
         <label htmlFor="home">Home</label>
        <input
          type="radio"
          id="other"
          name="address_type"
          value="other"
          onChange={(e) => fetchAddressData(e.target.value)}
          defaultChecked={val === "other" ? true : false}
        />
         <label htmlFor="other">Other</label>
        <br />
      </div>

      <div className="continue-shipping-btn">
        <button type="submit">Continue</button>
      </div>
    </form>
  );
};

export default ShippingNew;
