import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, array, boolean, number, date } from 'yup';
import DescriptionIcon from '@material-ui/icons/Description';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Checkbox,
  Card,
  makeStyles,
  TextField,
  Button,
  ButtonGroup,
  Typography,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import PageHeader from './PageHeader';
import SideMenu from './SideMenu';
import ProductFields from './ProductFields';
import Total from './Total';

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
    marginBottom: '25px',
    // backgroundColor: 'teal',
  },
  customerAndSalesperson: {
    // backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'column',
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
    marginTop: '100px',
  },
  frequencyAndBulk: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'red',
    // paddingRight: '15px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bulk: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
  },
  errorMessage: {
    display: 'flex',
    justifyContent: 'center',
    color: 'red',
  },
  productSection: {
    marginTop: '35px',
  },
}));

const Invoice = () => {
  const classes = useStyles();
  const history = useHistory();

  const [customersList, setCustomersList] = useState([]);
  // const [salespeopleList, setSalespeopleList] = useState([]);
  const [saleType, setSaleType] = useState([
    { label: 'Residential' },
    { label: 'Business' },
  ]);
  const [error, setError] = useState(false);
  const [frequencies, setFrequencies] = useState([
    { label: 'Weekly', weeksUntilNextDelivery: 1 },
    { label: 'Bi-weekly', weeksUntilNextDelivery: 2 },
    { label: 'Monthly', monthsUntilNextDelivery: 1 },
    { label: 'Bi-Monthly', monthsUntilNextDelivery: 2 },
    { label: 'Quarterly', monthsUntilNextDelivery: 3 },
    { label: 'Semi-Annually', monthsUntilNextDelivery: 6 },
    { label: 'Annually', monthsUntilNextDelivery: 12 },
  ]);
  const [user, setUser] = useState();

  useEffect(() => {
    if (Cookies.get('token')) {
      axios({
        method: 'GET',
        url: 'http://localhost:4000/users/user',
        withCredentials: true,
      }).then((response) => {
        setUser(response.data);
      });
    }
  }, []);

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
        case 'users':
          // setSalespeopleList(response.data);
          break;
        default:
          break;
      }
    });
  };

  const submitHandler = (invoice) => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/sales/invoice',
      data: {
        invoice,
        user,
      },
    }).then((response) => {
      if (response.data.message) {
        setError(
          'Error: Something went wrong and the transaction was not recorded.'
        );
      }
    });
  };

  const yupSchema = object().shape({
    customer: object().required().typeError('customer is a required field'),
    saleType: object().required().typeError('sale type is a required field'),
    frequency: object()
      .typeError('sale frequency must is input incorrectly')
      .required('sale frequency is a required field'),
    // .min(1, 'sales frequency must at least be 1 character'),
    bulk: boolean().required(),
    products: array().of(
      object().shape({
        product: object()
          .required('product is a required field')
          .typeError('product is a required field'),
        price: number()
          .required('price is a required field')
          .min(1, 'price must at least be 1')
          .typeError('price must be a number'),
        quantity: number()
          .required('quantity is a required field')
          .min(1, 'quantity must at least be 1')
          .typeError('price must be a number'),
        saleDate: date(),
      })
    ),
  });

  return (
    <div className={classes.root}>
      <Header quickbooksButton />
      <PageHeader
        icon={<DescriptionIcon fontSize="large" />}
        title="Sales"
        subtitle="Record new sales"
        user={user}
      />
      <SideMenu />
      <div className={classes.invoice}>
        <Card className={classes.createInvoiceCard}>
          <Formik
            initialValues={{
              customer: '',
              saleType: '',
              frequency: '',
              bulk: false,
              products: [
                {
                  id: 1,
                  product: '',
                  price: '',
                  quantity: '',
                  saleDate: '',
                },
              ],
            }}
            validationSchema={yupSchema}
            onSubmit={(values, errors) => {
              submitHandler(values);
            }}
          >
            {({ errors, values, setFieldValue, touched }) => (
              <Form>
                <div className={classes.topSection}>
                  <div className={classes.customerAndSalesperson}>
                    <Field
                      size="small"
                      name="customer"
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
                    <ErrorMessage
                      render={(message) => (
                        <div className={classes.errorMessage}>{message}</div>
                      )}
                      classname={classes.errorMessage}
                      name="customer"
                    />
                    <Field
                      name="saleType"
                      size="small"
                      component={Autocomplete}
                      options={saleType}
                      getOptionLabel={(option) => option.label}
                      style={{ width: 300, padding: 15 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Sale Type"
                          variant="outlined"
                        />
                      )}
                      // onInputChange={(event, newInputValue) => {
                      //   if (newInputValue !== '') {
                      //     const letters = newInputValue;
                      //     fetchDataHandler(letters, 'users');
                      //   }
                      // }}
                      onChange={(_, value) => setFieldValue('saleType', value)}
                    />
                    <ErrorMessage
                      render={(message) => (
                        <div className={classes.errorMessage}>{message}</div>
                      )}
                      classname={classes.errorMessage}
                      name="salesperson"
                    />
                  </div>
                  <div className={classes.frequencyAndBulk}>
                    <Field
                      name="frequency"
                      size="small"
                      component={Autocomplete}
                      options={frequencies}
                      getOptionLabel={(option) => option.label}
                      style={{ width: 300, padding: 15 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Sale Frequency"
                          variant="outlined"
                        />
                      )}
                      onChange={(_, value) => setFieldValue('frequency', value)}
                    />
                    <ErrorMessage
                      render={(message) => (
                        <div className={classes.errorMessage}>{message}</div>
                      )}
                      classname={classes.errorMessage}
                      name="frequency"
                    />
                    <div className={classes.bulk}>
                      <Field
                        as={Checkbox}
                        name="bulk"
                        checked={values.bulk}
                        color="primary"
                      />
                      <Typography>Bulk Order</Typography>
                    </div>
                  </div>
                </div>
                <hr />
                <div className={classes.productSection}>
                  <Field
                    as={ProductFields}
                    errors={errors}
                    touched={touched}
                    numberOfItems={values.products}
                    addProductInfo={(value, id, type) => {
                      const itemArray = JSON.parse(
                        JSON.stringify(values.products)
                      );
                      const indexOfItem = id - 1;
                      switch (type) {
                        case 'product':
                          itemArray[indexOfItem].product = value;
                          setFieldValue('products', itemArray);
                          break;
                        case 'price':
                          itemArray[indexOfItem].price = value;
                          setFieldValue('products', itemArray);
                          break;
                        case 'quantity':
                          itemArray[indexOfItem].quantity = value;
                          setFieldValue('products', itemArray);
                          break;
                        case 'saleDate':
                          itemArray[indexOfItem].saleDate = value;
                          setFieldValue('products', itemArray);
                          break;
                        default:
                          break;
                      }
                    }}
                  />
                </div>
                <div className={classes.totalContainer}>
                  <h3 className={classes.total}>
                    <Total items={values.products} />
                  </h3>
                </div>
                <div className={classes.buttons}>
                  <ButtonGroup variant="text">
                    <Button
                      type="button"
                      onClick={() => {
                        const itemArray = JSON.parse(
                          JSON.stringify(values.products)
                        );
                        const id = itemArray[itemArray.length - 1].id + 1;
                        itemArray.push({
                          id,
                          product: '',
                          price: '',
                          quantity: '',
                          saleDate: '',
                        });
                        setFieldValue('products', itemArray);
                      }}
                    >
                      Add Item
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        const itemArray = JSON.parse(
                          JSON.stringify(values.products)
                        );
                        if (itemArray.length > 1) {
                          itemArray.pop();
                          setFieldValue('products', itemArray);
                        }
                      }}
                    >
                      Remove Item
                    </Button>
                    <Button type="submit">Record Sale</Button>
                  </ButtonGroup>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default Invoice;
