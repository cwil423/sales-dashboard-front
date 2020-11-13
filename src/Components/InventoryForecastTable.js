import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();

  function createData(name, number) {
    return { name, number };
  }

  const rows = props.items.map((item) => {
    return createData(item.product_name, item.sum);
  });

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>{props.headers.mainHeader}</TableCell>
            {props.headers.otherHeaders.map((header) => (
              <TableCell align="right">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
