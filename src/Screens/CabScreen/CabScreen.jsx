import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import bookCabImg from "../../img/book-cab.svg";
import { bookCab } from "../../redux/actions/cabActions";
import { makeStyles } from "@material-ui/core/styles";
import { CabContainer } from "./Styles";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

var defaultPin;

const CabScreen = () => {

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#4AC85D",
      color: theme.palette.common.white,
      fontWeight: 600,
    },
  }))(TableCell);

  const dispatch = useDispatch();

  const [userAddress, setUserAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const [orders, setOrders] = useState([]);
  const [truckData, setTruckData] = useState([]);
  const [pincodeArr, setPincodeArr] = useState([]);
  const userr = JSON.parse(localStorage.getItem("loggedUser"));

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
      const cabData = await authAxios.get("/caborder/storage");
      setOrders(data);
      setTruckData(cabData.data);
    };

    fetchProducts();

    const fetchPincode = async () => {
      const { data } = await authAxios.get("/caborder/pincode");
      setPincodeArr(data);
      setPincode(data[0].cab_pincode);
    };

    fetchPincode();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const userOrder = orders.filter((user) => user.user_id === userr[0].user_id);
  const liveOrder = userOrder.filter(
    (live) =>
      live.cab_order_status === 0 ||
      live.cab_order_status === 1 ||
      live.cab_order_status === 2
  );

  const { user } = useSelector((state) => state.userLoginReducer);
  const history = useHistory();

  if (!Object.keys(user).length) {
    history.push("/login");
  }
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  var checkDemo = false;
  const handleBookCab = (e) => {
    liveOrder.map((check) => {
      if (check.user_address === userAddress) {
        checkDemo = true;
      }
    });
    if (!checkDemo) {
      e.preventDefault();

      dispatch(bookCab({ user_address: userAddress, user_pincode: pincode }));
      setTimeout(() => {
        history.push("/your-order-his");
      }, 500);
    } else {
      setOpen(true);
    }
  };

  return (
    <div>
      <CabContainer>
        <div className="cab-left">
          {/* <img src={bookCabImg} alt="book-cab-img" style={{ width: "35vw" }} /> */}
          <TableContainer>
          <Table style={{ width: 400}} className="truck-table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#444444", Color: "white" }}>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Product</StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {truckData?.map((orderData, id) => {
                return (
                  <TableRow key={id}>
                    <TableCell><img src={orderData.product_img} alt={orderData.product_name} className="truckimg"/></TableCell>
                    <TableCell>{orderData.product_name}</TableCell>
                    <TableCell>{orderData.quantity}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
        <form className="cab-right" onSubmit={handleBookCab}>
          <div className="sub-sec">
            <h1 style={{ marginBottom: "3rem" }}>Book a Cab</h1>
            <label htmlFor="address" style={{ marginBottom: ".3rem" }}>
              Enter Address
            </label>
            <textarea
              onChange={(e) => setUserAddress(e.target.value)}
              rows={3}
              cols={25}
              required
            />
          </div>
          <div className="sub-sec">
            <label htmlFor="pincode" style={{ marginBottom: ".3rem" }}>
              Enter Pincode
            </label>
            {/* <input
              type="text"
              onChange={(e) => setPincode(e.target.value)}
              required
            /> */}
            <select
              name="pincodeOption"
              id="pincodeOption"
              style={{ padding: ".5rem 0" }}
              onChange={(e) => setPincode(e.target.value)}
            >
              {pincodeArr?.map((item) => {
                return (
                  <option value={item.cab_pincode}>{item.cab_pincode}</option>
                );
              })}
            </select>
          </div>
          <div className="sub-sec">
            <button type="submit" className="cabbtn">
              Book Cab
              <div className={classes.root}>
                <Snackbar
                  open={open}
                  autoHideDuration={4000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    variant="filled"
                    severity="error"
                  >
                    Cab is already booked with same address
                  </Alert>
                </Snackbar>
              </div>
            </button>
          </div>
        </form>
      </CabContainer>
    </div>
  );
};

export default CabScreen;
