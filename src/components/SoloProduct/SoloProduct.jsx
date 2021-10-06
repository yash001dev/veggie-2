import React, { useState, useEffect } from "react";
import IteamBox from "../IteamBox/IteamBox";
import UpdateIcon from "@material-ui/icons/Update";
import MoneyIcon from "@material-ui/icons/Money";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./SoloProduct.css";
import AboutProduct from "../AboutProduct/AboutProduct";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import CommentSec from "../CommentSec/CommentSec";
import LargeImage from "../LargeImage/LargeImage";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import LoadingBox from "../../components/LoadingBox";

function SoloProduct() {
  const [open, setOpen] = React.useState(false);
  const [redAlert, setRedAlert] = useState(false);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "0",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  let { pid } = useParams();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLoginReducer);

  const [products, setProducts] = useState([]);
  const [reload, setRload] = useState(false);
  const [cutMRP, setCutmrp] = useState();
  const [cutMRPD, setCutmrpD] = useState();
  const [ourPrice, setOurPrice] = useState();
  const [youSave, setYousave] = useState();
  const [unit, setUnit] = useState();
  const [priceUnitID, setPriceUnitId] = useState();
  const [unitGM, setUnitGM] = useState();
  const [loading, setLoading] = useState(false);

  reload && window.location.reload();

  useEffect(() => {
    window.scrollTo(0, 0);
    const authAxios = axios.create({
      baseURL: "https://admin.veggi365.com/api",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    });

    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await authAxios.get("/product/" + pid);
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [pid]);

  const handleAddToCart = (product, Pproduct_id, cutMRP, unit, priceUnitID) => {
    dispatch(
      addToCart(product, Pproduct_id, Number(cutMRP), unit, priceUnitID, 1)
    ); //if dropdown appears then put dropdown value in place of qty
    setRedAlert(false);
    setOpen(true);
  };

  const handleSoldOut = () => {
    setRedAlert(true);
    setOpen(true);
  };

  //fetch all images from array
  let images = [];
  let prices = [];
  let comment = [];
  let PImg,
    product_name,
    product_about,
    product_storage_tip,
    product_fresh_till,
    Pcategory_id,
    Pproduct_id,
    total_quantity;

  products.map((propt) => {
    PImg = propt.product_img;
    product_name = propt.product_name;
    product_about = propt.product_about;
    product_fresh_till = propt.product_fresh_till;
    product_storage_tip = propt.product_storage_tip;
    Pcategory_id = propt.category_id;
    Pproduct_id = propt.product_id;
    total_quantity = propt.total_quantity;

    // propt.img.map((ig) => {
    //   images.push(ig);
    // });
    propt.price.map((pri) => {
      prices.push(pri);
    });
    propt.comment.map((com) => {
      comment.push(com);
    });
  });

  const [img, setImg] = useState(null);

  return (
    <>
    {loading && <LoadingBox />}
    <div className="soloproduct_container">
      <div className="soloproduct_content">
        <div className="solo_sec1">
          <div className="large_img">
            <LargeImage img={img} PImg={PImg} />
          </div>
          <div className="soloproduct_info">
            <div className="soloproduct_name">{product_name}</div>
            <div className="soloproduct_price_original soloproduct_common_font">
              MRP:{" "}
              <del>
                ₹{cutMRPD} Per/{unit}{" "}
              </del>
            </div>
            <div className="soloproduct_price soloproduct_common_font">
              Our Price:{" "}
              <span className="original_pri">
                ₹{cutMRP} Per/{unit}{" "}
              </span>
            </div>
            <div className="soloproduct_price soloproduct_common_font">
              You Save:{" "}
              <span className="original_pri">₹{cutMRPD - cutMRP}.00</span>
            </div>
            <div className="soloproduct_iteam_varients">
              <IteamBox
                prices={prices}
                total_quantity={total_quantity}
                setCutmrp={setCutmrp}
                setOurPrice={setOurPrice}
                setYousave={setYousave}
                setUnit={setUnit}
                setCutmrpD={setCutmrpD}
                setPriceUnitId={setPriceUnitId}
                setUnitGM={setUnitGM}
              />
            </div>
            <div className="soloproduct_btns_con">
              <div className="soloproduct_Buy_btn_con">
                <div
                  className="soloproduct_Buy_btn"
                  onClick={
                    total_quantity > unitGM
                      ? () =>
                          handleAddToCart(
                            products[0],
                            Pproduct_id,
                            cutMRP,
                            unit,
                            priceUnitID
                          )
                      : () => handleSoldOut()
                  }
                >
                  Add To Cart
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
              </div>
              <div className="soloproduct_Buy_btn_con">
                <Link
                  to={
                    total_quantity > unitGM ? "/place-order" : `/product/${pid}`
                  }
                  style={{ textDecoration: "none", color: "#fff" }}
                  onClick={
                    total_quantity > unitGM
                      ? () =>
                          handleAddToCart(
                            products[0],
                            Pproduct_id,
                            cutMRP,
                            unit,
                            priceUnitID
                          )
                      : () => handleSoldOut()
                  }
                >
                  <div
                    className="soloproduct_Buy_btn"
                    style={{ backgroundColor: "#299b3a" }}
                  >
                    Buy Now
                  </div>
                </Link>
              </div>
            </div>
            <div className="soloproduct_service">
              <div className="soloproduct_service_title">
                Service <div className="soloproduct_line" />
              </div>
              <div className="soloproduct_service_icons">
                <div className="soloproduct_service_icon extra_border_left">
                  <UpdateIcon style={{ fontSize: 40, color: "#4AC85D" }} />
                  <div className="soloproduct_high_text soloproduct_high_text_extra">
                    20 Min{" "}
                  </div>
                  <div className="soloproduct_high_text_nor">Delivery Time</div>
                </div>
                <div className="soloproduct_service_icon extra_border">
                  <MoneyIcon style={{ fontSize: 40, color: "#4AC85D" }} />
                  <div className="soloproduct_high_text soloproduct_high_text_extra">
                    Cash
                  </div>
                  <div className="soloproduct_high_text_nor">On Delivry</div>
                </div>
                <div className="soloproduct_service_icon extra_border_right">
                  <AccountBalanceIcon
                    style={{ fontSize: 40, color: "#4AC85D" }}
                  />
                  <div className="soloproduct_high_text soloproduct_high_text_extra">
                    Online Payment
                  </div>
                  <div className="soloproduct_high_text_nor">Accepted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="solo_sec2">
          <div className="soloproduct_detials">
            <AboutProduct
              product_about={product_about}
              product_fresh_till={product_fresh_till}
              product_storage_tip={product_storage_tip}
            />
          </div>
        </div>
        <div className="solo_sec3">
          <div className="related_products">
            <SimilarProducts
              Pcategory_id={Pcategory_id}
              Pproduct_id={Pproduct_id}
              setRload={setRload}
            />
          </div>
        </div>
        <div className="solo_sec4">
          <div className="soloproduct_comments">
            <CommentSec
              comment={comment}
              Pproduct_id={Pproduct_id}
              setRload={setRload}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SoloProduct;
