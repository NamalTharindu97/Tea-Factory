import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import Chart from "react-apexcharts";
import axios from "axios";
import { baseOptions, chartPalette } from "./base";

const MONTHS = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const EmployeeBarChart = ({ height = 320 }) => {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    axios
      .get("/employees/monthlyEmployeCount")
      .then((res) => setCounts(res.data))
      .catch(() => setCounts([]));
  }, []);

  if (counts === null) {
    return <Skeleton variant="rounded" height={height} />;
  }

  const byMonth = Array(12).fill(0);
  counts.forEach((item) => {
    if (item._id >= 1 && item._id <= 12) byMonth[item._id - 1] = item.count;
  });

  const series = [
    {
      name: "New Employees",
      data: byMonth,
    },
  ];

  const options = {
    ...baseOptions(),
    chart: { ...baseOptions().chart, type: "bar" },
    plotOptions: { bar: { borderRadius: 6, columnWidth: "55%" } },
    colors: [chartPalette().primary],
    dataLabels: { enabled: false },
    xaxis: { categories: MONTHS },
    yaxis: { labels: { formatter: (v) => Math.round(v) } },
    grid: { borderColor: chartPalette().grid, strokeDashArray: 4 },
    legend: { show: false },
  };

  return (
    <Box>
      <Chart options={options} series={series} type="bar" height={height} />
    </Box>
  );
};

export default EmployeeBarChart;
