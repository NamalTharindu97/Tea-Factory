import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import Chart from "react-apexcharts";
import axios from "axios";
import { baseOptions, chartPalette } from "./base";

export const InventoryAreaChart = ({ height = 320 }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/inventory/")
      .then((res) => setData(res.data))
      .catch(() => setData([]));
  }, []);

  if (data === null) {
    return <Skeleton variant="rounded" height={height} />;
  }

  const labels = data.map((item) => (item.name ? item.name : item.Id || ""));
  const quantities = data.map((item) => Number(item.quantity) || 0);

  const series = [{ name: "Quantity (KG)", data: quantities }];

  const options = {
    ...baseOptions(),
    chart: { ...baseOptions().chart, type: "area" },
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05 },
    },
    colors: [chartPalette().primary],
    dataLabels: { enabled: false },
    xaxis: { categories: labels, labels: { rotate: -45 } },
    yaxis: { labels: { formatter: (v) => new Intl.NumberFormat("en-LK").format(v) } },
    grid: { borderColor: chartPalette().grid, strokeDashArray: 4 },
  };

  return (
    <Box>
      <Chart options={options} series={series} type="area" height={height} />
    </Box>
  );
};

export default InventoryAreaChart;
