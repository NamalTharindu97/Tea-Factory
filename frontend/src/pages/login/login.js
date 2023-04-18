import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./login.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/v1/tea-factory/employees/login", {
        name: username,
        password,
      });
      const accessToken = response.data.accessToken;
      const decodedToken = jwt_decode(accessToken);
      if (decodedToken.user.role === "HR Manager") {
        navigate("/EmployeeAdminPanal");
        console.log("Navigate to EmpAdminPanel");
        // Navigate to EmployeeAdminPanal
      } else if (decodedToken.user.role === "Inventory Manager") {
        // Navigate to InventoryAdminPanal
        navigate("/InventoryAdminPanal");
        console.log("Navigate to InventoryAdminPanel");
      } else if (decodedToken.user.role === "Suplier Manager") {
        // Navigate to SupplierAdminPanal
        navigate("/SupplierAdminPanal");
        console.log("Navigate to Suplier AdminPanel");
      } else if (decodedToken.user.role === "Production Manager") {
        // Navigate to ProductionAdminPanal
        navigate("/ProductionAdminPanal");
        console.log("Navigate to Production AdminPanel");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.message);
      // Here you can handle the error, such as displaying an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <br />
      <label>
        Password
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
