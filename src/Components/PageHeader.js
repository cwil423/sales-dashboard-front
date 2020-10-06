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
  },
}));

const PageHeader = ({ icon, title, subtitle }) => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div>
          <Typography variant="h4">{title}</Typography>
          <Typography>{subtitle}</Typography>
        </div>
      </div>
    </Paper>
  );
};

export default PageHeader;
