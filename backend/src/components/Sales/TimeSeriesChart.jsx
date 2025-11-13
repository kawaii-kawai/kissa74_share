// src/components/Sales/TimeSeriesChart.jsx
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Box } from "@mui/material";

export const TimeSeriesChart = ({ data, options }) => (
  <Box sx={{ height: 400 }}>
    <Line data={data} options={options} />
  </Box>
);
