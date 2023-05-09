import "./pieChart.scss";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import axios from "axios";
import { motion } from "framer-motion";
import { scaleVariant } from "../../../asserts/EmployeAs/data/FramerMotionVarients";

export const PieChart = () => {
  const [male, setMale] = useState();
  const [female, setFemale] = useState();

  useEffect(() => {
    const getGenderCount = async () => {
      try {
        const response = await axios.get("/employees/genderCount");
        setMale(response.data.maleCount);
        setFemale(response.data.femaleCount);
      } catch (error) {
        console.log(error);
      }
    };
    getGenderCount();
  }, []);

  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "# of Votes",
        data: [male, female],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Male and Female Distribution",
        padding: 0,
        color: "white",
        font: {
          family: "Poppins", // replace with your desired font family
        },
      },

      legend: {
        position: "bottom",
        labels: {
          boxWidth: 15,
        },
        color: "white",
        font: {
          family: "Poppins", // replace with your desired font family
          weight: "600", // set font weight to semibold
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
    <motion.div className="pieChart" variants={scaleVariant} initial="initial" animate="animate">
      <div className="pie-component-container">
        <Pie data={data} options={options} />
      </div>
    </motion.div>
  );
};
