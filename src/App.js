import React, { useState } from 'react';
import Login from './Components/Login';
import './App.css';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import DisplayPage from './Components/DisplayPage';
import Invoice from './Components/Invoice';
import Home from './Components/Home';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useSelector } from 'react-redux';

function App() {
  const themeColor = useSelector((state) => state.theme);

  const theme = createMuiTheme({
    palette: {
      type: themeColor ? 'light' : 'dark',
      // primary: themeColor ? {main: '#f5f5f5'} : {main: '#333'},
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <div className={'app'}>
            <Route exact path="/" component={DisplayPage} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/invoice" component={Invoice} />
            {/* <DisplayPage /> */}
          </div>
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
