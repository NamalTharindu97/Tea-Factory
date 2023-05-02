import "./pieChart.scss";
import React from "react";
import { Pie } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";

export const PieChart = () => {
  const data = {
    labels: ["Red", "Blue"],
    datasets: [
      {
        label: "# of Votes",
        data: [19, 3],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      // title: {
      //   display: true,
      //   text: "Pie Chart",
      // },
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  };
  return (
    <div className="pieChart">
      <div className="pie-component-container">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};
