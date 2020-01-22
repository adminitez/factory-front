import React, { useEffect, useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import EditDialog from './EditDialog'
import FinishVerificationDialog from './FinishVerificationDialog'
import api from '../services/Api'

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
    inputValue: "",
    codeEan: ""
  });

  useEffect(()=> {
    loadProducts();   
    //window.addEventListener('keypress', (event) =>{handleChangeInput(event.key)})
  }, [])

  async function loadProducts(){
    await setState({...state, products: purchaseOrder && purchaseOrder.products})
  }

  function handleEditClick(product, quantity){
    verificationProduct(product.code, quantity)
    setState({...state, inputValue:""})
  };


  function handleSaveClick(purchaseOrderId, products){
    const body = {
      products: products
    }

    api.patch('/purchase-orders/'+purchaseOrderId+'/products', body)
  };


  function handleChangeInput(key){
    setState({...state, codeEan: state.codeEan+key})

    if(state.codeEan.length === 12){
      state.products.forEach(product => {
        if(product.code === state.codeEan+key){
          product.totalVerified+=1
        }
      })
      setState({...state, codeEan: ""})
    }
  };

  function verificationProduct(code, quantity){
    state.products.forEach(product => {
      if(product.code === code){
        product.totalVerified = Number(quantity)
      }
    })
  }

  function rowColor(row){
    if(row.quantity < row.totalVerified)return "red"
    else if(row.quantity == row.totalVerified)return "green"
    else if(row.totalVerified > 0) return "yellow"
    else return "default"
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={() => handleSaveClick(purchaseOrder.purchaseOrderId, state.products)}
      >
        Salvar
      </Button>
    <FinishVerificationDialog purchaseOrderId={purchaseOrder.purchaseOrderId}/>
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
            <TableRow key={row.name} style={{backgroundColor:rowColor(row)}} >
              <TableCell component="th" scope="row">
                {row.code}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.quantity+"/"+row.totalVerified}</TableCell>
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