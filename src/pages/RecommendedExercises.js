import {
  Box,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import YouTubeIcon from "@mui/icons-material/YouTube";

function RecommendedExercises() {
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [exerciseLevel, setExerciseLevel] = React.useState("");
  const [result, setResult] = React.useState([]);

  const toggleTableVisibility = (isClearOrCalculate) => {
    if (isClearOrCalculate === "clear") {
      setIsTableVisible(false);
    } else {
      setIsTableVisible(true);
    }
  };

  const handleExerciseLevelChange = (event) => {
    console.log(event.target.value + "****" + exerciseLevel);
    setExerciseLevel(event.target.value);
    //show table
    toggleTableVisibility("calculate");
    //call api
    getRecommendedExercises(event.target.value);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "type", headerName: "Type", width: 200 },
    { field: "level", headerName: "Level", width: 200 },
    { field: "set", headerName: "Set", width: 100 },
    { field: "repeat", headerName: "Repeat", width: 100 },
    {
      field: "link",
      headerName: "Link",
      width: 35,
      renderCell: (cellValues) => {
        return (
          <>
            <IconButton
              onClick={(event) => {
                window.open(
                  `https://www.youtube.com/results?search_query=${cellValues.row.name}`,
                  "_blank"
                );
              }}
            >
              <YouTubeIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const getRecommendedExercises = async (exerciseLevel) => {
    const { data, status } = await axios.get(
      "http://localhost:8080/recommendedExercises/getRecommendedExercises",
      {
        params: { exerciseLevel },
      }
    );
    if (status !== 200) return;
    setResult(data);
  };

  return (
    <Box sx={{ flexGrow: 1 }} component={"form"}>
      <Grid container spacing={1} direction="column">
        <Typography variant="h5">Get Recommended Exercises</Typography>
        <br />
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
        {isTableVisible && (
          <Grid item xs={12} sm={1} display={"flex"} justifyContent={"center"}>
            <Box
              component={"div"}
              sx={{
                height: 511,
                width: "71%",
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
      </Grid>
    </Box>
  );
}

export default RecommendedExercises;
