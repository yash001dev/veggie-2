import React, { useState } from "react";
import "./SortingBar.css";

function SortingBar({ setSortval }) {
  const [selectedLabel, setSelectedLabel] = useState("az");
  const handleSort = (txt, label) => {
    setTimeout(() => {
      setSortval(txt);
      setSelectedLabel(label);
    }, 100);
  };
  return (
    <div className="SortingBar_container">
      <div className="allproducts_sort_label">Sort By:</div>
      <div
        className="allproducts_sort_val"
        onClick={() => handleSort("acends", "az")}
      >
        Name -- A to Z
        <div
          className={`${selectedLabel === "az" ? "allproducts_active" : ""}`}
        />
      </div>
      <div
        className="allproducts_sort_val"
        onClick={() => handleSort("descs", "za")}
      >
        Name -- Z to A
        <div
          className={`${selectedLabel === "za" ? "allproducts_active" : ""}`}
        />
      </div>
    </div>
  );
}

export default SortingBar;
