import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  makeStyles,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { format } from 'date-fns';
import StoreIcon from '@material-ui/icons/Store';
import SideMenu from './SideMenu';
import PageHeader from './PageHeader';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '240px',
    width: '100%',
  },
  cardArea: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  cards: {
    margin: '35px',
    height: '300px',
    width: '60%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Inventory() {
  const classes = useStyles();
  const currentMonth = format(new Date(), 'MM');
  const [inventory, setInventory] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const inventoryData = inventory.map((item) => {
    return (
      <div>
        <Typography>{item.product_name}</Typography>
        <Typography>{item.number_of_filters}</Typography>
      </div>
    );
  });
  console.log(inventoryData);

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

  return (
    <div className={classes.root}>
      <SideMenu />
      <Header quickbooksButton={false} />
      <PageHeader
        icon={<StoreIcon fontSize="large" />}
        title="Inventory"
        subtitle="View forecasted inventory demands."
      />
      <div className={classes.cardArea}>
        <Card className={classes.cards}>
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
        </Card>
      </div>
    </div>
  );
}
