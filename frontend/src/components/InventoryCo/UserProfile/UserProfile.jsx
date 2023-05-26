import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashbordSummery from "../DashbordSummery/DashbordSummery";

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentEmployee = async () => {
      const token = window.localStorage.getItem("accessToken"); // Get the authentication token from localStorage

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
    <div>

    <div className="profile-card">
      <div className="profile-container">
        <h3 className="profile-title">Manager Profile</h3>
        <img className="profile-img" src={user.img} alt="Profile" />
        <div className="profile-details">
          <h3 className="profile-name">{capitalizeFirstLetter(user.name)}</h3>
          <p className="profile-role">{user.role}</p>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>
    </div>

<DashbordSummery/>

    </div>

  );
};

export default UserProfile;
