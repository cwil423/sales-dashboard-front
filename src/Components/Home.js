import React, { useEffect, useState } from 'react';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { makeStyles, Card, Typography } from '@material-ui/core';
import axios from 'axios';
import { format } from 'date-fns';
import PageHeader from './PageHeader';
import Header from './Header';
import SideMenu from './SideMenu';

const useStyles = makeStyles(() => ({
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
    // backgroundColor: 'red',
  },
  cardGroupTwo: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    // backgroundColor: 'blue',
  },
  card: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '300px',
    margin: '35px',
    // backgroundColor: 'green',
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
      console.log(response.data);
      setWeightedSales(response.data[0]);
      setMonths(response.data[1]);
    });
  }, []);

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
          <Card className={classes.card}>
            <h1>Invoices from this month: {invoiceTotalThisMonth}</h1>
            <h3></h3>
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
