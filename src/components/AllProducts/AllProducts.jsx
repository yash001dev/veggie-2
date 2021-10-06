import React, { useState, useEffect } from "react";
import "./AllProducts.css";
import SortingBar from "../SortingBar/SortingBar";
import AllProductsCards from "../AllProductCards/AllProductsCards";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import LoadingBox from "../../components/LoadingBox";

function AllProducts() {
  let { catName } = useParams();
  let { catID } = useParams();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [productPrice, setProductPrice] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const { data } = await authAxios.get("/product");

      setProducts(data.product);
      setProductPrice(data.price);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product, unit_price) => {
    dispatch(addToCart(product, product.product_id, unit_price, 1)); //if dropdown appears then put dropdown value in place of qty
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
    .filter((iteam) => String(iteam.category_id) === String(catID))
    .slice(0);
  sliceData.map((product) => {
    productPrice.map((price) => {
      if (price.product_id === product.product_id) {
        afind(pprice, price);
      }
    });
  });
  const [sortVal, setSortval] = useState("acends");

  if (sortVal === "acends") {
    products.sort((a, b) => {
      let fa = a.product_name.toLowerCase(),
        fb = b.product_name.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }
  setTimeout(() => {
    if (sortVal === "descs") {
      products.sort((a, b) => {
        let fa = a.product_name.toLowerCase(),
          fb = b.product_name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    }
    if (sortVal === "acends") {
      products.sort((a, b) => {
        let fa = a.product_name.toLowerCase(),
          fb = b.product_name.toLowerCase();
        if (fa > fb) {
          return -1;
        }
        if (fa < fb) {
          return 1;
        }
        return 0;
      });
    }
  }, 200);
  return (
    <>
    {loading && <LoadingBox />}
    <div className="AllProducts_container">
      <div className="allproducts_cont">
        <div className="allproducts_cat_name">
          {catName}
          <div className="starproducts_line mar" />
        </div>
        <div className="allproducts_sorting">
          <SortingBar setSortval={setSortval} />
        </div>
        <hr />
        <div className="allproducts_cards">
          <AllProductsCards
            sliceData={sliceData}
            pprice={pprice}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default AllProducts;
