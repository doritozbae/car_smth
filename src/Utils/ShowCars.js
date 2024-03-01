import React, { useEffect, useState } from "react";
import { RxPlus } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import "./styles/ShowCars.css";
import Card from "./Card";

const ShowCars = ({
  data,
  setData,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setCarDetails,
}) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filterResults = data.filter(
      (val) =>
        val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filterResults);
  }, [data, search]);

  const navigate = useNavigate();

  return (
    <>
      {data.length ? (
        <div>
          <div className="control-container">
            <div>
              <input
                type="text"
                placeholder="Search a car..."
                value={search}
                onChange={handleSearch}
                className="searchbar"
              />
            </div>
            <div onClick={() => navigate("/addCar")} className=" add-button">
              <RxPlus className="add-icon" />
              <p>Add new car</p>
            </div>
          </div>

          <div className="grid">
            {searchResults.map((val, index) => (
              <Card
                key={index}
                i={index}
                val={val}
                data={data}
                setData={setData}
                setEdit={setEdit}
                setDeleteNotificationTitle={setDeleteNotificationTitle}
                setDeleteNotification={setDeleteNotification}
                setCarDetails={setCarDetails}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="greeting">
          <h1 className="greeting-font">You don't have any cars :'(</h1>
          <div onClick={() => navigate("/addCar")} className=" add-button">
            <RxPlus className="add-icon" />
            <p>Add a new car</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowCars;
