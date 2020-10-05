import React, { useState } from 'react';
import Header from './Header';
import PageHeader from './PageHeader';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SideMenu from './SideMenu';
import axios from 'axios';
import { Card, makeStyles, TextField } from '@material-ui/core';

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
    width: '400px'
  },
  form: {
    margin: theme.spacing(2)
  }
}));



const Invoice = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [salespeople, setSalespeople] = useState([]);

  const createInvoiceHandler = () => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/sales/invoice',
      data: {
  
      }
    })
  }
  
  const getCustomerHandler = (letters) => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/sales/customers',
      data: {letters: letters}
    }).then(response => {
      setCustomers(response.data)
      }
    )
  }

  const getSalespersonHandler = (letters) => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/sales/salespeople',
      data: {letters: letters}
    }).then(response => {
      setSalespeople(response.data)
      }
    )
  }

  return ( 
    <div className={classes.root}>
      <Header quickbooksButton/>
      <PageHeader 
        icon={<TrendingUpIcon fontSize='large'/>}
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
              getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Customer" variant="outlined" />}
              onInputChange={(event, newInputValue) => {
                if (newInputValue != '') {
                  let letters = newInputValue;
                  getCustomerHandler(letters);
                }
              }}
              onChange={(event, newValue) => {
                console.log(newValue)
              }}
            />
          </div>
          <div>
            <Autocomplete
              id="combo-box-demo"
              options={salespeople}
              getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Salesperson" variant="outlined" />}
              onInputChange={(event, newInputValue) => {
                if (newInputValue != '') {
                  let letters = newInputValue;
                  getSalespersonHandler(letters);
                }
              }}
            />
          </div>
          <div>
            <TextField id='outlined-basic' label='Product' variant='outlined' margin='dense' />
          </div>
          <div>
            <TextField id='outlined-basic' label='Price' variant='outlined' margin='dense' />
          </div>
          <div>
            <TextField id='outlined-basic' label='Quantity' variant='outlined' margin='dense' />
          </div>
        </form>
        <button onClick={() => console.log(customers)}>Create Invoice</button>
      </Card>



    </div>
   );
}
 
export default Invoice;