import React from 'react';
import { Card, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  pageHeader: {
    display: 'flex',
    padding: theme.spacing(2),
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  user: {
    marginRight: '35px',
  },
  iconAndTitles: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const PageHeader = ({ icon, title, subtitle, user }) => {
  const classes = useStyles();
  console.log(user);

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.pageHeader}>
        <div className={classes.iconAndTitles}>
          <Card className={classes.pageIcon}>{icon}</Card>
          <div>
            <Typography variant="h4">{title}</Typography>
            <Typography>{subtitle}</Typography>
          </div>
        </div>
        <div className={classes.user}>
          Current User:
          <Typography>
            {user ? user.firstName : null} {user ? user.lastName : null}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default PageHeader;
