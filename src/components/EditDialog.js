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

export default function EditDialog(props) {

 const initialState = {
    open: false, 
    textValue: 0,
    textPass: ''
}

  const [state, setState] = React.useState(initialState);
  
  const handleClick = (value) => props.onClick ? props.onClick(value) : null

  const handleClickOpen = () => {
    setState({...state, open:true});
  };

  const handleClose = () => {
    setState(initialState);
  };

  const handleFinish = () => {
    handleClick(state.textValue)
    setState(initialState);
  };

  const handleTextFieldOnChange = ({target}) => {
    setState({...state, textValue: target.value});
  };


  const handlePasswordFieldOnChange = ({target}) => {
    setState({...state, textPass: target.value});
  };

  return (
    <div>
      <IconButton onClick={() => handleClickOpen()} aria-label="delete">
         <EditIcon />
      </IconButton>
      <Dialog open={state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Quantidade produtos:
          </DialogContentText>
          <div>
          <TextField
            id="outlined-number"
            label="Número"
            type="number"
            value={state.textValue}
            onChange={handleTextFieldOnChange}
            InputLabelProps={{
             shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            value={state.textPass}
            error={!state.textPass || state.textPass !== 'Teste' ? true : false}
            onChange={handlePasswordFieldOnChange}
            id="outlined-error-helper-text"
            label="Password"
            type="password"
            autoComplete="current-password"
            helperText="Incorrect entry."
            variant="outlined"
          />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button disabled={!state.textPass || state.textPass !== '0104' ? true : false} onClick={handleFinish} color="primary">
            Finalizar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
