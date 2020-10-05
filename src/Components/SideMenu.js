import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DescriptionIcon from '@material-ui/icons/Description';
import MailIcon from '@material-ui/icons/Mail';
import Image from '../assets/images/inbound.png';

import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
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
    color: theme.palette.text.primary
  }
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
          <img src={Image} />
        </div>
        <Divider />
        <List>
          <Link to='/invoice' className={classes.links}>
            <ListItem button key={1}>
                <ListItemIcon><DescriptionIcon /></ListItemIcon>
                <ListItemText primary={'Invoices'} />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
   );
}
 
export default SideMenu;