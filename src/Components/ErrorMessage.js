import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';

const useStyles = makeStyles(() => ({
  message: {
    color: 'red',
    paddingTop: '15px',
  },
}));

export default function ErrorMessage(props) {
  const classes = useStyles();
  const key = props.id - 1;

  let message = '';

  switch (props.type) {
    case 'product':
      if (props.errors.products && props.touched.products) {
        if (props.errors.products[key]) {
          if (props.errors.products[key].product) {
            message = props.errors.products[key].product;
          }
        }
      }
      break;
    case 'quantity':
      if (props.errors.products && props.touched.products) {
        if (props.errors.products[key]) {
          if (props.errors.products[key].quantity) {
            message = props.errors.products[key].quantity;
          }
        }
      }
      break;
    case 'price':
      if (props.errors.products && props.touched.products) {
        if (props.errors.products[key]) {
          if (props.errors.products[key].price) {
            message = props.errors.products[key].price;
          }
        }
      }
      break;
    default:
      break;
  }

  return <div className={classes.message}>{message}</div>;
}
