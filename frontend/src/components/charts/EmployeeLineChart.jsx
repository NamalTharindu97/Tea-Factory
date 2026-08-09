import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import Chart from "react-apexcharts";
import axios from "axios";
import { baseOptions, chartPalette } from "./base";

const MONTHS = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const EmployeeLineChart = ({ height = 320 }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/payrolls/totalNetPay")
      .then((res) => setData(res.data))
      .catch(() => setData([]));
  }, []);

  if (data === null) {
    return <Skeleton variant="rounded" height={height} />;
  }

  const byMonth = Array(12).fill(0);
  data.forEach((item) => {
    if (item._id >= 1 && item._id <= 12) byMonth[item._id - 1] = item.totalNetPay;
  });

  const series = [{ name: "Net Pay", data: byMonth.slice(0, 9) }];

  const options = {
    ...baseOptions(),
    chart: { ...baseOptions().chart, type: "line" },
    stroke: { curve: "smooth", width: 3 },
    colors: [chartPalette().accent],
    dataLabels: { enabled: false },
    xaxis: { categories: MONTHS.slice(0, 9) },
    yaxis: { labels: { formatter: (v) => new Intl.NumberFormat("en-LK").format(v) } },
    grid: { borderColor: chartPalette().grid, strokeDashArray: 4 },
  };

  return (
    <Box>
      <Chart options={options} series={series} type="line" height={height} />
    </Box>
  );
};

export default EmployeeLineChart;
