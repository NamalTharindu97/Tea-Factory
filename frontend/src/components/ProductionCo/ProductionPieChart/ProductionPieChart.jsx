import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const ProductionPieChart = () => {
  const [batchData, setBatchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/productions/"); 
        setBatchData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const getBatchCounts = () => {
    const counts = {};

    batchData.forEach((item) => {
      const { batchNumber } = item;

      if (counts[batchNumber]) {
        counts[batchNumber] += 1;
      } else {
        counts[batchNumber] = 1;
      }
    });

    return counts;
  };

  const getCountData = () => {
    const counts = getBatchCounts();

    const labels = Object.keys(counts);
    const data = Object.values(counts);

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    
  };

  const countData = getCountData();

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <div className="pie-component-container">
        <Pie data={countData} options={options} />
      </div>
    </div>
  );
};

export default ProductionPieChart;
