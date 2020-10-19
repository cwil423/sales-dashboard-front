import React, { useState } from 'react';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Box, Card, makeStyles, TextField, Button } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '240px',
    width: '100%',
  },
  invoice: {
    display: 'flex',
  },
  createInvoiceCard: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(4),
    padding: theme.spacing(2),
    width: '100%',
  },
  priceAndQuantity: {
    width: '100px',
  },
  productSection: {
    display: 'flex',
    padding: theme.spacing(2),
    justifyContent: 'space-between',
  },
  customerAndSalesperson: {
    display: 'flex',
    marginLeft: '0px',
  },
}));

export default function ProductFields(props) {
  const classes = useStyles();

  const [productsList, setProductsList] = useState([]);

  const fetchDataHandler = (letters, type) => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/sales/data',
      data: { letters, type },
    }).then((response) => {
      setProductsList(response.data);
    });
  };

  return (
    <div>
      <div className={classes.productSection}>
        <Autocomplete
          id="combo-box-demo"
          options={productsList}
          getOptionLabel={(option) => `${option.product_name}`}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Product" variant="outlined" />
          )}
          onInputChange={(event, newInputValue) => {
            if (newInputValue !== '') {
              const letters = newInputValue;
              fetchDataHandler(letters, 'products');
            }
          }}
          onChange={(event, newValue) => {
            props.addProductInfo(newValue, props.id, 'product');
          }}
        />
        {/* <TextField
          id="outlined-basic"
          type="text"
          label="Description"
          variant="outlined"
          margin="dense"
          // InputProps={{
          //   startAdornment: <InputAdornment position="start" />,
          // }}
          onChange={(event) => {
            props.addProductInfo(event.target.value, props.id, 'serviceDate');
          }}
        /> */}
        <TextField
          className={classes.priceAndQuantity}
          id="outlined-basic"
          type="number"
          label="Quantity"
          variant="outlined"
          margin="dense"
          InputProps={{
            startAdornment: <InputAdornment position="start">#</InputAdornment>,
          }}
          onChange={(event) => {
            props.addProductInfo(event.target.value, props.id, 'quantity');
          }}
        />
        <TextField
          className={classes.priceAndQuantity}
          id="outlined-basic"
          label="Price"
          variant="outlined"
          margin="dense"
          size="small"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          onChange={(event) => {
            props.addProductInfo(event.target.value, props.id, 'price');
          }}
        />
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
            props.addProductInfo(event.target.value, props.id, 'serviceDate');
          }}
        />
      </div>
    </div>
  );
}
