import {
  Box,
  InputAdornment,
  TextField,
  Grid,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CalculateIcon from "@mui/icons-material/Calculate";
import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function DailyCalorie() {
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [activityLevel, setActivityLevel] = React.useState("");
  const [result, setResult] = React.useState([]);

  const toggleTableVisibility = (isClearOrCalculate) => {
    if (isClearOrCalculate === "clear") {
      setIsTableVisible(false);
    } else {
      setIsTableVisible(true);
    }
  };

  const clearAllFields = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setGender("");
    setActivityLevel("");
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleActivityLevelChange = (event) => {
    setActivityLevel(event.target.value);
  };

  const calculateButtonFunction = () => {
    if (
      age === "" ||
      height === "" ||
      gender === "" ||
      weight === "" ||
      activityLevel === ""
    ) {
      errorAlert();
      return;
    }
    //show table
    toggleTableVisibility("calculate");
    //call api
    generateBodyReport();
  };

  const clearButtonFunction = () => {
    //hide table
    toggleTableVisibility("clear");
    //clear text fields
    clearAllFields();
  };

  const errorAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all required fields!",
    });
  };

  const data = {
    height: height,
    weight: weight,
    age: age,
    gender: gender,
    activity: activityLevel,
    formula: "Mifflin",
  };

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  };

  const generateBodyReport = () => {
    axios
      .post("http://localhost:8080/generateBodyReport/generateReport", data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    { field: "age", headerName: "Age", width: 50 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "height", headerName: "Height (cm)", width: 150 },
    { field: "weight", headerName: "Weight (kg)", width: 150 },
    { field: "bmi", headerName: "BMI", width: 100 },
    { field: "bodyType", headerName: "Body Type", width: 150 },
    { field: "idealWeight", headerName: "Ideal Weight", width: 150 },
    {
      field: "bodyFatPercentageRate",
      headerName: "Body Fat Percentage Rate",
      width: 200,
    },
    { field: "bodyFatMass", headerName: "Body Fat Mass", width: 150 },
    { field: "leanBodyMass", headerName: "Lean Fat Mass", width: 150 },
    {
      field: "calorieToLoseWeight",
      headerName: "Calorie (Lose Weight)",
      width: 175,
    },
    {
      field: "calorieToStaySame",
      headerName: "Calorie (Maintain)",
      width: 175,
    },
    {
      field: "calorieToGainWeight",
      headerName: "Calorie (Gain Weight)",
      width: 175,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }} component={"form"}>
      <Grid container spacing={1} direction="column">
        <Typography variant="h5">Generate Body Report</Typography>
        <Grid item xs={6} sm={1}>
          <TextField
            label="Enter Age"
            id="outlined-start-adornment"
            sx={{ m: 1, width: "22%" }}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            InputProps={{
              inputProps: { min: 0, max: 1000 },
              endAdornment: <InputAdornment position="end" />,
            }}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            label="Enter Height"
            id="outlined-start-adornment"
            sx={{ m: 1, width: "22%" }}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="number"
            InputProps={{
              inputProps: { min: 0, max: 1000 },
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <TextField
            label="Enter Weight"
            id="outlined-start-adornment"
            sx={{ m: 1, width: "22%" }}
            type="number"
            onChange={(e) => setWeight(e.target.value)}
            value={weight}
            InputProps={{
              inputProps: { min: 0, max: 1000 },
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: "22%" }}>
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Select
                labelId="gender-select-label"
                id="gender-select"
                value={gender}
                label="Gender"
                onChange={handleGenderChange}
              >
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6} sm={1}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: "22%" }}>
              <InputLabel id="activity-level-select-label">
                Activity Level
              </InputLabel>
              <Select
                labelId="activity-level-select-label"
                id="activity-level-select"
                value={activityLevel}
                label="Activity Level"
                onChange={handleActivityLevelChange}
              >
                <MenuItem value={"BMR"}>Basal Metabolic Rate(BMR)</MenuItem>
                <MenuItem value={"SDN"}>
                  Sedentary: little or no exercise
                </MenuItem>
                <MenuItem value={"LGT"}>
                  Lightly Active: exercise/sports 1-3 days/week
                </MenuItem>
                <MenuItem value={"MDR"}>
                  Moderately Active: exercise 4-5 days/week
                </MenuItem>
                <MenuItem value={"ACT"}>
                  Active: daily exercise or exercise 3-4 days/week
                </MenuItem>
                <MenuItem value={"VRY"}>
                  Very Active: intense exercise/sports 6-7 days/week
                </MenuItem>
                <MenuItem value={"EXT"}>
                  Extra active: very intense exercise/sports & physical job
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <br />
        <Grid container spacing={1} direction="row">
          <Grid
            item
            xs={12}
            sm={6}
            display={"flex"}
            justifyContent={"flex-end"}
          >
            <Button
              sx={{ width: "21%" }}
              variant="outlined"
              onClick={clearButtonFunction}
              startIcon={<DeleteIcon />}
            >
              Clear
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            display={"flex"}
            justifyContent={"flex-start"}
          >
            <Button
              sx={{ width: "22%" }}
              variant="contained"
              onClick={calculateButtonFunction}
              startIcon={<CalculateIcon />}
            >
              Calculate
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <br />
      {isTableVisible && (
        <Grid item xs={12} sm={1} display={"flex"} justifyContent={"center"}>
          <Box
            component={"div"}
            sx={{
              height: 511,
              width: "100%",
            }}
          >
            <DataGrid
              rows={result}
              columns={columns}
              pageSize={7}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Grid>
      )}
    </Box>
  );
}

export default DailyCalorie;
