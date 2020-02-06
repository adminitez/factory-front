import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import InputAdornment from '@material-ui/core/InputAdornment';
import DoneIcon from '@material-ui/icons/Done';

import api from '../services/Api'
import history from '../history';

export default function FinishVerificationDialog(props) {

 const initialState = {
    open: false, 
    amountBoxes: 0,
    grossWeight: 0.0
}

  const [state, setState] = React.useState(initialState);
  
  const handleClickOpen = () => {
    setState({...state, open:true});
  };

  const handleClose = () => {
    setState(initialState);
  };

  const handleFinish = async() => {
    let body = {
      quantityBoxes: state.amountBoxes,
      grossWeight: state.grossWeight
    }
    await api.patch('/purchase-orders/'+props.purchaseOrderId+'/freight', body)
    
    body = {
      products: props.products
    }

    await api.patch('/purchase-orders/'+props.purchaseOrderId+'/products', body)
    
    history.goBack()
  };

  const handleTextFieldAmountBoxesOnChange = ({target}) => {
    setState({...state, amountBoxes: target.value});
  };

  const handleTextFieldGrossWeightOnChange = ({target}) => {
    setState({...state, grossWeight: target.value});
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<DoneIcon />}
        onClick={() => handleClickOpen()}
      >
        Finalizar
      </Button>
      <Dialog open={state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Finalizar verificação do pedido</DialogTitle>
        <DialogContent>
          <div>
          <TextField
            id="outlined-number"
            label="Quantidade de caixas"
            type="number"
            value={state.amountBoxes}
            onChange={handleTextFieldAmountBoxesOnChange}
            InputLabelProps={{
             shrink: true,
            }}
            variant="outlined"
          />
          <TextField
          label="Peso bruto"
          id="outlined-start-adornment"
          value={state.grossWeight}
          onChange={handleTextFieldGrossWeightOnChange}
          type="number" 
          InputProps={{
            startAdornment: <InputAdornment position="end">Kg </InputAdornment>,
          }}
          variant="outlined"
        />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button disabled={(state.amountBoxes !== 0 && state.grossWeight !== 0) ? false : true} onClick={handleFinish} color="primary">
            Finalizar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
