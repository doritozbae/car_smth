import React, { useContext } from "react";

import ShowCars from "../Utils/ShowCars";
import { FaCheck } from "react-icons/fa";
import DataContext from "../context/DataContext";
import "./styles/Home.css";

const Home = () => {
  const {
    data,
    setData,
    edit,
    setEdit,
    addNotificationTitle,
    editNotificationTitle,
    deleteNotificationTitle,
    setDeleteNotificationTitle,
    addNotification,
    editNotification,
    deleteNotification,
    setDeleteNotification,
    setCarDetails,
  } = useContext(DataContext);

  return (
    <div>
      <div className="header">
        <div className="header-container">
          <p className="header-font">I KNOW NOTHING ABOUT CARS LOL (help) </p>
        </div>
      </div>

      <div className=" container">
        <div>
          <ShowCars
            data={data}
            setData={setData}
            edit={edit}
            setEdit={setEdit}
            setDeleteNotificationTitle={setDeleteNotificationTitle}
            setDeleteNotification={setDeleteNotification}
            setCarDetails={setCarDetails}
          />

          {addNotification && (
            <div className="alert">
              <FaCheck className="check-icon" />
              <h2>Added a car - {addNotificationTitle}</h2>
            </div>
          )}

          {editNotification && (
            <div className="alert">
              <FaCheck className=" check-icon" />
              <h2>Car {editNotificationTitle} updated</h2>
            </div>
          )}

          {deleteNotification && (
            <div className="alert">
              <FaCheck className=" check-icon" />
              <h2>Deleted Car - {deleteNotificationTitle}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
