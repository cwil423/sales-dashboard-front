import React from 'react';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { Card, makeStyles, Typography } from '@material-ui/core';
import PageHeader from './PageHeader';
import stockSalesImage from '../assets/images/stockSalesImage.jpg';
import otherImage from '../assets/images/example-dashboard.png';
import Image from '../assets/images/quickbooks.png';
import hoverImage from '../assets/images/quickbooksHover.png';

import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {},
  imageContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',

    margin: theme.spacing(4),
    padding: theme.spacing(4),
  },
  stockSalesImage: {
    width: '450px',
    height: '450px',
  },
  cards: {
    padding: theme.spacing(4),
  },
  login: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    height: '100px',
    width: '500px',
    padding: '25px',
    /* margin: 100px 50px, */
  },
  quickbooksButton: {
    backgroundImage: `url(${Image})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    // color: 'white',
    // backgroundColor: 'green',
    backgroundSize: '100%',
    marginBottom: '10px',
    width: '300px',
    height: '52px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': { backgroundImage: `url(${hoverImage})` },
  },
  quickbooksArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(6),
    margin: '50px 100px',
  },
}));

const DisplayPage = () => {
  const classes = useStyles();
  return (
    <div>
      <Header quickbooksButton />
      <PageHeader
        icon={<TrendingUpIcon fontSize="large" />}
        title="Sales Dashboard by Inbound Technologies"
        subtitle="Sales analytics and forecasting to prepare your business for what's next."
      />
      <Card className={classes.quickbooksArea}>
        <Typography variant="h4">
          Sign in with Quickbooks to gain full functionality.
        </Typography>
        <a
          className={classes.quickbooksButton}
          href="http://localhost:4000/oauth"
        ></a>
      </Card>
      <div className={classes.imageContainer}>
        <Card className={classes.cards}>
          <img
            className={classes.stockSalesImage}
            src={stockSalesImage}
            alt=""
          />
        </Card>
        <Card className={classes.cards}>
          <img className={classes.stockSalesImage} src={otherImage} alt="" />
        </Card>
      </div>
    </div>
  );
};

export default DisplayPage;
