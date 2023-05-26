import React, { useState, useEffect } from "react";
import "./AnalyticsCard.css";
import { motion } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";
import Chart from "react-apexcharts";
import axios from "axios";
import { UilTimes } from "@iconscout/react-unicons";

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  return <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />;
};

// ExpandedCard
function ExpandedCard({ param, setExpanded }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/v1/tea-factory/inventory/")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const quantityData = data.map((item) => item.quantity);

  const series = [
    {
      name: "Quantity",
      data: quantityData,
    },
  ];

  const chartOptions = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      fill: {
        color: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
    },
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        <Chart series={series} type="area" options={chartOptions} />
      </div>
      <span></span>
    </motion.div>
  );
}

export default Card;
