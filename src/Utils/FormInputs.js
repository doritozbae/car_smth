import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CatagoryBtn from "./CatagoryBtn";
import { v4 as uuidv4 } from "uuid";
import { catagory } from "../constants/Data";
import "./styles/Form.css";
import "../components/styles/Home.css";

const FormInputs = ({
  data,
  setData,
  setAddNotification,
  setAddNotificationTitle,
}) => {
  const [carName, setCarName] = useState("");
  const [carDescription, setCarDescription] = useState("");
  const [carPrice, setCarPrice] = useState("");

  const [emptyInputError, setEmptyInputError] = useState(false);
  const [emptyPriceError, setEmptyPriceError] = useState(false);

  const [nameCountError, setNameCountError] = useState("");
  const [descriptionCountError, setDescriptionCountError] = useState("");
  const [priceCountError, setPriceCountError] = useState("");
  const [imgError, setImgError] = useState("");

  const [CategoryOpen, setCategoryOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState([]);

  const [maxSelectedError, setMaxSelectedError] = useState(false);

  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");

  const validateUrl = (url) => {
    const regEx =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return regEx.test(url);
  };

  const handleImg = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setUrl(value);
    const isValid = validateUrl(value);

    if (isValid) {
      setMessage("Valid");
    } else {
      setMessage("Not Valid");
    }
    setIsValid(isValid);
  };

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const handleName = (e) => {
    let title = e.target.value;
    setCarName(e.target.value);

    if (title.length > 30) {
      setNameCountError("Name should be less than or equal to 30 characters");
    } else {
      setNameCountError("");
    }
  };
  const handleDescription = (e) => {
    let description = e.target.value;
    setCarDescription(e.target.value);

    if (description.length > 25) {
      setDescriptionCountError(
        "Description should be less than or equal to 200 characters"
      );
    } else {
      setDescriptionCountError("");
    }
  };
  const handlePrice = (e) => {
    let price = e.target.value;
    setCarPrice(e.target.value);

    if (price.length < 1 || price.length > 5 || price < 1) {
      setPriceCountError("Incorrect price");
    } else {
      setPriceCountError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = uuidv4();
    const title = carName;
    const description = carDescription;
    const price = carPrice;

    if (carName === "") {
      setEmptyInputError(true);

      setTimeout(() => {
        setEmptyInputError(false);
      }, 4000);
    } else if (carPrice === "") {
      setEmptyPriceError(true);

      setTimeout(() => {
        setEmptyPriceError(false);
      }, 4000);
    } else if (isValid == false) {
      setImgError(true);

      setTimeout(() => {
        setImgError(false);
      }, 4000);
    } else {
      const newCar = {
        id: id,
        title: title,
        description: description,
        price: price,
        catagory: selectedCategory,
        img: url,
      };

      localStorage.setItem("carItems", JSON.stringify([...data, newCar]));
      setData([...data, newCar]);
      setCarName("");
      setCarDescription("");
      setCarPrice("");
      setUrl("");
      setEmptyInputError(false);
      navigate("/");

      setAddNotificationTitle(carName);
      setAddNotification(true);
      setTimeout(() => {
        setAddNotification(false);
        setAddNotificationTitle("");
      }, 4000);
    }
  };

  const handleSelected = (catagoryObj) => {
    setSelectedCategory([...selectedCategory, catagoryObj]);

    const isCategorySelected = selectedCategory.filter(
      (val) => val.id === catagoryObj.id
    );

    if (isCategorySelected.length) {
      const updatedCatagories = selectedCategory.filter(
        (val) => val.id !== catagoryObj.id
      );
      setSelectedCategory(updatedCatagories);
    } else {
      if (selectedCategory.length < 3) {
        setMaxSelectedError(false);
        setSelectedCategory([...selectedCategory, catagoryObj]);
      } else {
        setMaxSelectedError(true);
        setTimeout(() => {
          setMaxSelectedError(false);
        }, 4000);
        setSelectedCategory([...selectedCategory]);
      }
    }
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

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label
            htmlFor="carName
    "
          >
            Car Name
          </label>
          <input
            type="text"
            id="carName
      "
            placeholder="Enter car name"
            value={carName}
            onChange={handleName}
            onKeyDown={handleKeyDown}
            className="input-style"
          />
          <p className="error-font">{nameCountError}</p>
        </div>
        <div className="input-container">
          <label htmlFor="carDescription">Car Description</label>
          <input
            id="carDescription"
            placeholder="Enter car description"
            value={carDescription}
            onChange={handleDescription}
            className="input-style"
          ></input>
          <p className="error-font">{descriptionCountError}</p>
        </div>

        <div className="input-container">
          <label htmlFor="carDescription">Car Price</label>
          <input
            id="carPrice"
            placeholder="Enter car price"
            type="number"
            pattern="[0-9]*"
            inputmode="numeric"
            value={carPrice}
            onChange={handlePrice}
            className="input-style"
          ></input>
          <p className="error-font">{priceCountError}</p>
        </div>

        <div className="input-container">
          <label>Img URL</label>
          <input
            id="url"
            type="text"
            value={url}
            label="URL"
            onChange={handleImg}
            className="input-style"
            placeholder="Enter img URL"
          ></input>
        </div>

        {message && (
          <p style={isValid ? { color: "#446A46" } : { color: "#990000" }}>
            {message}
          </p>
        )}

        <div ref={catagoryRef}>
          <label>Category</label>

          <div
            onClick={() => setCategoryOpen(!CategoryOpen)}
            className="input-style category-input"
          >
            <div className="selected-item">
              {selectedCategory.map((val, index) => (
                <div key={index} className="active-item">
                  {val.catagory}
                </div>
              ))}
            </div>

            <div className="arrow-icon">
              {CategoryOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </div>
          {CategoryOpen ? (
            <div className="category-list">
              <ul>
                <li>Select max 3 categories</li>
                <div className="category-list">
                  {catagory.map((val, index) => (
                    <CatagoryBtn
                      key={index}
                      val={val}
                      selectedCategory={selectedCategory}
                      handleSelected={handleSelected}
                    />
                  ))}
                </div>
              </ul>
            </div>
          ) : null}
        </div>

        <div>
          <button
            disabled={
              nameCountError ||
              descriptionCountError ||
              priceCountError ||
              imgError
                ? true
                : false
            }
            type="submit"
            className="submit-btn"
          >
            Add new car
          </button>
        </div>
      </form>

      {emptyInputError && (
        <div className=" alert">
          <IoIosCloseCircle className=" wrong-icon" />
          <h2>Please enter car name</h2>
        </div>
      )}

      {emptyPriceError && (
        <div className=" alert">
          <IoIosCloseCircle className="wrong-icon" />
          <h2>Please enter car price</h2>
        </div>
      )}

      {maxSelectedError && (
        <div className=" alert">
          <IoIosCloseCircle className=" wrong-icon" />
          <h2>You cannot add more than 3 catagories</h2>
        </div>
      )}
    </div>
  );
};
export default FormInputs;
