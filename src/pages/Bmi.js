import {
  Box,
  InputAdornment,
  TextField,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CalculateIcon from "@mui/icons-material/Calculate";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";

function Bmi() {
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [bmi, setBmi] = React.useState("");
  const [bmiCategory, setBmiCategory] = React.useState("");
  const [resHeight, setResHeight] = React.useState("");
  const [resWeight, setResWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [resultMessage, setResultMessage] = React.useState("");

  const toggleTableVisibility = (isClearOrCalculate) => {
    if (isClearOrCalculate === "clear") {
      setIsTableVisible(false);
    } else {
      setIsTableVisible(true);
    }
  };

  const clearAllFields = () => {
    setHeight("");
    setWeight("");
  };

  const calculateButtonFunction = () => {
    if (height === "" || weight === "") {
      errorAlert();
      return;
    }
    //show table
    toggleTableVisibility("calculate");
    //call api
    getBmi();
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

  const getBmi = () => {
    axios
      .get("http://localhost:8080/bmi/getBmi", {
        params: { height: height, weight: weight },
      })
      .then((response) => {
        console.log(response);
        setBmi(response.data.bmi);
        setBmiCategory(response.data.bmiCategory);
        setResHeight(response.data.height);
        setResWeight(response.data.weight);
        setResultMessage(response.data.resultMessage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }} component={"form"}>
      <Grid container spacing={1} direction="column">
        <Typography variant="h5">Calculate Body Mass Index (BMI)</Typography>
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
        <>
          <Typography display={"flex"} justifySelf={"flex-start"} variant="h5">
            Result:
          </Typography>
          <Typography display={"flex"} justifySelf={"flex-start"} variant="h6">
            Healthy BMI range: 18.5 - 25
          </Typography>
          <Typography display={"flex"} justifySelf={"flex-start"} variant="h6">
            {resultMessage}
          </Typography>
        </>
      )}
      {isTableVisible && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Height (cm)</TableCell>
                <TableCell align="right">Weight&nbsp;(kg)</TableCell>
                <TableCell align="right">Bmi</TableCell>
                <TableCell align="right">Bmi Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={resHeight}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{resHeight}</TableCell>
                <TableCell align="right">{resWeight}</TableCell>
                <TableCell align="right">
                  {Number.parseFloat(bmi).toFixed(1)}
                </TableCell>
                <TableCell align="right">{bmiCategory}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default Bmi;
