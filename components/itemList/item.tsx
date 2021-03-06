import React from 'react';
import {ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton, ListItemAvatar, Avatar} from '@material-ui/core';
import {T_ItemProps} from '../../objectTypes/item';
import {Delete} from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem } from '../../redux/actions/items.actions';
import { State } from '../../redux/reducers';
import { connectedUser } from '../../redux/reducers/connectedUser.reducer';


const ItemForList = (props: T_ItemProps) => {
    const dispatch = useDispatch();
    const user = useSelector((state:State)=>state.userInGroup.values.find(user=> user.id == props.item.user));
    const connectedUser = useSelector((state:State)=>state.connectedUser.value);
    const handleDeleteItem =()=>{
        dispatch(deleteItem(props.item.id));
    }
    const deleteIcon =()=>{
        if(connectedUser.id == props.item.user){
            return(
                <ListItemSecondaryAction>
                    <IconButton aria-label="delete" onClick={handleDeleteItem}>
                        <Delete fontSize="small" />
                    </IconButton>
                </ListItemSecondaryAction>
            )
        }
        return null
    }
    if(user)
        return (
            <ListItem key={props.index} button>
                <ListItemAvatar>
                <Avatar
                    alt={`Avatar color`}
                    src={`/img/${user.color}.jpg`}
                />
                </ListItemAvatar>
                <ListItemText primary={props.item.name} secondary={props.item.total} />
                {deleteIcon()}
            </ListItem>
        )
    return null;
} 

export default ItemForList;

/*<Checkbox
    edge="end"
    onChange={/*handleToggle(value)}
    checked={checked.indexOf(value) !== -1}
    inputProps={{ 'aria-labelledby': labelId }}
/>*/