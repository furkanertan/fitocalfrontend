import React from "react";
import BmiIcon from "@mui/icons-material/Calculate";
import IdealWeightIcon from "@mui/icons-material/Scale";
import DailyCalorieIcon from "@mui/icons-material/Fastfood";
import FatBodyPercentageIcon from "@mui/icons-material/MonitorHeart";

export const Constants = {
  leftBarData: [
    {
      id: 2,
      title: "Bmi",
      path: "/bmi",
      icon: <BmiIcon />,
    },
    {
      id: 3,
      title: "Ideal Weight",
      path: "/ideal-weight",
      icon: <IdealWeightIcon />,
    },
    {
      id: 4,
      title: "Daily Calorie",
      path: "/daily-calorie",
      icon: <DailyCalorieIcon />,
    },
    {
      id: 5,
      title: "Fat Body Percentage",
      path: "/fat-body-percentage",
      icon: <FatBodyPercentageIcon />,
    },
  ],
};