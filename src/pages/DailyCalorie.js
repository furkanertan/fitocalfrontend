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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function DailyCalorie() {
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [activityLevel, setActivityLevel] = React.useState("");
  const [result, setResult] = React.useState([]);
  const customId = React.useId();

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
    calculateDailyCalorie();
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

  const calculateDailyCalorie = () => {
    axios
      .post("http://localhost:8080/dailyCalorie/calculateDailyCalorie", data, {
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

  return (
    <Box sx={{ flexGrow: 1 }} component={"form"}>
      <Grid container spacing={1} direction="column">
        <Typography variant="h5">Calculate Daily Required Calorie</Typography>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Maintain Weight</TableCell>
                <TableCell align="right">Mild Weight Loss</TableCell>
                <TableCell align="right">Weight Loss</TableCell>
                <TableCell align="right">Extreme Weight Loss</TableCell>
                <TableCell align="right">Mild Weight Gain</TableCell>
                <TableCell align="right">Weight Gain</TableCell>
                <TableCell align="right">Fast Weight Gain</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={customId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{result?.maintainWeight}</TableCell>
                <TableCell align="right">{result?.mildWeightLoss}</TableCell>
                <TableCell align="right">{result?.weightLoss}</TableCell>
                <TableCell align="right">{result?.extremeWeightLoss}</TableCell>
                <TableCell align="right">{result?.mildWeightGain}</TableCell>
                <TableCell align="right">{result?.weightGain}</TableCell>
                <TableCell align="right">{result?.fastWeightGain}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default DailyCalorie;
