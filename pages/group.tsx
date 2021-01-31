import React from 'react';
import {ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton, ListItemAvatar, Avatar} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { IGroup } from './api/entity/group';

interface IGroupProps {
    group: IGroup;
    index: number
}

const GroupForList = (props: IGroupProps) => {
    const dispatch = useDispatch();
    const handleDeleteItem =()=>{
        //dispatch(deleteItem(props.item.id));
    }
    /*const deleteIcon =()=>{
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
    }*/
    if(props.group)
        return (
            <ListItem key={props.index} button>
                <ListItemText primary={props.group.name} />
                {/*deleteIcon()*/}
            </ListItem>
        )
    return null;
} 

export default GroupForList;

/*<Checkbox
    edge="end"
    onChange={/*handleToggle(value)}
    checked={checked.indexOf(value) !== -1}
    inputProps={{ 'aria-labelledby': labelId }}
/>*/