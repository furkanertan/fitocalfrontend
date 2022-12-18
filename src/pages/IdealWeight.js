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

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  return (
    <Box sx={{ flexGrow: 1 }} component={"form"}>
      <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
          <TextField
            label='Age'
            id='outlined-start-adornment'
            sx={{ m: 1, width: "25ch" }}
            type='number'
            InputProps={{
              inputProps: { min: 0, max: 200 },
              startAdornment: (
                <InputAdornment position='start'></InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Height'
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
        <Grid>
        <InputLabel id="demo-simple-select-autowidth-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={gender}
          onChange={handleChange}
          autoWidth
          label="Gender"
        >
        <MenuItem value="">
            <em>Select Gender</em>
          </MenuItem>
          <MenuItem value={10}>Male</MenuItem>
          <MenuItem value={21}>Female</MenuItem>
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