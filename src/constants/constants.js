import React from "react";
import BmiIcon from "@mui/icons-material/Calculate";
import IdealWeightIcon from "@mui/icons-material/Scale";
import DailyCalorieIcon from "@mui/icons-material/Fastfood";
import BodyFatPercentageIcon from "@mui/icons-material/MonitorHeart";
import RecommendedExercisesIcon from "@mui/icons-material/DirectionsRun";
import GenerateBodyReport from "@mui/icons-material/Description";

export const Constants = {
  leftBarData: [
    {
      id: 2,
      title: "Bmi",
      path: "/bmi",
      icon: <BmiIcon style={{ color: "#DED8D7" }} />,
    },
    {
      id: 3,
      title: "Ideal Weight",
      path: "/ideal-weight",
      icon: <IdealWeightIcon style={{ color: "#DED8D7" }} />,
    },
    {
      id: 4,
      title: "Daily Calorie",
      path: "/daily-calorie",
      icon: <DailyCalorieIcon style={{ color: "#DED8D7" }} />,
    },
    {
      id: 5,
      title: "Body Fat Percentage",
      path: "/body-fat-percentage",
      icon: <BodyFatPercentageIcon style={{ color: "#DED8D7" }} />,
    },
    {
      id: 6,
      title: "Recommended Exercises",
      path: "/recommended-exercises",
      icon: <RecommendedExercisesIcon style={{ color: "#DED8D7" }} />,
    },
    {
      id: 7,
      title: "Generate Body Report",
      path: "/generate-body-report",
      icon: <GenerateBodyReport style={{ color: "#DED8D7" }}/>,
    },
  ],
};