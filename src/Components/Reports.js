import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, makeStyles } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import SideMenu from './SideMenu';
import Header from './Header';
import PageHeader from './PageHeader';
import axios from 'axios';

const useStyles = makeStyles({
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
  card: {
    display: 'flex',
    width: '100%',

    margin: '30px',
  },
});

export default function Reports() {
  const user = useSelector((state) => state.user);

  const classes = useStyles();

  const salespeople = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/commission/report',
      withCredentials: true,
    }).then((response) => console.log(response));
  }, []);

  return (
    <div className={classes.root}>
      <SideMenu />
      <Header quickbooksButton={false} />
      <PageHeader
        icon={<DescriptionIcon fontSize="large" />}
        title="Reports"
        subtitle="Generate and print reports."
        user={user}
      />
      <div className={classes.cardGroupOne}>
        <Card className={classes.card}>
          <div></div>
        </Card>
      </div>
    </div>
  );
}
