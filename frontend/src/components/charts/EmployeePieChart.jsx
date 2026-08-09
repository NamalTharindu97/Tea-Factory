import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import Chart from "react-apexcharts";
import axios from "axios";
import { baseOptions, chartPalette } from "./base";

export const EmployeePieChart = ({ height = 320 }) => {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    axios
      .get("/employees/genderCount")
      .then((res) => setCounts({ male: res.data.maleCount, female: res.data.femaleCount }))
      .catch(() => setCounts({ male: 0, female: 0 }));
  }, []);

  if (counts === null) {
    return <Skeleton variant="rounded" height={height} />;
  }

  const series = [Number(counts.male) || 0, Number(counts.female) || 0];

  const options = {
    ...baseOptions(),
    labels: ["Male", "Female"],
    colors: [chartPalette().info, chartPalette().danger],
    legend: { position: "bottom", horizontalAlign: "center" },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: "62%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => series.reduce((a, b) => a + b, 0),
            },
          },
        },
      },
    },
    tooltip: { y: { formatter: (v) => `${v} employees` } },
  };

  return (
    <Box>
      <Chart options={options} series={series} type="donut" height={height} />
    </Box>
  );
};

export default EmployeePieChart;
