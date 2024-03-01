import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./styles/TopNav.css";

const TopNav = ({ title }) => {
  const navigate = useNavigate();

  return (
    <nav className="nav-container">
      <div onClick={() => navigate("/")}>
        <IoIosArrowBack className="back-btn" />
      </div>
      <h1 className="title-font">{title}</h1>
    </nav>
  );
};

export default TopNav;
