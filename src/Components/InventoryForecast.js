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
  ListItem,
  List,
} from '@material-ui/core';
import axios from 'axios';
import { format } from 'date-fns';
import SimpleTable from './SimpleTable';

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
  list: {},
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
      <SimpleTable items={inventory} />
    </div>
  );
}
