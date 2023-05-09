import "./payroll.scss";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { motion } from "framer-motion";
import { scaleVariant } from "../../../asserts/EmployeAs/data/FramerMotionVarients";

export const Payroll = () => {
  const [totalNetPay, setTotalNetPay] = useState([]);

  useEffect(() => {
    const fetchMonthlyCounts = async () => {
      const { data } = await axios.get("/payrolls/totalNetPay");
      setTotalNetPay(data);
    };

    fetchMonthlyCounts();
  }, []);

  const countsByMonth = Array(9).fill(0);

  totalNetPay.forEach((item) => {
    const monthIndex = item._id - 1;
    countsByMonth[monthIndex] = item.totalNetPay;
  });

  const data = {
    labels: ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep"],
    datasets: [
      {
        label: "Total Net Pay by Month",
        data: countsByMonth,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <motion.div className="payroll" variants={scaleVariant} initial="initial" animate="animate">
      <Line data={data} options={options} width={1000} height={300} />
    </motion.div>
  );
};
