import React, { useContext, useEffect, useRef, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import TopNav from "../Utils/TopNav";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import EditCatagoryBtn from "../Utils/EditCatagoryBtn";
import { catagory } from "../constants/Data";

import "../Utils/styles/Form.css";
import "./styles/Home.css";

const EditCar = () => {
  const {
    data,
    setData,
    edit,
    setEdit,
    setEditNotificationTitle,
    setEditNotification,
    index,
  } = useContext(DataContext);

  const [emptyInputError, setEmptyInputError] = useState(false);

  const [nameCountError, setNameCountError] = useState("");
  const [descriptionCountError, setDescriptionCountError] = useState("");
  const [priceCountError, setPriceCountError] = useState("");
  const [CategoryOpen, setCategoryOpen] = useState(false);

  const [selectedCatagory, setSelectedCatagory] = useState([]);
  const [maxSelectedError, setMaxSelectedError] = useState(false);

  const navigate = useNavigate("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleEditTitle = (e) => {
    let title = e.target.value;
    setEdit({
      id: edit.id,
      title: title,
      description: edit.description,
      price: edit.price,
      catagory: edit.catagory,
      img: edit.img,
    });

    if (title.length >= 35) {
      setNameCountError("Name should be less than or equal to 30 characters");
    } else {
      setNameCountError("");
    }
  };

  const handleEditPrice = (e) => {
    let price = e.target.value;
    setEdit({
      id: edit.id,
      title: edit.title,
      description: edit.description,
      price: price,
      catagory: edit.catagory,
      img: edit.img,
    });

    if (price.length > 5 || price.length < 1) {
      setPriceCountError("Incorrect price");
    } else {
      setPriceCountError("");
    }
  };

  const handleEditDescription = (e) => {
    let description = e.target.value;
    setEdit({
      id: edit.id,
      title: edit.title,
      description: description,
      price: edit.price,
      catagory: edit.catagory,
      img: edit.img,
    });

    if (description.length >= 200) {
      setDescriptionCountError(
        "Description should be less than or equal to 200 characters"
      );
    } else {
      setDescriptionCountError("");
    }
  };

  const handleEditSubmit = (e, index) => {
    e.preventDefault();

    if (edit.title === "") {
      setEmptyInputError(true);

      setTimeout(() => {
        setEmptyInputError(false);
      }, 4000);
    } else {
      const editIndex = [...data];
      editIndex[index] = edit;

      setData(editIndex);
      localStorage.setItem("carItems", JSON.stringify(editIndex));
      setEdit("");
      navigate("/");

      setEditNotificationTitle(edit.title);
      setEditNotification(true);
      setTimeout(() => {
        setEditNotification(false);
        setEditNotificationTitle("");
      }, 4000);
    }
  };

  const handleCancel = () => {
    setEdit("");
    navigate("/");
  };

  const catagoryRef = useRef();

  useEffect(() => {
    let handleCatagoryTouch = (e) => {
      if (!catagoryRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleCatagoryTouch);

    return () => document.removeEventListener("mousedown", handleCatagoryTouch);
  });

  useEffect(() => {
    if (edit.id) {
      const editCata = edit.catagory.map((v) => v);
      setSelectedCatagory(editCata);
    } else {
      return;
    }
  }, [edit]);

  const handleSelected = (catagoryObj) => {
    const isCategorySelected = selectedCatagory.filter(
      (val) => val.id === catagoryObj.id
    );

    if (isCategorySelected.length) {
      const updatedCatagories = selectedCatagory.filter(
        (val) => val.id !== catagoryObj.id
      );
      setSelectedCatagory(updatedCatagories);
      setEdit({
        id: edit.id,
        title: edit.title,
        description: edit.description,
        price: edit.price,
        catagory: updatedCatagories,
        img: edit.img,
      });
    } else {
      if (selectedCatagory.length < 3) {
        setMaxSelectedError(false);
        setSelectedCatagory([...selectedCatagory, catagoryObj]);
        setEdit({
          id: edit.id,
          title: edit.title,
          description: edit.description,
          price: edit.price,
          catagory: [...selectedCatagory, catagoryObj],
          img: edit.img,
        });
      } else {
        setMaxSelectedError(true);
        setTimeout(() => {
          setMaxSelectedError(false);
        }, 4000);
        setSelectedCatagory([...selectedCatagory]);
        setEdit({
          id: edit.id,
          title: edit.title,
          description: edit.description,
          price: edit.price,
          catagory: [...selectedCatagory],
          img: edit.img,
        });
      }
    }
  };

  return (
    <div>
      <TopNav title={"Edit Car Info"} />

      <div className="form-container">
        <form>
          <div>
            <img className="img" src={edit.img} alt="car" />
          </div>
          <div className="input-container">
            <label htmlFor="carName">Edit Name</label>
            <input
              type="text"
              id="carName"
              value={edit.title}
              onChange={handleEditTitle}
              onKeyDown={handleKeyDown}
              placeholder="Enter car name"
              className="input-style"
            />
            <p className="error-font">{nameCountError}</p>
          </div>
          <div className="input-container">
            <label htmlFor="carDescription">Edit Description</label>
            <input
              id="carDescription"
              value={edit.description}
              onChange={handleEditDescription}
              placeholder="Enter car description"
              className="input-style"
            ></input>
            <p className="error-font">{descriptionCountError}</p>
          </div>

          <div className="input-container">
            <label htmlFor="carPrice">Edit Price</label>
            <input
              id="carPrice"
              placeholder="Enter car price"
              type="number"
              pattern="[0-9]*"
              inputmode="numeric"
              value={edit.price}
              onChange={handleEditPrice}
              className="input-style"
            />
            <p className="error-font">{priceCountError}</p>
          </div>

          <div ref={catagoryRef}>
            <label>Category</label>

            <div
              onClick={() => setCategoryOpen(!CategoryOpen)}
              className=" input-style"
            >
              <div>{CategoryOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
              {edit.id && (
                <div className=" selected-item">
                  {edit.catagory.map((val, index) => (
                    <div key={index} className="active-item">
                      {val.catagory}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {CategoryOpen ? (
              <div className="category-list">
                <ul>
                  <div className="category-list">
                    {catagory.map((val, index) => (
                      <EditCatagoryBtn
                        key={index}
                        val={val}
                        handleSelected={handleSelected}
                        selectedCatagory={selectedCatagory}
                      />
                    ))}
                  </div>
                </ul>
              </div>
            ) : null}
          </div>

          <div className="buttons-container">
            <button onClick={handleCancel} className="btn cancel-btn">
              Cancel
            </button>

            <button
              disabled={
                nameCountError ||
                descriptionCountError ||
                priceCountError ||
                !edit.id
                  ? true
                  : false
              }
              type="submit"
              onClick={(e) => handleEditSubmit(e, index)}
              className="submit-btn btn"
            >
              Update
            </button>
          </div>
        </form>

        {emptyInputError && (
          <div className=" alert">
            <IoIosCloseCircle className=" wrong-icon" />
            <h2>Please enter a car name</h2>
          </div>
        )}

        {maxSelectedError && (
          <div className=" alert">
            <IoIosCloseCircle className="wrong-icon"></IoIosCloseCircle>
            <h2>You cannot add more than 3 categories</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCar;
