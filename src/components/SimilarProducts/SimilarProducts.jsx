import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import "./SimilarProducts.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

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

function SimilarProducts({ Pcategory_id, Pproduct_id, setRload }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [redAlert, setRedAlert] = useState(false);
  const { user } = useSelector((state) => state.userLoginReducer);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setRedAlert(false);
    setOpen(false);
  };

  const handleSoldOut = () => {
    setRedAlert(true);
    setOpen(true);
  };

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [productPrice, setProductPrice] = useState([]);

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
      const { data } = await authAxios.get("/product");

      setProducts(data.product);
      setProductPrice(data.price);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product, unit_price, unit, price_unit_id) => {
    dispatch(
      addToCart(
        product,
        product.product_id,
        Number(unit_price),
        unit,
        price_unit_id,
        1
      )
    ); //if dropdown appears then put dropdown value in place of qty
    setOpen(true);
  };

  var sliceData;
  var pprice = [];

  function afind(arr, pid) {
    const found = pprice.some((e1) => e1.product_id === pid.product_id);
    if (!found) {
      pprice.push(pid);
    }
    return pprice;
  }
  sliceData = products
    .filter((iteam) => iteam.category_id === Pcategory_id)
    .filter((pid) => pid.product_id !== Pproduct_id)
    .slice(0, 5);

  sliceData.map((product) => {
    productPrice.map((price) => {
      if (price.product_id === product.product_id) {
        afind(pprice, price);
      }
    });
  });

  return (
    <div className="SimilarProducts_container">
      <div className="aboutproduct_title">
        You Might Also Like
        <div className="soloproduct_line" />
      </div>
      <div className="SimilarProducts_card_con">
        {sliceData.map((product, key) => {
          let qty = product.total_quantity;
          return (
            <div className="starproduct_card" key={key}>
              <Link
                className="link_class"
                style={{ textDecoration: "none" }}
                to={`/product/${product.product_id}`}
                onClick={() => setRload(true)}
              >
                <div className="starproduct_img">
                  <img
                    className="starproduct_img_data"
                    src={product.product_img}
                    alt={product.product_name}
                  />
                </div>
              </Link>
              <div className="starproduct_data">
                <Link
                  className="link_class"
                  to="/product/flower"
                  style={{ textDecoration: "none" }}
                >
                  <div className="similarproduct_title">
                    {product.product_name}
                  </div>
                  <div className="starproduct_high">
                    SQ Special | Best Price
                  </div>
                  {pprice
                    .filter((item) => item.product_id === product.product_id)
                    .map((p, key) => {
                      return (
                        <div key={key} className="soldoutlab">
                          {qty < p.unit_in_gm ? (
                            <div className="soldOutLabel common_flex">
                              Sold Out
                            </div>
                          ) : (
                            ""
                          )}
                          <del className="starproduct_price_delete">
                            MRP: ₹
                            {p.discount === 0
                              ? p.product_price + 10
                              : p.discount + p.product_price}
                          </del>
                          <div className="starproduct_price" key={key}>
                            ₹{p.product_price} per/{p.price_unit_name}
                          </div>
                        </div>
                      );
                    })}
                </Link>
              </div>
              <div className="starproduct_btn_con">
                {pprice
                  .filter((item) => item.product_id === product.product_id)
                  .map((p, key) => {
                    return (
                      <div
                        className="starproduct_btn"
                        onClick={
                          qty > p.unit_in_gm
                            ? () =>
                                handleAddToCart(
                                  product,
                                  p.product_price,
                                  p.price_unit_name,
                                  p.price_unit_id
                                )
                            : () => handleSoldOut()
                        }
                        key={key}
                      >
                        ADD
                        {/* snackbar */}
                        {Object.entries(user).length !== 0 &&
                        <div className={classes.root}>
                          <Snackbar
                            open={open}
                            autoHideDuration={1000}
                            onClose={handleClose}
                          >
                            <Alert
                              onClose={handleClose}
                              severity={!redAlert ? "success" : "error"}
                            >
                              {!redAlert
                                ? "Item added in your Cart"
                                : "Product Sold Out"}
                            </Alert>
                          </Snackbar>
                        </div>}
                        {/* snackbar end */}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SimilarProducts;
