import React, { useState } from 'react';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Card, makeStyles, TextField } from '@material-ui/core';
import axios from 'axios';
import Header from './Header';
import PageHeader from './PageHeader';
import SideMenu from './SideMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '240px',
    width: '100%',
  },
  createInvoiceCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    width: '400px',
  },
  form: {
    margin: theme.spacing(2),
  },
}));

const Invoice = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [customer, setCustomer] = useState();
  const [salesperson, setSalesperson] = useState();
  const [product, setProduct] = useState();
  const [serviceDate, setServiceDate] = useState();

  const getCustomerHandler = (letters) => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/sales/customers',
      data: { letters },
    }).then((response) => {
      setCustomers(response.data);
    });
  };

  const getSalespersonHandler = (letters) => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/sales/salespeople',
      data: { letters },
    }).then((response) => {
      setSalespeople(response.data);
    });
  };

  const getProductsHandler = (letters) => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/sales/products',
      data: { letters },
    }).then((response) => {
      setProducts(response.data);
    });
  };

  const submitHandler = () => {
    const invoice = {
      customer,
      salesperson,
      product,
      price,
      quantity,
      serviceDate,
    };
    axios({
      method: 'post',
      url: 'http://localhost:4000/sales/invoice',
      data: {
        invoice,
      },
    }).then((response) => console.log(response));
  };

  return (
    <div className={classes.root}>
      <Header quickbooksButton />
      <PageHeader
        icon={<TrendingUpIcon fontSize="large" />}
        title="Invoices"
        subtitle="Create and manage invoices"
      />
      <SideMenu />
      <Card className={classes.createInvoiceCard}>
        <form className={classes.form}>
          <div>
            <Autocomplete
              id="combo-box-demo"
              options={customers}
              getOptionLabel={(option) =>
                `${option.first_name} ${option.last_name}`
              }
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Customer" variant="outlined" />
              )}
              onInputChange={(event, newInputValue) => {
                if (newInputValue !== '') {
                  const letters = newInputValue;
                  getCustomerHandler(letters);
                }
              }}
              onChange={(event, newValue) => {
                setCustomer(newValue);
              }}
            />
          </div>
          <div>
            <Autocomplete
              id="combo-box-demo"
              options={salespeople}
              getOptionLabel={(option) =>
                `${option.first_name} ${option.last_name}`
              }
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Salesperson" variant="outlined" />
              )}
              onInputChange={(event, newInputValue) => {
                if (newInputValue !== '') {
                  const letters = newInputValue;
                  getSalespersonHandler(letters);
                }
              }}
              onChange={(event, newValue) => {
                setSalesperson(newValue);
              }}
            />
          </div>
          <div>
            <Autocomplete
              id="combo-box-demo"
              options={products}
              getOptionLabel={(option) => `${option.product_name}`}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Product" variant="outlined" />
              )}
              onInputChange={(event, newInputValue) => {
                if (newInputValue !== '') {
                  const letters = newInputValue;
                  getProductsHandler(letters);
                }
              }}
              onChange={(event, newValue) => {
                setProduct(newValue);
              }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              type="number"
              label="Quantity"
              variant="outlined"
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              }}
              onChange={(event) => {
                setQuantity(event.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              type="date"
              label="Service Date"
              variant="outlined"
              margin="dense"
              InputProps={{
                startAdornment: <InputAdornment position="start" />,
              }}
              onChange={(event) => {
                setServiceDate(event.target.value);
              }}
            />
          </div>
        </form>
        <button type="button" onClick={submitHandler}>
          Create Invoice
        </button>
      </Card>
    </div>
  );
};

export default Invoice;
