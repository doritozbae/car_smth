import React, { useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import CarOptions from "./CarOptions";
import "./styles/Card.css";

const Card = ({
  i,
  val,
  data,
  setData,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setCarDetails,
}) => {
  const [openOptions, setOpenOptions] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="card-container">
      <div>
        <img className="img" src={val.img} alt="car" />
      </div>
      <div>
        <div className="main-description">
          <p className="card-title">{val.title}</p>
          <p>{val.price}$</p>
        </div>
        <p>{val.description}</p>

        <div className="category">
          {val.catagory.map((c, index) => (
            <p key={index}>
              {c.catagory} <span> | </span>
            </p>
          ))}
        </div>
      </div>

      <div ref={menuRef} className="more-btn">
        <SlOptionsVertical
          onClick={() => setOpenOptions(!openOptions)}
          className="more"
        />

        <div
          className={`${openOptions ? "animationActive" : "animationUnactive"}`}
        >
          {openOptions && (
            <CarOptions
              index={i}
              val={val}
              data={data}
              setData={setData}
              setEdit={setEdit}
              setDeleteNotificationTitle={setDeleteNotificationTitle}
              setDeleteNotification={setDeleteNotification}
              setCarDetails={setCarDetails}
              setOpenOptions={setOpenOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
