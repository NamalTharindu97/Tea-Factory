import React, { useEffect, useState } from "react";
import "./WelcomeCard.css";
import axios from "axios";
import curvedShape from "../../../asserts/InventoryAs/Img/curvedShape.png";

const WelcomeCard = ({ userName }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchCurrentEmployee = async () => {
      const token = window.localStorage.getItem("accessToken");

      const headers = {
        authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.get("/employees/current", { headers });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentEmployee();

  }, []);

  const capitalizeFirstLetter = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  return (
    <>
        <div className="welcome-card">
          <div className="content">
            <h3 className="WelcomeMsg">Welcome, {capitalizeFirstLetter(user.name)}!</h3>
            <p className="WelcomeTxt">Today is a great day to work!</p>
          </div>
          <div className="shape-container">
            <img src={curvedShape} alt="Curved Shape" className="shape" />
          </div>
        </div>
    </>
  );
};

export default WelcomeCard;
