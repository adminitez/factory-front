import React, { useEffect, useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import EditDialog from './EditDialog'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ProductCountTable(props) {
  const classes = useStyles();
  const {purchaseOrder} = props;
  var sub = null;
  

  const [state, setState] = useState({
    products: [],
    inputValue: ""
  });

  useEffect(async()=> {
    await loadProducts();   
    // sub = document.addEventListener("paste", handleChangeInput)    
  }, [])

  async function loadProducts(){
    await setState({...state, products: purchaseOrder && purchaseOrder.products})
  }

  function handleEditClick(product, quantity){
    verificationProduct(product.code, quantity)
    setState({...state, inputValue:""})
  };


  function handleChangeInput(code){
    verificationProduct(code, 1)
    setState({...state, inputValue:""})
  };

  function verificationProduct(code, quantity){
    state.products.forEach(product => {
      if(product.code === code){
        product.quantity = product.quantity-quantity
      }
    }
    )
  }

  return (
    <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Código de Barras</TableCell>
            <TableCell align="right">Produto</TableCell>
            <TableCell align="right">Quantidade</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.products.map(row => (
            <TableRow key={row.name} style={{backgroundColor:row.quantity<0 ? "red" : "default"}} >
              <TableCell component="th" scope="row">
                {row.code}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="center">
               <EditDialog onClick={(value) => handleEditClick(row, value)}/>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   <input type="text" value={state.inputValue} onChange={event => handleChangeInput(event.target.value)} autoFocus />
   </div>
  );
}