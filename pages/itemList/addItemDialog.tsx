import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { T_AddItemDialogProps } from '../../objectTypes/addItemDialogProps';
import { alexis } from '../../fakeDb';

export default function AddItemDialog(props: T_AddItemDialogProps) {
const [name, setName] = React.useState('');
const [total, setTotal] = React.useState(0);
const handleNameChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setName(e.target.value);
}
const handleTotalChange = (e: ChangeEvent<HTMLInputElement>)=>{
    try{
        setTotal(Number(e.target.value))
    }
    catch{}
}
const close = ()=>{
    setName('');
    setTotal(0);
    props.handleClose();
}
const save=()=>{
    props.saveItem(name, total, alexis);
    close();
}
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add an item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add an item enter the name and the total price you paid it
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name of the item"
            value={name}
            fullWidth
            onChange={handleNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="total"
            label="Total price of the item"
            value={total}
            fullWidth
            onChange={handleTotalChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={save} color="primary">
            Add item
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}