import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./dataFilter.scss";
import { generatePDF } from "../GeneratePdf/generatePDF";
import { motion } from "framer-motion";
import { scaleVariantCard } from "../../../asserts/EmployeAs/data/FramerMotionVarients";

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
  const windowRefresh = () => {
    window.location.reload(true);
  };

  const handleGeneratePDF = () => {
    generatePDF({ data: filteredData });
  };
  return (
    <div className="filter">
      <div className="filter-upper">
        <div className="upper-right">
          <div className="btn-container">
            <p className="btn-tag reset" onClick={windowRefresh}>
              <RefreshIcon style={{ width: 15, height: 15, marginTop: 1, color: "#00e676" }} />
              Reset
            </p>
            <p className="btn-tag save" onClick={handleGeneratePDF}>
              <SaveAsIcon style={{ width: 14, height: 14, marginTop: 1, color: "#00e676" }} />
              Save
            </p>
          </div>
        </div>
      </div>
      <div className="filter-lower">
        <div className="filter-lower-class">
          <div className="cards-container">
            {filteredData.map((item) => (
              <motion.div className="card" variants={scaleVariantCard} initial="initial" animate="animate">
                <div className="photo-container">
                  <img src={item.img} alt="logo" width="60" height="50" className="card-photo" />
                </div>
                <div></div>
                <p className="head-tag-card">{item.name}</p>
                <p className="card-item">Email: {item.email}</p>
                <p className="card-item">Phone: {item.phone}</p>
                <p className="card-item">Gender: {item.gender}</p>
                <p className="card-item">Age: {item.age}</p>
                <p className="card-item">Role: {item.role}</p>
                <p className="card-item">Join: {new Date(item.createdAt).toLocaleDateString()}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
