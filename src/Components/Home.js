import React, { useEffect, useState } from 'react';
import AssessmentIcon from '@material-ui/icons/Assessment';
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
import PageHeader from './PageHeader';
import Header from './Header';
import SideMenu from './SideMenu';
import Inventory from './Inventory';
import InventoryForecast from './InventoryForecast';
import InventoryForecastTable from './InventoryForecastTable';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '240px',
    width: '100%',
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  cardGroupOne: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    height: '300px',
    // backgroundColor: 'red',
  },
  cardGroupTwo: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    height: '450px',
    // backgroundColor: 'blue',
  },
  card: {
    display: 'flex',
    width: '100%',
    // height: '300px',
    margin: '35px',
    // backgroundColor: 'green',
  },
  monthsAndSums: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  weightedCard: {
    display: 'flex',
    width: '100%',
    margin: '35px',
  },
  weightedContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  weightedHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '300px',
  },
  inventoryCard: {
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

const Home = () => {
  const [invoiceTotalThisMonth, setInvoiceTotalThisMonth] = useState(0);
  const classes = useStyles();
  const [monthAndWeightedSales, setMonthAndWeightedSales] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/sales/weighted',
    }).then((response) => {
      const months = response.data[1];
      const sums = response.data[0];
      const monthAndSum = [];
      for (let i = 0; i < response.data[0].length; i++) {
        monthAndSum.push({ month: months[i].Month, sum: sums[i] });
      }
      setMonthAndWeightedSales(monthAndSum);
    });
  }, []);

  return (
    <div className={classes.root}>
      <SideMenu />
      <Header quickbooksButton={false} />
      <PageHeader
        icon={<AssessmentIcon fontSize="large" />}
        title="Home Dashboard"
        subtitle="General graphs and trends."
      />
      <div className={classes.cards}>
        <div className={classes.cardGroupOne}>
          <Card className={classes.card}>
            <div className={classes.weightedCard}>
              <div className={classes.weightedHeader}>
                <Typography type="h4">Weighted Sales</Typography>
              </div>
              <div className={classes.weightedContent}>
                {monthAndWeightedSales.map((element) => {
                  return (
                    <div className={classes.monthsAndSums}>
                      <Typography>{element.month}</Typography>
                      <Typography>{element.sum}</Typography>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
        <div className={classes.cardGroupTwo}>
          <Card className={classes.inventoryCard}>
            <InventoryForecast />
          </Card>
          <Card className={classes.card}>
            <h1>Commission info goes here</h1>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
