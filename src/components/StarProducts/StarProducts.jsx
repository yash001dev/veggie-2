import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../../redux/actions/cartActions";
import "./StarProducts.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

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

function StarProducts({ no, categoryName, categoryid }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [redAlert, setRedAlert] = useState(false);
  const { user } = useSelector((state) => state.userLoginReducer);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [productPrice, setProductPrice] = useState([]);
  const [unitGM, setUnitGM] = useState([]);

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
    setRedAlert(false);
    setOpen(true);
  };

  const handleSoldOut = () => {
    setRedAlert(true);
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
    .filter((iteam) => iteam.category_id === categoryid)
    .slice(0, 4);
  sliceData.map((product) => {
    productPrice.map((price) => {
      if (price.product_id === product.product_id) {
        afind(pprice, price);
      }
    });
  });

  return (
    <div className="starproducts_container">
      <div className="starproducts_head_title">{categoryName}</div>
      <div className="starproducts_line" />
      <div className="starproducts_card_con">
        {sliceData.map((product, key) => {
          let qty = product.total_quantity;
          return (
            <div className="starproduct_card" key={key}>
              <Link
                className="link_class"
                style={{ textDecoration: "none" }}
                to={`/product/${product.product_id}`}
              >
                <div className="starproduct_img">
                  <img
                    className="starproduct_img_data"
                    src={product.product_img}
                    alt={product.product_name}
                  />
                  {/* <div className="starproduct_dis_label">4%</div> */}
                </div>
              </Link>
              <div className="starproduct_data">
                <Link
                  className="link_class"
                  to={`/product/${product.product_id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="starproduct_title">
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
                          <div className="starproduct_price">
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
                        </div>
                  }{/* snackbar end */}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}

        <div
          className={`starproduct_color_card ${
            no === "evan"
              ? "starproduct_color_card_color_one"
              : "starproduct_color_card_color_two"
          }`}
        >
          <div className="starproduct_color_card_title">Save Max!</div>
          <div className="starproduct_color_card_subt">
            Handpicked deals with best Prices.
          </div>
          <Link
            className="link_class"
            to={`/products/${categoryid}/${categoryName}`}
            style={{ textDecoration: "none" }}
          >
            <div className="starproduct_color_card_btn">View All</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StarProducts;
