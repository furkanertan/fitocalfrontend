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

function BodyFatPercentage() {
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [age, setAge] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [result, setResult] = React.useState("");

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
    setGender("");
    setWeight("");
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const calculateButtonFunction = () => {
    if (age === "" || height === "" || gender === "" || weight === "") {
      errorAlert();
      return;
    }
    //show table
    toggleTableVisibility("calculate");
    //call api
    calculateBodyFatPercentage();
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
  };

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  };

  const calculateBodyFatPercentage = () => {
    axios
      .post(
        "http://localhost:8080/bodyFatPercentage/getBodyFatPercentage",
        data,
        { headers: headers }
      )
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
        <Typography variant="h5">Calculate Body Fat Percentage</Typography>
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
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
      {isTableVisible && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Body Type</TableCell>
                <TableCell align="right">Body Fat Percentage Rate</TableCell>
                <TableCell align="right">Body Fat Mass</TableCell>
                <TableCell align="right">Lean Body Mass</TableCell>
                <TableCell align="right">Bmi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={result?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{result?.type}</TableCell>
                <TableCell align="right">
                  {Number.parseFloat(result?.bodyFatPercentageRate).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {Number.parseFloat(result?.bodyFatMass).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {Number.parseFloat(result?.leanBodyMass).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {Number.parseFloat(result?.bmi).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default BodyFatPercentage;
