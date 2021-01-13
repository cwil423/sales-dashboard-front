import React, { useEffect, useState } from 'react';
import {
  Card,
  makeStyles,
  Typography,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { object, array, boolean, number, date } from 'yup';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import StoreIcon from '@material-ui/icons/Store';
import SideMenu from './SideMenu';
import PageHeader from './PageHeader';
import Header from './Header';
import InventoryForecast from './InventoryForecast';
import ProductFields from './ProductFields';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '240px',
    width: '100%',
  },
  cardArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-around',
    alignItems: 'center',
    margin: '35px',
    // height: '400px',
    width: '90%',
  },
  header: {
    marginTop: '30px',
    marginBottom: '10px',
  },
  form: {
    width: '500px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },
}));

const yupSchema = object().shape({
  products: array().of(
    object().shape({
      product: object()
        .required('product is a required field')
        .typeError('product is a required field'),
      quantity: number()
        .required('quantity is a required field')
        .min(1, 'quantity must at least be 1')
        .typeError('price must be a number'),
    })
  ),
});

export default function Inventory() {
  const classes = useStyles();
  const history = useHistory();
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

  const submitHandler = (items) => {
    axios({
      method: 'POST',
      url: 'http://localhost:4000/inventory/enter',

      data: items,
    }).then((response) => console.log(response));
  };

  return (
    <div className={classes.root}>
      <SideMenu />
      <Header quickbooksButton={false} />
      <PageHeader
        icon={<StoreIcon fontSize="large" />}
        title="Inventory"
        subtitle="View forecasted inventory demands."
        user={user}
      />
      <div className={classes.cardArea}>
        <Card className={classes.cards}>
          <Typography className={classes.header}>
            Enter Recieved Inventory
          </Typography>
          <Formik
            initialValues={{
              products: [
                {
                  id: 1,
                  product: '',
                  quantity: '',
                },
              ],
            }}
            validationSchema={yupSchema}
            onSubmit={(values) => submitHandler(values)}
          >
            {({ values, errors, submitForm, setFieldValue, touched }) => (
              <Form className={classes.form}>
                <Field
                  as={ProductFields}
                  errors={errors}
                  touched={touched}
                  numberOfItems={values.products}
                  shortened={true}
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
                      case 'serviceDate':
                        itemArray[indexOfItem].serviceDate = value;
                        setFieldValue('products', itemArray);
                        break;
                      default:
                        break;
                    }
                  }}
                />
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
                          serviceDate: '',
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
                    <Button type="submit">Submit</Button>
                  </ButtonGroup>
                </div>
                {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
              </Form>
            )}
          </Formik>
        </Card>
        <Card className={classes.cards}>
          <InventoryForecast />
        </Card>
      </div>
    </div>
  );
}
