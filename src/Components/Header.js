import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';
import { useDispatch } from 'react-redux';
import Image from '../assets/images/quickbooks.png';
import hoverImage from '../assets/images/quickbooksHover.png';

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0)',
    // width: '100%',
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  quickbooksButton: {
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    width: '200px',
    height: '35px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': { backgroundImage: `url(${hoverImage})` },
  },
}));

export default function Header() {
  const classes = useStyles();

  const dispatch = useDispatch();

  // let quickbooksButton = null;
  // if (props.quickbooksButton) {
  //   quickbooksButton = (
  //     <a
  //       className={classes.quickbooksButton}
  //       href="http://localhost:4000/oauth"
  //     >
  //       Button
  //     </a>
  //   );
  // }

  const themeHandler = () => {
    dispatch({ type: 'SET_THEME' });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Sales Dashboard
          </Typography>
          {/* <IconButton>
            {quickbooksButton}
          </IconButton> */}

          <IconButton onClick={themeHandler}>
            <SettingsBrightnessIcon />
          </IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
