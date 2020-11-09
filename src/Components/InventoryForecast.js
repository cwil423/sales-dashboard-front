import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Card,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import axios from 'axios';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: '35px',
  },
  formControl: {
    margin: theme.spacing(1),
    width: theme.spacing(24),
    minWidth: 120,
  },
  filters: {
    margin: theme.spacing(1),
  },
}));

export default function InventoryForecast() {
  const classes = useStyles();
  const currentMonth = format(new Date(), 'MM');
  const [inventory, setInventory] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  useEffect(() => {
    axios({
      method: 'POST',
      url: 'http://localhost:4000/inventory',
      data: { month: selectedMonth },
    }).then((response) => setInventory(response.data));
  }, [selectedMonth]);

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const inventoryData = inventory.map((item) => {
    return (
      <div>
        <Typography className={classes.filters}>
          {item.product_name}: {item.sum} Filters
        </Typography>
      </div>
    );
  });

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select onChange={handleChange}>
          <MenuItem value="01">January</MenuItem>
          <MenuItem value="02">February</MenuItem>
          <MenuItem value="03">March</MenuItem>
          <MenuItem value="04">April</MenuItem>
          <MenuItem value="05">May</MenuItem>
          <MenuItem value="06">June</MenuItem>
          <MenuItem value="07">July</MenuItem>
          <MenuItem value="08">August</MenuItem>
          <MenuItem value="09">September</MenuItem>
          <MenuItem value="10">October</MenuItem>
          <MenuItem value="11">November</MenuItem>
          <MenuItem value="12">December</MenuItem>
        </Select>
      </FormControl>

      {inventoryData.length === 0 ? <h1>No Data</h1> : inventoryData}
    </div>
  );
}
