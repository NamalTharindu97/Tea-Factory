import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import "./dataFilter.scss";

export const DataFilter = ({ gender, age, roleName }) => {
  const [empData, setEmpData] = useState([]);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await axios.get("/employees/");
        setEmpData(response.data.map((emp) => ({ ...emp, id: emp._id })));
      } catch (error) {
        console.log(error);
      }
    };

    getEmployee();
  }, [gender, age, roleName]);

  const filteredData = useMemo(() => {
    let filteredData = empData;
    if (age) {
      filteredData = filteredData.filter((item) => item.age <= age);
    }
    if (gender && gender.length > 0) {
      if (Array.isArray(gender)) {
        filteredData = filteredData.filter((item) => gender.includes(item.gender));
      } else {
        filteredData = filteredData.filter((item) => item.gender === gender);
      }
    }
    if (roleName && roleName.length > 0) {
      filteredData = filteredData.filter((item) => roleName.some((role) => item.role === role));
    }
    return filteredData;
  }, [empData, age, gender, roleName]);

  if ((!gender || gender.length === 0) && !age && (!roleName || roleName.length === 0)) {
    return null;
  }

  return (
    <div className="cards-container">
      {filteredData.map((item) => (
        <div key={item.id} className="card">
          <p className="head-tag-card">{item.name}</p>
          <p className="card-item">Email: {item.email}</p>
          <p className="card-item">Phone: {item.phone}</p>
          <p className="card-item">Gender: {item.gender}</p>
          <p className="card-item">Age: {item.age}</p>
          <p className="card-item">Role: {item.role}</p>
        </div>
      ))}
    </div>
  );
};
