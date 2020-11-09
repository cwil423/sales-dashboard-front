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
  inventoryCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    // height: '450px',
    margin: '35px',
    // backgroundColor: 'green',
  },
  formControl: {
    margin: theme.spacing(1),
    width: theme.spacing(24),
    minWidth: 120,
  },
  filters: {
    margin: theme.spacing(1),
  },
  weightedCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  weightedContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
}));

const Home = () => {
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [invoiceTotalThisMonth, setInvoiceTotalThisMonth] = useState(0);
  const [weightedSales, setWeightedSales] = useState([]);
  const [months, setMonths] = useState([]);
  const classes = useStyles();
  const currentMonth = format(new Date(), 'MM');
  const [inventory, setInventory] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // useEffect(() => {
  //   axios({
  //     method: 'POST',
  //     url: 'http://localhost:4000/inventory',
  //     data: { month: selectedMonth },
  //   }).then((response) => setInventory(response.data));
  // }, [selectedMonth]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/sales/total',
    }).then((response) => setInvoiceTotal(response.data[0].sum));
  }, []);

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: 'http://localhost:4000/sales/thisMonth',
  //   }).then((response) => {
  //     setInvoiceTotalThisMonth(response.data.sum);
  //   });
  // }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/sales/weighted',
    }).then((response) => {
      setWeightedSales(response.data[0]);
      setMonths(response.data[1]);
    });
  }, []);

  // const handleChange = (event) => {
  //   setSelectedMonth(event.target.value);
  // };

  const weightedSalesNumbers = weightedSales.map((amount) => {
    if (amount === null) {
      return null;
    }
    // return <h2 className={classes.weightedContent}>{amount}</h2>;
    return <Typography variant="h5">{amount}</Typography>;
  });

  const weightedMonths = months.map((month) => {
    if (month === null) {
      return null;
    }
    // return <h2 className={classes.weightedContent}>{month.Month}</h2>;
    return <Typography variant="h5">{month.Month}</Typography>;
  });

  // const inventoryData = inventory.map((item) => {
  //   return (
  //     <div>
  //       <Typography className={classes.filters}>
  //         {item.product_name}: {item.sum} Filters
  //       </Typography>
  //     </div>
  //   );
  // });

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
              <Typography variant="h4">
                Weigthed Sales for Upcoming Months
              </Typography>

              <div className={classes.weightedContent}>
                {weightedSalesNumbers}
              </div>
              <div className={classes.weightedContent}>{weightedMonths}</div>
            </div>
          </Card>
        </div>
        <div className={classes.cardGroupTwo}>
          <Card className={classes.inventoryCard}>
            <InventoryForecast />
          </Card>
          <Card className={classes.card}>
            <h1>Invoices from this month: {invoiceTotalThisMonth}</h1>
            <h3></h3>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
