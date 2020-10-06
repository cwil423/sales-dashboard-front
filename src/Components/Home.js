import React, { useEffect, useState } from 'react';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PageHeader from './PageHeader';
import axios from 'axios';
import Header from './Header';
import SideMenu from './SideMenu';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '240px',
    width: '100%',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [authToken, setAuthToken] = useState();

  const getAccessToken = () => {
    axios
      .get('http://localhost:4000/oauth/accessToken')
      .then((response) => setAuthToken({ token: response.data[0].value }));
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  // useEffect(() => {

  // }, [])

  const apiCallHandler = () => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/quickbooks',
      data: [authToken],
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className={classes.root}>
      <SideMenu />
      <Header quickbooksButton={false} />
      <PageHeader
        icon={<AssessmentIcon fontSize="large" />}
        title="Home Dashboard"
        subtitle="General graphs and trends."
      />
      <button onClick={apiCallHandler}>Click</button>
    </div>
  );
};

export default Home;
