import React, { useContext } from "react";
import { BiTask } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";
import "./styles/CarOptions.css";

const CarOptions = ({
  data,
  setData,
  val,
  setEdit,
  setDeleteNotificationTitle,
  setDeleteNotification,
  setOpenOptions,
  index,
}) => {
  const { setIndex } = useContext(DataContext);

  const handleDelete = (isData) => {
    const deleteData = data.filter((val) => val.id !== isData.id);
    setData(deleteData);
    localStorage.setItem("carItems", JSON.stringify(deleteData));

    setDeleteNotificationTitle(isData.title);

    setDeleteNotification(true);
    setOpenOptions(false);
    setTimeout(() => {
      setDeleteNotification(false);
      setDeleteNotificationTitle("");
    }, 4000);
  };

  return (
    <div className="options-container">
      <ul>
        <li
          onClick={() => {
            setIndex(index);
            setEdit({
              id: val.id,
              title: val.title,
              description: val.description,
              price: val.price,
              catagory: val.catagory,
              img: val.img,
            });
          }}
        >
          <Link to={"/edit"} className=" option-item">
            <RiEdit2Fill className="option-icon" />
            Edit
          </Link>
        </li>

        <li onClick={() => handleDelete(val)} className=" option-item">
          <MdDelete className=" option-icon" />
          Delete
        </li>
        <li>
          <Link to={`/car/${val.id}`} className="  option-item">
            <BiTask className=" option-icon" />
            Car details
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CarOptions;
