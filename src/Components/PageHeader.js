import { Card, makeStyles, Paper, Typography } from '@material-ui/core';
import { CallMissedSharp } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  },
  pageHeader: {
    display: 'flex',
    padding: theme.spacing(2),
    // justifyContent: 'center',
    alignItems: 'center'
  }
}));

const PageHeader = (props) => {
  const classes = useStyles();

  return ( 
    <Paper elevation={0} className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>
          {props.icon }
        </Card>
        <div>
          <Typography variant='h4'>
            {props.title}
          </Typography>
          <Typography>
            {props.subtitle}
          </Typography>
        </div>
      </div>
    </Paper>
   );
}
 
export default PageHeader;