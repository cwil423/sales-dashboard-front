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
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
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
    justifyContent: 'center',
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
    alignItems: 'center',
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
  const history = useHistory();
  const [monthAndWeightedSales, setMonthAndWeightedSales] = useState([]);
  const currentMonth = format(new Date(), 'MM');
  const currentYear = format(new Date(), 'yyyy');
  const [selectedStartMonth, setSelectedStartMonth] = useState(currentMonth);
  const [selectedStartYear, setSelectedStartYear] = useState(currentYear);
  const [selectedEndMonth, setSelectedEndMonth] = useState(currentMonth);
  const [selectedEndYear, setSelectedEndYear] = useState(currentYear);
  const [monthAndForecast, setMonthAndForecast] = useState([]);
  const [monthAndInventory, setMonthAndInventory] = useState([]);
  const [commissionThisYear, setCommissionThisYear] = useState();
  const [commissionThisMonth, setCommissionThisMonth] = useState();

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get('token')) {
      axios({
        method: 'GET',
        url: 'http://localhost:4000/users/user',
        withCredentials: true,
      }).then((response) => {
        dispatch({ type: 'SET_USER', user: response.data });
      });
    }
  }, []);

  useEffect(() => {
    if (Cookies.get('token')) {
      axios({
        method: 'GET',
        url: 'http://localhost:4000/commission/year',
      }).then((response) => setCommissionThisYear(response.data.sum));
    }
  }, []);

  useEffect(() => {
    if (Cookies.get('token')) {
      axios({
        method: 'GET',
        url: 'http://localhost:4000/commission/month',
      }).then((response) => setCommissionThisMonth(response.data.sum));
    }
  }, []);

  useEffect(() => {
    // Check for cookie to avoid weird bug where axios call takes too long
    if (Cookies.get('token')) {
      axios({
        method: 'GET',
        url: 'http://localhost:4000/commission/pastSixMonths',
        withCredentials: true,
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
          if (months[i]) {
            monthAndSum.unshift({ month: months[i].Month, sum: sums[i] });
          } else {
            monthAndSum.unshift({ month: null, sum: sums[i] });
          }
        }
        setMonthAndWeightedSales(monthAndSum);
      });
    }
  }, []);

  // useEffect(() => {
  //   // Check for cookie to avoid weird bug where axios call takes too long
  //   if (Cookies.get('token')) {
  //     axios({
  //       method: 'GET',
  //       url: 'http://localhost:4000/sales/forecast',
  //       withCredentials: true,
  //     }).then((response) => {
  //       const months = response.data[1];
  //       const sums = response.data[0];
  //       const monthAndSum = [];
  //       for (let i = 0; i < response.data[0].length; i++) {
  //         if (months[i]) {
  //           monthAndSum.push({ month: months[i].Month, sum: sums[i] });
  //         } else {
  //           monthAndSum.push({ month: null, sum: sums[i] });
  //         }
  //       }
  //       setMonthAndForecast(monthAndSum);
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   // Check for cookie to avoid weird bug where axios call takes too long
  //   if (Cookies.get('token')) {
  //     axios({
  //       method: 'GET',
  //       url: 'http://localhost:4000/inventory/forecast',
  //       withCredentials: true,
  //     }).then((response) => {
  //       const months = response.data[1];
  //       const inventory = response.data[0];
  //       const monthAndInventory = [];
  //       for (let i = 0; i < response.data[0].length; i++) {
  //         if (months[i]) {
  //           monthAndInventory.push({
  //             month: months[i].Month,
  //             inventory: inventory[i],
  //           });
  //         } else {
  //           monthAndInventory.push({
  //             month: null,
  //             inventory: inventory[i],
  //           });
  //         }
  //       }
  //       setMonthAndInventory(monthAndInventory);
  //     });
  //   }
  // }, []);

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
        user={user}
      />
      <div className={classes.cards}>
        <div className={classes.cardGroupOne}>
          <Card className={classes.card}>
            <div className={classes.weightedCard}>
              <div className={classes.weightedHeader}>
                <Typography variant="h5">Commission Year to Date</Typography>
              </div>
              <Divider />
              <div className={classes.weightedContent}>
                <Typography variant="h3">{commissionThisYear}</Typography>
              </div>
            </div>
          </Card>
          <Card className={classes.card}>
            <div className={classes.weightedCard}>
              <div className={classes.weightedHeader}>
                <Typography variant="h5">Commission This Month</Typography>
              </div>
              <Divider />
              <div className={classes.weightedContent}>
                <Typography variant="h3">{commissionThisYear}</Typography>
              </div>
            </div>
          </Card>
        </div>
        <div className={classes.cardGroupOne}>
          <Card className={classes.card}>
            <div className={classes.weightedCard}>
              <div className={classes.weightedHeader}>
                <Typography variant="h5">
                  Commission for Past Six Months
                </Typography>
              </div>
              <Divider />
              <div className={classes.weightedContent}>
                {monthAndWeightedSales.map((element) => {
                  return (
                    <div className={classes.monthsAndSums}>
                      <Typography variant="h4">{element.month}</Typography>
                      <Divider className={classes.divider} />
                      <Typography variant="h4">{element.sum}</Typography>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
        {/* <div className={classes.cardGroupOne}>
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
        </div> */}
        {/* <div className={classes.cardGroupOne}>
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
                              <Typography>{items.sum}</Typography>
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
        </div> */}

        {/* <div className={classes.cardGroupTwo}>
          <Card className={classes.inventoryCard}>
            <InventoryForecast />
          </Card>
          <Card className={classes.card}>
            <h1>Commission info goes here</h1>
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
