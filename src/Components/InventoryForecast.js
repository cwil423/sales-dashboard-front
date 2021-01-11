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
  Divider,
} from '@material-ui/core';

import axios from 'axios';
import { format } from 'date-fns';
import InventoryForecastTable from './InventoryForecastTable';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: '35px',
  },
  topSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '75%',
  },
  formControl: {
    margin: theme.spacing(1),
    width: theme.spacing(24),
    minWidth: 120,
  },
  filters: {
    margin: theme.spacing(1),
  },
  inventoryHeader: {
    marginBottom: '10px',
    paddingBottom: '10px',
  },
  monthBox: {
    marginBottom: '20px',
  },
  forecastTable: {
    width: '80%',
  },
}));

export default function InventoryForecast() {
  const classes = useStyles();
  const currentMonth = format(new Date(), 'MM');
  const currentYear = format(new Date(), 'yyyy');
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    let mounted = true;
    axios({
      method: 'POST',
      url: 'http://localhost:4000/inventory',
      data: { month: selectedMonth, year: selectedYear },
    }).then((response) => {
      if (mounted) {
        setInventory(response.data);
      }
      return () => {
        mounted = false;
      };
    });
  }, [selectedMonth]);

  return (
    <div className={classes.root}>
      <div className={classes.topSection}>
        <div>
          <Typography className={classes.inventoryHeader}>
            Inventory Requirements by Month
          </Typography>
        </div>
        <div className={classes.monthBox}>
          <FormControl>
            <TextField
              size="small"
              type="month"
              variant="outlined"
              defaultValue={`${currentYear}-${currentMonth}`}
              onChange={(e) => {
                setSelectedYear(e.target.value.substring(0, 4));
                setSelectedMonth(e.target.value.substring(5, 7));
              }}
            />
          </FormControl>
        </div>
      </div>
      <div className={classes.forecastTable}>
        <InventoryForecastTable
          className={classes.forecastTable}
          headers={{
            mainHeader: 'Filter Model',
            otherHeaders: ['Number Required'],
          }}
          items={inventory}
        />
      </div>
    </div>
  );
}
