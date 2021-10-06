import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import {
  MainNav,
  SearchBoxStyle,
  SearchContainer,
  SearchInner,
} from "./Styles";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

function SearchBox({ lab }) {
  const [products, setProducts] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [focus, setFocus] = useState(false);
  const [txt, setTxt] = useState("Search Something");



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
    };
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    const searched = products.filter((search) =>
      search.product_name
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setSearchData(searched);
    if (event.target.value === "") {
      setSearchData([]);
      setTxt("Search Something");
    } else if (searchData.length === 0) {
      setTxt("No match Found");
    }
  };
  const handleOnblur = (event) => {
    // setFocus(false);
    if (event.target.value === "") {
      setFocus(false);
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setFocus(false)}>
    <SearchBoxStyle className={lab === "mobile" ? "mobile" : ""} >
      <SearchContainer className={lab === "mobile" ? "mobile" : ""}>
        <SearchInner className={lab === "mobile" ? "mobile" : ""}>
          <input
            type="text"
            placeholder="Search Product..."
            onChange={(event) => handleSearch(event)}
            onFocus={() => setFocus(true)}
            onBlur={(event) => handleOnblur(event)}
          />
          <button>
            <SearchIcon />
          </button>
        </SearchInner>

        <MainNav
          className={
            focus
              ? lab === "mobile"
                ? "mobile"
                : lab === "secondary"
                ? "secondary"
                : ""
              : "hide"
          }
        >
          {searchData.length === 0 && focus ? (
            <div className="search_resule" >{txt}</div>
          ) : (
            searchData.slice(0, 5).map((ser, key) => {
              return (
                  <div className="search_resule" key={key} >
                    <Link
                      to={`/product/${ser.product_id}`}
                      onClick={() => {
                        window.location.replace(`/product/${ser.product_id}`);
                      }}
                      style={{ textDecoration: "none", color: "black" }}
                      className="link_class"
                    >
                      <div className="ser_name">
                        <img
                          src={ser.product_img}
                          alt={ser.product_name}
                          className="search_resule_img"
                        />
                      </div>
                      <div className="ser_name">{ser.product_name}</div>
                    </Link>
                  </div>
              );
            })
          )}
        </MainNav>
      </SearchContainer>
    </SearchBoxStyle>
    </ClickAwayListener>
  );
}

export default SearchBox;
