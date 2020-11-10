import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Card,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
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
  const currentYear = format(new Date(), 'yyyy');
  const [inventory, setInventory] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    axios({
      method: 'POST',
      url: 'http://localhost:4000/inventory',
      data: { month: selectedMonth, year: selectedYear },
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
      <FormControl>
        <TextField
          type="month"
          variant="outlined"
          defaultValue={`${currentYear}-${currentMonth}`}
          onChange={(e) => {
            setSelectedYear(e.target.value.substring(0, 4));
            setSelectedMonth(e.target.value.substring(5, 7));
          }}
        />
      </FormControl>

      {inventoryData.length === 0 ? <h1>No Data</h1> : inventoryData}
    </div>
  );
}
