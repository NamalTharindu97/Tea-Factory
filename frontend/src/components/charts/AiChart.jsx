import React from "react";
import { Box } from "@mui/material";
import Chart from "react-apexcharts";
import { baseOptions, chartPalette, currencyFormatter } from "./base";

// Renders a chart from the { type, labels, data } shape returned by the AI assistant.
export const AiChart = ({ series, height = 220 }) => {
  if (!series || !Array.isArray(series.data)) return null;

  const { type, labels = [], data = [] } = series;

  if (type === "pie") {
    const options = {
      ...baseOptions(),
      labels,
      colors: [chartPalette().info, chartPalette().danger],
      legend: { position: "bottom" },
      dataLabels: { enabled: false },
      tooltip: { y: { formatter: (v) => `${v} employees` } },
    };
    return (
      <Box>
        <Chart options={options} series={data} type="donut" height={height} />
      </Box>
    );
  }

  const isMoney = data.some((d) => Number(d) > 1000);
  const options = {
    ...baseOptions(),
    chart: { ...baseOptions().chart, type: type === "bar" ? "bar" : "line" },
    stroke: { curve: "smooth", width: 2.5 },
    colors: [chartPalette().accent],
    dataLabels: { enabled: false },
    xaxis: { categories: labels },
    yaxis: { labels: { formatter: (v) => (isMoney ? currencyFormatter(v) : v) } },
    grid: { borderColor: chartPalette().grid, strokeDashArray: 4 },
  };

  return (
    <Box>
      <Chart options={options} series={[{ name: "Value", data }]} type={type === "bar" ? "bar" : "line"} height={height} />
    </Box>
  );
};

export default AiChart;
