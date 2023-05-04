import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

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
  }, []);

  const filteredData = useMemo(() => {
    let filteredData = empData;
    if (age) {
      filteredData = filteredData.filter((item) => item.age <= age);
    }
    if (gender && gender.length > 0) {
      filteredData = filteredData.filter((item) => gender.includes(item.gender));
    }
    if (roleName && roleName.length > 0) {
      filteredData = filteredData.filter((item) => roleName.some((role) => item.role === role));
    }
    return filteredData;
  }, [empData, age, gender, roleName]);

  // Check if at least one of the props is defined
  if (!gender && !age && (!roleName || roleName.length === 0)) {
    return null;
  }

  return (
    <div>
      {filteredData.map((item) => (
        <div key={item.id}>
          <p>Name: {item.name}</p>
          <p>Email: {item.email}</p>
          <p>Phone: {item.phone}</p>
          <p>Gender: {item.gender}</p>
          <p>Age: {item.age}</p>
          <p>Role: {item.role}</p>
        </div>
      ))}
    </div>
  );
};
