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
import DeleteIcon from '@mui/icons-material/Delete';
import CalculateIcon from '@mui/icons-material/Calculate';
import React from 'react';

function IdealWeight() {
  const [gender, setGender] = React.useState('');
  const [age, setAge] = React.useState('');
  const [height, setHeight] = React.useState('');

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  return (
    <Box sx={{ flexGrow: 1 }} component={"form"}>
      <Grid container spacing={1} direction="column">
      <Grid item xs={6} sm={1}>
          <TextField
            label='Enter Age'
            id='outlined-start-adornment'
            sx={{ m: 1, width: "25ch" }}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type='number'
            InputProps={{
              inputProps: { min: 0, max: 1000 },
              endAdornment: (
                <InputAdornment position='end' />
              )
            }}
          />
          </Grid>
          <Grid item xs={6} sm={1}>
          <TextField
            label='Enter Height'
            id='outlined-start-adornment'
            sx={{ m: 1, width: "25ch" }}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type='number'
            InputProps={{
              inputProps: { min: 0, max: 1000 },
              endAdornment: (
                <InputAdornment position='end'>cm</InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={6} sm={1}>
        <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={gender}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Male</MenuItem>
          <MenuItem value={20}>Female</MenuItem>
        </Select>
        </Grid>
      
      <Grid item xs={12} sm={6}>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Clear
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" startIcon={<CalculateIcon />}>
          Calculate
        </Button>
      </Grid>
    </Grid>
    </Box>
  );
}

export default IdealWeight;