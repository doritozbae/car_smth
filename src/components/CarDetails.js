import React from "react";
import { useParams } from "react-router-dom";
import TopNav from "../Utils/TopNav";
import "../Utils/styles/Form.css";

const CarDetails = () => {
  const { id } = useParams();
  const items = JSON.parse(localStorage.getItem("carItems"));

  const details = items.find((val) => val.id.toString() === id);

  return (
    <div>
      <TopNav title={"Car Details"} />

      <div className="form-container">
        <div className="img-container">
          <img className="img" src={details.img} alt="car" />
        </div>
        <div className="line">
          <h2 className="details-header">Car Name:</h2>
          <p>{details.title}</p>
        </div>

        <div className="line">
          <h2 className="details-header">Description:</h2>
          <p>{details.description ? details.description : "-"}</p>
        </div>

        <div className="line">
          <h2 className="details-header">Price:</h2>
          <p>{details.price ? details.price : "-"}</p>
        </div>

        <div className="line">
          <h2 className="details-header">Category:</h2>
          <div className="details-container">
            {details.catagory.map((val, index) => (
              <p className="list-items active-item" key={index}>
                {val.catagory}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
