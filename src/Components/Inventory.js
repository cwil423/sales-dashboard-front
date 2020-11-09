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
import InventoryForecast from './InventoryForecast';

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '35px',
    height: '400px',
    width: '60%',
  },
}));

export default function Inventory() {
  const classes = useStyles();

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
          <InventoryForecast />
        </Card>
      </div>
    </div>
  );
}
