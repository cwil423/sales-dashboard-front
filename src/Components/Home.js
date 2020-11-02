import React, { useEffect, useState } from 'react';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { makeStyles, Card } from '@material-ui/core';
import axios from 'axios';
import PageHeader from './PageHeader';
import Header from './Header';
import SideMenu from './SideMenu';
import { format } from 'date-fns';

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
  },
  cardGroudTwo: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  card: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    width: '30%',
    height: '300px',
    margin: '10px',
  },
}));

const Home = () => {
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [invoiceTotalThisMonth, setInvoiceTotalThisMonth] = useState(0);
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

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: 'http://localhost:4000/sales/weighted',
  //   }).then((response) => {
  //     const sales = response.data;
  //     console.log(sales);
  //   });
  // }, []);

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
            <h1>Total Invoices: {invoiceTotal}</h1>
          </Card>
          <Card className={classes.card}>
            <h1>Invoice total from this month: {invoiceTotalThisMonth}</h1>
            <h3></h3>
          </Card>
          <Card className={classes.card}>
            <h1>Invoices from this month: {invoiceTotalThisMonth}</h1>
            <h3></h3>
          </Card>
        </div>
        <div className={classes.cardGroudTwo}>
          <Card className={classes.card}>
            <h1>Invoices from this month: {invoiceTotalThisMonth}</h1>
            <h3></h3>
          </Card>
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
