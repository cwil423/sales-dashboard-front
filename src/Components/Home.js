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
  TextField,
  Divider,
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
    height: '350px',
    // backgroundColor: 'red',
  },
  cardGroupTwo: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    // height: '450px',
    // backgroundColor: 'blue',
  },
  card: {
    display: 'flex',
    width: '100%',
    // height: '300px',
    margin: '30px',
    // backgroundColor: 'green',
  },
  monthsAndSums: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'space-around',
    width: '100%',
    // backgroundColor: 'red',
  },
  weightedCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingRight: '150px',
    paddingLeft: '150px',
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
  divider: {
    width: '100px',
  },
  productSection: {
    // backgroundColor: 'red',
  },
  item: {
    display: 'flex',
    // width: '100px',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [monthAndWeightedSales, setMonthAndWeightedSales] = useState([]);
  const currentMonth = format(new Date(), 'MM');
  const currentYear = format(new Date(), 'yyyy');
  const [selectedStartMonth, setSelectedStartMonth] = useState(currentMonth);
  const [selectedStartYear, setSelectedStartYear] = useState(currentYear);
  const [selectedEndMonth, setSelectedEndMonth] = useState(currentMonth);
  const [selectedEndYear, setSelectedEndYear] = useState(currentYear);
  const [monthAndForecast, setMonthAndForecast] = useState([]);
  const [monthAndInventory, setMonthAndInventory] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/sales/weighted',
      data: {
        startMonth: selectedStartMonth,
        startYear: selectedStartYear,
        endMonth: selectedEndMonth,
        endYear: selectedEndYear,
      },
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

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/sales/forecast',
    }).then((response) => {
      const months = response.data[1];
      const sums = response.data[0];
      const monthAndSum = [];
      for (let i = 0; i < response.data[0].length; i++) {
        monthAndSum.push({ month: months[i].Month, sum: sums[i] });
      }
      setMonthAndForecast(monthAndSum);
    });
  }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/inventory/forecast',
    }).then((response) => {
      const months = response.data[1];
      const inventory = response.data[0];
      const monthAndInventory = [];
      for (let i = 0; i < response.data[0].length; i++) {
        monthAndInventory.push({
          month: months[i].Month,
          inventory: inventory[i],
        });
      }
      setMonthAndInventory(monthAndInventory);
      console.log(monthAndInventory);
    });
  }, []);

  useEffect(() => {
    // This whole section gets the month and year six months from now
    const months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];

    const indexOfCurrentMonth = months.indexOf(currentMonth);
    const nextSixMonths = [];
    let updatedYear = null;

    for (let i = 0; i < 6; i++) {
      let indexOfNext = indexOfCurrentMonth + i;
      if (nextSixMonths.includes('12')) {
        indexOfNext -= 12;
        updatedYear = parseInt(selectedStartYear) + 1;
        console.log(updatedYear);
      }
      nextSixMonths.push(months[indexOfNext]);
    }
    setSelectedEndMonth(nextSixMonths[5]);
    if (updatedYear) {
      setSelectedEndYear(updatedYear.toString());
    }
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
                <div>
                  <FormControl>
                    <TextField
                      size="small"
                      type="month"
                      variant="outlined"
                      value={`${selectedStartYear}-${selectedStartMonth}`}
                      onChange={(e) => {
                        setSelectedStartYear(e.target.value.substring(0, 4));
                        setSelectedStartMonth(e.target.value.substring(5, 7));
                      }}
                    />
                  </FormControl>
                </div>
                <Typography type="h4">To</Typography>
                <div>
                  <FormControl>
                    <TextField
                      size="small"
                      type="month"
                      variant="outlined"
                      value={`${selectedEndYear}-${selectedEndMonth}`}
                      onChange={(e) => {
                        setSelectedEndYear(e.target.value.substring(0, 4));
                        setSelectedEndMonth(e.target.value.substring(5, 7));
                      }}
                    />
                  </FormControl>
                </div>
              </div>
              <Divider />
              <div className={classes.weightedContent}>
                {monthAndWeightedSales.map((element) => {
                  return (
                    <div className={classes.monthsAndSums}>
                      <Typography>{element.month}</Typography>
                      <Divider className={classes.divider} />
                      <Typography>{element.sum}</Typography>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
        <div className={classes.cardGroupOne}>
          <Card className={classes.card}>
            <div className={classes.weightedCard}>
              <div className={classes.weightedHeader}>
                <Typography>Projected Sales</Typography>
              </div>
              <Divider />
              <div className={classes.weightedContent}>
                {monthAndForecast.map((element) => {
                  return (
                    <div className={classes.monthsAndSums}>
                      <Typography>{element.month}</Typography>
                      <Divider className={classes.divider} />
                      <Typography>{element.sum}</Typography>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
        <div className={classes.cardGroupOne}>
          <Card className={classes.card}>
            <div className={classes.weightedCard}>
              <div className={classes.weightedHeader}>
                <Typography>Projected Inventory Requirements</Typography>
              </div>
              <Divider />
              <div className={classes.weightedContent}>
                {monthAndInventory.map((element) => {
                  return (
                    <div className={classes.monthsAndSums}>
                      <Typography>{element.month}</Typography>
                      <Divider className={classes.divider} />
                      <div className={classes.productSection}>
                        {element.inventory.map((items) => {
                          return (
                            <div className={classes.item}>
                              <Typography>{items.product_name}:</Typography>
                              &emsp;
                              <Typography>{items.quantity}</Typography>
                            </div>
                          );
                        })}
                      </div>
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
