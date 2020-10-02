import React from 'react';
import Header from './Header';
import PageHeader from './PageHeader';
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import SideMenu from './SideMenu';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '240px',
    width: '100%',
  },
}));


const Invoice = () => {
  const styles = useStyles();

  return ( 
    <div>
      <Header quickbooksButton/>
      <PageHeader 
        icon={<TrendingUpIcon fontSize='large'/>}
        title="Sales Dashboard by Inbound Technologies"
        subtitle="Sales analytics and forecasting to prepare your business for what's next."
      />
      <SideMenu />
    </div>
   );
}
 
export default Invoice;