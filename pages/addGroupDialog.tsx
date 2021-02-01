import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../objectTypes/user';
import { State } from '../redux/reducers';
import { addGroup } from '../redux/actions/group.actions';

export type T_AddGroupDialogProps = {
  open: boolean;
  handleClose: ()=>void;
}

export default function AddGroupDialog(props: T_AddGroupDialogProps) {
  const connectedUser: IUser = useSelector((state:State)=> state.connectedUser.value);
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');



  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const close = () => {
    setName('');
    props.handleClose();
  }
  const save = () => {
    //name, total, userId, splitModeToSave, splitWith,
    dispatch(addGroup({
      name: name,
      user: connectedUser.id,
    }));
    close();
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name of the item"
            value={name}
            fullWidth
            onChange={handleNameChange}
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