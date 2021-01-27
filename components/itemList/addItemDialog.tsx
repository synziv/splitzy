import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { T_AddItemDialogProps } from '../../objectTypes/addItemDialogProps';
import { Select, List } from '@material-ui/core';
import UserForList from './userForList';
import { addItem } from '../../redux/actions/items.actions';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/reducers';
import { IUser } from '../../objectTypes/user';

export default function AddItemDialog(props: T_AddItemDialogProps) {
  const usersInGroup: IUser[] = useSelector((state: State) =>state.userInGroup.values);
  const connectedUser: IUser = useSelector((state:State)=> state.connectedUser.value);
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [total, setTotal] = React.useState(0);
  const [splitMode, setSplitMode] = React.useState('all');
  const [customSplitMode, setCustomSplitMode] = React.useState('even');
  const [splitWith, setsplitWith] = React.useState([]);


  const generateSplitWith =(): string[]=>{
    let nextSplitWith:string[]=[];
      usersInGroup.forEach(user=> {
        //modifier pour connected user
        if(user.id!= connectedUser.id)
          nextSplitWith.push(user.id)
      });
    return nextSplitWith;
  }
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }
  const handleTotalChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setTotal(Number(e.target.value))
    }
    catch{ }
  }
  const handleSplitModeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSplitMode(e.target.value);
    if(e.target.value == 'all')
      setsplitWith(generateSplitWith());
  }
  
  const handleCustomSplitModeChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCustomSplitMode(e.target.value);
  }
  const close = () => {
    setName('');
    setTotal(0);
    props.handleClose();
  }
  const save = () => {
    const splitModeToSave = splitMode == 'all' ? splitMode : customSplitMode;
    const groupId = 1;
    //name, total, userId, splitModeToSave, splitWith,
    dispatch(addItem({
      name: name,
      total: total,
      splitMode: splitModeToSave,
      splitWith: splitModeToSave =='all'? generateSplitWith() : splitWith,
      user: 0,
      groupId: 1
    }));
    close();
  }
  //changer avec connected user
  const generateUserInGroup = () =>
      usersInGroup.map((user, index) => {
        if(user.id!=connectedUser.id){
          let checked = splitWith.includes(user.id) ? true : false;
          return <UserForList user={user} index={index} checked={checked} handleToggle={handleToggleUser} />
        }
    });
  const handleToggleUser = (userId: number) => {
    let temp = splitWith;
    if (splitWith.includes(userId)) {
      const index = splitWith.findIndex(exceptUserId => exceptUserId == userId);
      temp.splice(index, 1);
    }
    else
      temp.push(userId);
    setsplitWith([...temp]);
  }
  const customChoices = () => {
    if (splitMode != 'all') {
      return (
        <div>
          <List dense>
            {generateUserInGroup()}
          </List>
          <Select
            native
            value={customSplitMode}
            onChange={handleCustomSplitModeChange}
          >
            <option aria-label="even" value="even">Even</option>
            <option value={1/3}>1/3</option>
            <option value={2/3}>2/3</option>
            <option value={1/4}>1/4</option>
            <option value={3/4}>3/4</option>
          </Select>
        </div>
      )
    }
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
          <Select
            native
            value={splitMode}
            onChange={handleSplitModeChange}
          >
            <option aria-label="All" value="all">All</option>
            <option value="custom">Custom</option>
          </Select>
          {customChoices()}
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