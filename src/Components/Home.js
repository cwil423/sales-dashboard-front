import React, { useEffect, useState } from 'react';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { makeStyles, Card } from '@material-ui/core';
import axios from 'axios';
import PageHeader from './PageHeader';
import Header from './Header';
import SideMenu from './SideMenu';

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: '240px',
    width: '100%',
  },
  card: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    width: '40%',
  },
}));

const Home = () => {
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/sales/total',
    }).then((response) => setInvoiceTotal(response.data[0].sum));
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
      <Card className={classes.card}>
        <h1>Total Invoices: {invoiceTotal}</h1>
      </Card>
    </div>
  );
};

export default Home;
