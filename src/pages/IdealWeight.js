import {
  Box,
  InputAdornment,
  TextField,
  Grid,
  Button,
  InputLabel,
  Select,
  MenuItem,
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

function IdealWeight() {
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [age, setAge] = React.useState("");
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
  };

  const calculateIdealWeight = () => {
    axios
      .get("http://localhost:8080/idealWeight/calculateIdealWeight", {
        params: {
          age: age,
          height: height,
          gender: gender === "Male" ? "M" : "F",
        },
      })
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const calculateButtonFunction = () => {
    if (age === "" || height === "" || gender === "") {
      alert("Please enter all required fields!");
      return;
    }
    //show table
    toggleTableVisibility("calculate");
    //call api
    calculateIdealWeight();
  };

  const clearButtonFunction = () => {
    //hide table
    toggleTableVisibility("clear");
    //clear text fields
    clearAllFields();
  };

  return (
    <Box sx={{ flexGrow: 1 }} component={"form"}>
      <Grid container spacing={1} direction="column">
        <Grid item xs={6} sm={1}>
          <TextField
            label="Enter Age"
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
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
            sx={{ m: 1, width: "25ch" }}
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
          <InputLabel id="gender-select"></InputLabel>
          <Select
            labelId="gender-select"
            id="gender-select"
            value={"M"}
            sx={{ m: 1, width: "25ch" }}
            label="Gender"
            onChange={handleGenderChange}
          >
            <MenuItem value={"M"}>Male</MenuItem>
            <MenuItem value={"F"}>Female</MenuItem>
          </Select>
        </Grid>

        <Grid container spacing={1} direction="row">
          <Grid
            item
            xs={12}
            sm={6}
            display={"flex"}
            justifyContent={"flex-end"}
          >
            <Button
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
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Formula</TableCell>
                <TableCell align="right">Ideal Weight</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(result).map((row) => (
                <TableRow
                  key={row.idealWeight}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.formula}</TableCell>
                  <TableCell align="right">{row.idealWeight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default IdealWeight;
