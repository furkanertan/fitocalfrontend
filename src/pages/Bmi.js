import {
  Box,
  InputAdornment,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CalculateIcon from '@mui/icons-material/Calculate';
import axios from "axios";
import React from 'react';

function Bmi() {
  const [bmi, setBmi] = React.useState('');
  const getBmi = () => {
    axios.get("http://localhost:8080/bmi/getBmi", {
      params: { height: 190, weight: 55 }
    })
      .then((response) => {
        console.log(response);
        setBmi(response.data.bmi);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }} component={"form"}>
      <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
          <TextField
            label='Enter Height'
            id='outlined-start-adornment'
            sx={{ m: 1, width: "25ch" }}
            type='number'
            InputProps={{
              inputProps: { min: 0, max: 1000 },
              startAdornment: (
                <InputAdornment position='start'>cm</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Enter Weight'
            id='outlined-start-adornment'
            sx={{ m: 1, width: "25ch" }}
            type='number'
            InputProps={{
              inputProps: { min: 0, max: 1000 },
              startAdornment: (
                <InputAdornment position='start'>kg</InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Clear
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" onClick={getBmi} startIcon={<CalculateIcon />}>
          Calculate
        </Button>
      </Grid>
      {bmi && <h1>{bmi}</h1> }
    </Box>
  );
}

export default Bmi;