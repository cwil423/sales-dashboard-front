import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import * as Yup from 'yup';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  FormControlLabel,
  Checkbox,
  Card,
  makeStyles,
  TextField,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import yup, { object, string } from 'yup';
import axios from 'axios';
import Header from './Header';
import PageHeader from './PageHeader';
import SideMenu from './SideMenu';
import ProductFields from './ProductFields';
import Modal from './Modal';

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
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '50px',
    // backgroundColor: 'teal',
  },
  customerAndSalesperson: {
    // backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'column',
  },
  frequency: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'red',
    paddingRight: '15px',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  totalContainer: {
    justifyContent: 'end',
    // backgroundColor: 'blue',
  },
  total: {
    float: 'right',
    marginRight: '25px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  frequencyAndBulk: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'red',
    paddingRight: '15px',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bulk: {
    display: 'flex',
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
  const [frequency, setFrequency] = useState();
  const [bulk, setBulk] = useState(false);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    setTotal(totalPrice);
  }, [items]);

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
      frequency,
      bulk,
    };
    axios({
      method: 'post',
      url: 'http://localhost:4000/sales/invoice',
      data: {
        invoice,
      },
    }).then((response) => {
      if (response.data.message) {
        setError(
          'Error: Something went wrong and the transaction was not recorded.'
        );
      }
    });
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
    const itemArray = JSON.parse(JSON.stringify(items));
    const indexOfItem = key - 1;
    switch (type) {
      case 'product':
        itemArray[indexOfItem].product = value;
        setItems(itemArray);
        break;
      case 'price':
        itemArray[indexOfItem].price = value;
        setItems(itemArray);
        break;
      case 'quantity':
        itemArray[indexOfItem].quantity = value;
        setItems(itemArray);
        break;
      case 'serviceDate':
        itemArray[indexOfItem].serviceDate = value;
        setItems(itemArray);
        break;
      default:
        break;
    }
  };

  const closeErrorHandler = () => {
    setError(false);
  };

  const bulkCheckHandler = () => {
    setBulk(!bulk);
  };

  const yupSchema = Yup.object().shape({
    name: Yup.string().min(25, 'too short'),
  });

  return (
    <div className={classes.root}>
      <Header quickbooksButton />
      <PageHeader
        icon={<TrendingUpIcon fontSize="large" />}
        title="Invoices"
        subtitle="Create and manage invoices"
      />
      <SideMenu />
      <Modal error={error} close={closeErrorHandler} />
      <div className={classes.invoice}>
        <Card className={classes.createInvoiceCard}>
          <Formik
            initialValues={{
              customer: null,
              salesperson: null,
              frequency: null,
              bulk: false,
              products: [],
            }}
            validationSchema={yupSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ errors, values, handleChange, setFieldValue }) => (
              <Form>
                <div className={classes.topSection}>
                  <div className={classes.customerAndSalesperson}>
                    <Field
                      component={Autocomplete}
                      options={customersList}
                      getOptionLabel={(option) =>
                        `${option.first_name} ${option.last_name}`
                      }
                      style={{ width: 300, padding: 15 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Customer"
                          variant="outlined"
                        />
                      )}
                      onInputChange={(event, newInputValue) => {
                        if (newInputValue !== '') {
                          const letters = newInputValue;
                          fetchDataHandler(letters, 'customers');
                        }
                      }}
                      onChange={(_, value) => setFieldValue('customer', value)}
                    />
                    <Field
                      component={Autocomplete}
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
                      onChange={(_, value) =>
                        setFieldValue('salesperson', value)
                      }
                    />

                    {/* <Select
                  options={customersList}
                  getOptionLabel={(option) =>
                    `${option.first_name} ${option.last_name}`
                  }
                  onInputChange={(input) => {
                    if (input !== '') {
                      const letters = input;
                      fetchDataHandler(letters, 'customers');
                    }
                  }}
                  onChange={(option) =>
                    handleChange('autocomplete')(option.first_name)
                  }
                  // onInputChange={(event, newInputValue) => {
                  //   if (newInputValue !== '') {
                  //     const letters = newInputValue;
                  //     fetchDataHandler(letters, 'customers');
                  //   }
                  // }}
                /> */}
                  </div>
                  <div className={classes.frequencyAndBulk}>
                    <Field
                      as={TextField}
                      name="frequency"
                      type="number"
                      label="Deliveries per year"
                      variant="outlined"
                      margin="dense"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">#</InputAdornment>
                        ),
                      }}
                    />
                    <div className={classes.bulk}>
                      <h3>Bulk Order</h3>
                    </div>
                  </div>
                </div>
                <div className={classes.productSection}>
                  <Field as={TextField} name="products" />
                </div>
                <pre>{JSON.stringify(errors, null, 4)}</pre>
                <pre>{JSON.stringify(values, null, 4)}</pre>
                <button
                  type="button"
                  onClick={() => console.log(customersList)}
                >
                  Click
                </button>
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
          <form className={classes.form}>
            <div className={classes.topSection}>
              <div className={classes.customerAndSalesperson}>
                <Autocomplete
                  id="combo-box-demo"
                  options={customersList}
                  getOptionLabel={(option) =>
                    `${option.first_name} ${option.last_name}`
                  }
                  style={{ width: 300, padding: 15 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer"
                      variant="outlined"
                    />
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
              <div className={classes.frequency}>
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="Deliveries per year"
                  variant="outlined"
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">#</InputAdornment>
                    ),
                  }}
                  onChange={(event) => {
                    setFrequency(event.target.value);
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={bulk}
                      onChange={bulkCheckHandler}
                      color="primary"
                    />
                  }
                  label="Bulk Order"
                />
              </div>
            </div>
            <div className={classes.productSection}>
              <ProductFields
                addProductInfo={addProductInfoHandler}
                numberOfItems={items}
              />
            </div>
            <div className={classes.totalContainer}>
              <h3 className={classes.total}>
                Total : ${parseFloat(total).toFixed(2)}
              </h3>
            </div>
          </form>
          <div className={classes.buttons}>
            <ButtonGroup>
              <Button type="button" onClick={addItemHandler}>
                Add Item
              </Button>
              <Button type="button" onClick={removeItemHandler}>
                Remove Item
              </Button>
              <Button type="button" onClick={submitHandler}>
                Create Invoice
              </Button>
            </ButtonGroup>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Invoice;
