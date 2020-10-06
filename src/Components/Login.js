import React, { useState } from 'react';
import { Card, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Image from '../assets/images/quickbooks.png';
import hoverImage from '../assets/images/quickbooksHover.png';
import PageHeader from './PageHeader';

const useStyles = makeStyles((theme) => ({
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
    margin: '100px',
  },
}));

function Login() {
  const classes = useStyles();
  // const [authToken, setAuthToken] = useState();

  // const oauthHandler = () => {
  //   axios
  //     .get('http://localhost:4000/oauth/accessToken')
  //     .then((response) => setAuthToken({ token: response.data[0].value }));
  // };

  // const getAccessToken = () => {
  //   axios
  //     .get('http://localhost:4000/oauth/accessToken')
  //     .then((response) => setAuthToken({ token: response.data[0].value }));
  // };

  // const apiCallHandler = () => {
  //   const letters = 'A';
  //   axios({
  //     method: 'post',
  //     url: 'http://localhost:4000/quickbooks',
  //     data: [authToken, { letters: letters }],
  //   }).then((response) => console.log(response));
  // };

  return (
    <div>
      <PageHeader
        icon={<AccountCircleIcon fontSize="large" />}
        title="Login"
        subtitle="Log in to access site features."
      />
      <Card className={classes.quickbooksArea}>
        <a
          className={classes.quickbooksButton}
          href="http://localhost:4000/oauth"
        >
          quickbooks Button
        </a>
      </Card>

      {/* <button onClick={oauthHandler}>Oauth</button>
      <button onClick={getAccessToken}>getAccessToken</button>
      <button onClick={() => console.log(authToken)}>log state</button>
      <button onClick={apiCallHandler}>Get quickbooks info</button> */}
    </div>
  );
}

export default Login;
