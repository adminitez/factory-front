import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

import React from 'react';
import ReactLoading from "react-loading";
import history from '../history';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);

  const purchaseOrders = props.purchaseOrders
  const loading = props.loading


  const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell align="center">Cliente</TableCell>
          </TableRow>
        </TableHead>
        {loading ? <div style={{width: "100%",height: "100",display: "flex",justifyContent: "center",alignItems: "center"}}><CircularProgress /></div> : <SimpleTableBody purchaseOrders={purchaseOrders} />}
    
        {/* <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={purchaseOrders.length}
              rowsPerPage={5}//rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
               onChangePage={handleChangePage}
            //   onChangeRowsPerPage={handleChangeRowsPerPage}
            //   ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter> */}
      </Table>
    </TableContainer>
  );
}

function SimpleTableBody(props) {

  const purchaseOrders = props.purchaseOrders

  function handleClick(purchaseOrder){
    history.push('/product-count/'+purchaseOrder.purchaseOrderId);
  };

  return (
    <TableBody>
        {purchaseOrders.map(row => (
          <TableRow key={row.purchaseOrderId} onClick={() => handleClick(row)}>
            <TableCell component="th" scope="row">
              {Number(row.purchaseOrderNumber)}
            </TableCell>
            <TableCell align="center">{row.clientName}</TableCell>
          </TableRow>
        ))}
    </TableBody>
  )
}
