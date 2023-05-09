import axios from "axios";
import "./barChart.scss";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { scaleVariant, scaleVariantInner } from "../../../asserts/EmployeAs/data/FramerMotionVarients";

export const BarChart = () => {
  const [monthlyCounts, setMonthlyCounts] = useState([]);

  useEffect(() => {
    const fetchMonthlyCounts = async () => {
      const { data } = await axios.get("/employees/monthlyEmployeCount");
      setMonthlyCounts(data);
    };

    fetchMonthlyCounts();
  }, []);

  // Create an array of counts for each month
  const countsByMonth = Array(6).fill(0);

  monthlyCounts.forEach((item) => {
    countsByMonth[item._id - 1] = item.count;
  });

  const data = {
    labels: ["Jan", "Feb", "Mar", "April", "May", "June"],
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
    <motion.div className="barChart" variants={scaleVariant} initial="initial" animate="animate">
      <motion.div className="inner-bar-component" variants={scaleVariantInner} initial="initial" animate="animate">
        <Bar
          data={data}
          options={{
            title: {
              display: true,
              text: "Employee Count by Month",
              fontSize: 30,
              color: "#ffffff !important",
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </motion.div>
    </motion.div>
  );
};
