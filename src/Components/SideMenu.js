import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import StoreIcon from '@material-ui/icons/Store';
import { Link } from 'react-router-dom';
import Image from '../assets/images/inbound.png';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '240px',
    flexShrink: 0,
    zIndex: 1,
  },
  drawerPaper: {
    width: '240px',
  },
  links: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));

const SideMenu = () => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <div className={classes.logo}>
        <img src={Image} alt="" />
      </div>
      <Divider />
      <List>
        <Link to="/home" className={classes.links}>
          <ListItem button key={1}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link to="/invoice" className={classes.links}>
          <ListItem button key={2}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Invoices" />
          </ListItem>
        </Link>
        <Link to="/inventory" className={classes.links}>
          <ListItem button key={3}>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideMenu;
