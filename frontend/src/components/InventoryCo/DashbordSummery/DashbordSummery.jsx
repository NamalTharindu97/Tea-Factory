import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardSummary.css";

const DashboardSummary = ({ name }) => {
  const [count, setCount] = useState();
  const [percentage, setPercentage] = useState();

  useEffect(() => {
    const getQuantityCount = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/tea-factory/inventory/count/getquantity");
        const data = response.data.totalQty;

        setCount(data);

        const maxValue = 5000; // Set your maximum value here
        const calculatedPercentage = (data / maxValue) * 100;
        const formattedPercentage = calculatedPercentage.toFixed(1); // Format the percentage to one decimal place
        setPercentage(formattedPercentage);
      } catch (error) {
        console.error(error);
      }
    };

    getQuantityCount();
  }, []);

  return (
    <div className="dashboard-summary-card">
      <div className="card-container">
        <h3 className="card-title">Storage Summary</h3>
        <p className="card-value">
          <b>Tea Leaf</b>
        </p>
        <p className="card-value">
          <b>Total Quantity:</b> <br />
          {count} Kg / 5000 Kg
        </p>
        <p className="card-value">
          <b>Capacity Usage:</b> <br />
          {percentage}%
        </p>
        <div className="load-bar-container">
          <div
            className="load-bar"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
