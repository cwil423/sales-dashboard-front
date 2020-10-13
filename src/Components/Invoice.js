import React, { useState } from 'react';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Box, Card, makeStyles, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import Header from './Header';
import PageHeader from './PageHeader';
import SideMenu from './SideMenu';
import ProductFields from './ProductFields';

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
  customerAndSalesperson: {
    display: 'flex',
    marginLeft: '0px',
  },
}));

const Invoice = () => {
  const classes = useStyles();
  const [items, setItems] = useState([
    { id: 1, product: '', price: 0, quantity: 0, serviceDate: '' },
  ]);
  const [customersList, setCustomersList] = useState([]);
  const [salespeopleList, setSalespeopleList] = useState([]);
  const [customer, setCustomer] = useState();
  const [salesperson, setSalesperson] = useState();

  const fetchDataHandler = (letters, type) => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/sales/data',
      data: { letters, type },
    }).then((response) => {
      switch (type) {
        case 'customers':
          setCustomersList(response.data);
          break;
        case 'salespeople':
          setSalespeopleList(response.data);
          break;
        default:
          break;
      }
    });
  };

  const submitHandler = () => {
    const invoice = {
      customer,
      salesperson,
      items,
    };
    axios({
      method: 'post',
      url: 'http://localhost:4000/sales/invoice',
      data: {
        invoice,
      },
    }).then((response) => console.log(response));
  };

  const addItemHandler = () => {
    const itemArray = items.slice();
    const id = itemArray[itemArray.length - 1].id + 1;
    itemArray.push({
      id,
      product: '',
      price: 0,
      quantity: 0,
      serviceDate: '',
    });
    setItems(itemArray);
  };

  const removeItemHandler = () => {
    const itemArray = items.slice();
    if (itemArray.length > 1) {
      itemArray.pop();
      setItems(itemArray);
    }
  };

  const addProductInfoHandler = (value, key, type) => {
    const itemArray = items;
    const indexOfItem = key - 1;
    switch (type) {
      case 'product':
        itemArray[indexOfItem].product = value;
        break;
      case 'price':
        itemArray[indexOfItem].price = value;
        break;
      case 'quantity':
        itemArray[indexOfItem].quantity = value;
        break;
      case 'serviceDate':
        itemArray[indexOfItem].serviceDate = value;
        break;
      default:
        break;
    }
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

      <div className={classes.invoice}>
        <Card className={classes.createInvoiceCard}>
          <form className={classes.form}>
            <div className={classes.customerAndSalesperson}>
              <Autocomplete
                id="combo-box-demo"
                options={customersList}
                getOptionLabel={(option) =>
                  `${option.first_name} ${option.last_name}`
                }
                style={{ width: 300, padding: 15 }}
                renderInput={(params) => (
                  <TextField {...params} label="Customer" variant="outlined" />
                )}
                onInputChange={(event, newInputValue) => {
                  if (newInputValue !== '') {
                    const letters = newInputValue;
                    fetchDataHandler(letters, 'customers');
                  }
                }}
                onChange={(event, newValue) => {
                  setCustomer(newValue);
                }}
              />
              <Autocomplete
                id="combo-box-demo"
                options={salespeopleList}
                getOptionLabel={(option) =>
                  `${option.first_name} ${option.last_name}`
                }
                style={{ width: 300, padding: 15 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Salesperson"
                    variant="outlined"
                  />
                )}
                onInputChange={(event, newInputValue) => {
                  if (newInputValue !== '') {
                    const letters = newInputValue;
                    fetchDataHandler(letters, 'salespeople');
                  }
                }}
                onChange={(event, newValue) => {
                  setSalesperson(newValue);
                }}
              />
            </div>
            <div className={classes.productSection}>
              <ProductFields
                addProductInfo={addProductInfoHandler}
                numberOfItems={items}
              />
            </div>
          </form>
          <Button type="button" onClick={addItemHandler}>
            Add Item
          </Button>
          <Button type="button" onClick={removeItemHandler}>
            Remove Item
          </Button>
          <Button type="button" onClick={submitHandler}>
            Create Invoice
          </Button>
          <button onClick={() => console.log(items)}>Click</button>
        </Card>
      </div>
    </div>
  );
};

export default Invoice;
