import React, { useEffect, useState } from "react";
import "./styles/Form.css";

const CatagoryBtn = ({ val, selectedCategory, handleSelected }) => {
  const [activeCatagory, setActiveCatagory] = useState(false);

  useEffect(() => {
    const isSelected = selectedCategory.some(
      (v) => v.catagory === val.catagory
    );
    setActiveCatagory(isSelected);
  }, [selectedCategory, val.catagory]);

  return (
    <li
      onClick={(e) => {
        handleSelected({
          id: val.id,
          catagory: val.catagory,
        });
      }}
      className={`list-items ${
        activeCatagory ? "active-item" : "inactive-item"
      } `}
    >
      {val.catagory}
    </li>
  );
};

export default CatagoryBtn;
