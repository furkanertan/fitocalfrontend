import {
  Box,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function RecommendedExercises() {
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [exerciseLevel, setExerciseLevel] = React.useState("");
  const [result, setResult] = React.useState("");

  const toggleTableVisibility = (isClearOrCalculate) => {
    if (isClearOrCalculate === "clear") {
      setIsTableVisible(false);
    } else {
      setIsTableVisible(true);
    }
  };

  const handleExerciseLevelChange = (event) => {
    setExerciseLevel(event.target.value);
    //show table
    toggleTableVisibility("calculate");
    //call api
    getRecommendedExercises();
  };

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "type", headerName: "Type", width: 200 },
    { field: "level", headerName: "Level", width: 200 },
    { field: "set", headerName: "Set", width: 200 },
    { field: "repeat", headerName: "Repeat", width: 200 },
    { field: "link", headerName: "Link", width: 200 },
  ];

  const getRecommendedExercises = () => {
    axios
      .get(
        "http://localhost:8080/recommendedExercises/getRecommendedExercises",
        {
          params: { exerciseLevel: exerciseLevel },
        }
      )
      .then((response) => {
        setResult(response.data.json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }} component={"form"}>
      <Grid container spacing={1} direction="column">
        <Grid item xs={6} sm={1}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: "22%" }}>
              <InputLabel id="exercise-level-label">Exercise Level</InputLabel>
              <Select
                labelId="exercise-level-label"
                id="exercise-level-select"
                value={exerciseLevel}
                label="Exercise Level"
                onChange={handleExerciseLevelChange}
              >
                <MenuItem value={"Beginner"}>Beginner</MenuItem>
                <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                <MenuItem value={"Advanced"}>Advanced</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <br />
      {isTableVisible && (
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid
            rows={result}
            columns={columns}
            pageSize={12}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      )}
    </Box>
  );
}

export default RecommendedExercises;
