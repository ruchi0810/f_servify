import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const BarChartComponent = () => {
  // Example static monthly bookings data
  const monthlyBookingsData = [
    { month: "January", canceled: 5, completed: 20 },
    { month: "February", canceled: 8, completed: 15 },
    { month: "March", canceled: 3, completed: 18 },
    { month: "April", canceled: 3, completed: 18 },

    // Add data for other months
  ];

  const xAxisData = monthlyBookingsData.map((entry) => entry.month);
  const canceledData = monthlyBookingsData.map((entry) => entry.canceled);
  const completedData = monthlyBookingsData.map((entry) => entry.completed);

  const seriesData = [
    {
      data: canceledData,
      name: "Canceled Bookings",
      label: "Canceled bookings    ",
    },
    {
      data: completedData,
      name: "Completed Bookings",
      label: "Completed bookings",
    },
  ];

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: xAxisData }]}
      series={seriesData}
      width={500}
      height={300}
    />
  );
};

export default BarChartComponent;
