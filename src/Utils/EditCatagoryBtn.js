import React, { useEffect, useState } from "react";

const EditCatagoryBtn = ({ val, selectedCatagory, handleSelected }) => {
  const [activeCatagory, setActiveCatagory] = useState(false);

  useEffect(() => {
    const isSelected = selectedCatagory.some(
      (v) => v.catagory === val.catagory
    );
    setActiveCatagory(isSelected);
  }, [selectedCatagory, val.catagory]);

  return (
    <div>
      <ul>
        <li
          onClick={() => {
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
      </ul>
    </div>
  );
};

export default EditCatagoryBtn;
