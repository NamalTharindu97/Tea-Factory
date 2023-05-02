import "./barChart.scss";
import React from "react";
import { Bar } from "react-chartjs-2";
// import Chart from "chart.js/auto";

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Sales",
      backgroundColor: " #00e676",
      borderColor: " #00e676",
      borderWidth: 1,
      data: [65, 59, 80, 81, 56, 55],
    },
  ],
};

export const BarChart = ({ height, width }) => {
  return (
    <div className="barChart" style={{ height, width }}>
      <Bar
        data={data}
        options={{
          title: {
            display: true,
            text: "Sales by Month",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};
