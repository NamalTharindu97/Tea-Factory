import axios from "axios";
import "./barChart.scss";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export const BarChart = () => {
  const [monthlyCounts, setMonthlyCounts] = useState([]);

  useEffect(() => {
    const fetchMonthlyCounts = async () => {
      const { data } = await axios.get("/employees/monthlyEmployeCount");
      setMonthlyCounts(data);
    };

    fetchMonthlyCounts();
  }, []);
  console.log(monthlyCounts);

  // Create an array of counts for each month
  const countsByMonth = Array(6).fill(0);

  monthlyCounts.forEach((item) => {
    countsByMonth[item._id - 1] = item.count;
  });

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Employee Count by Month",
        backgroundColor: "#00e676",
        borderColor: "#00e676",
        borderWidth: 1,
        // Map the counts to the corresponding month
        data: countsByMonth,
      },
    ],
  };

  return (
    <div className="barChart">
      <div className="inner-bar-component">
        <Bar
          data={data}
          options={{
            title: {
              display: true,
              text: "Employee Count by Month",
              fontSize: 30,
              color: "white", // Add this line to set the label color
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    </div>
  );
};
