import React from 'react';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Components/Login';
import DisplayPage from './Components/DisplayPage';
import Invoice from './Components/Invoice';
import Home from './Components/Home';
import Inventory from './Components/Inventory';

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
          <div className="app">
            {Cookies.get('token') ? null : <Redirect to="/login" />}
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            {/* <Route path="/home" component={Home} /> */}
            <Route path="/invoice" component={Invoice} />
            <Route path="/inventory" component={Inventory} />
            {/* <DisplayPage /> */}
          </div>
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
