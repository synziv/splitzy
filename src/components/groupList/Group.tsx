import React from 'react';
import {ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton, ListItemAvatar, Avatar} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { IGroup } from '../../entity/group';
import { group } from 'console';

interface IGroupProps {
    group: IGroup;
    index: number
}

const GroupForList = (props: IGroupProps) => {
    const dispatch = useDispatch();
    const history = useHistory();
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
    const groupClicked=()=>{
        console.log(props.group.id);
        history.push(`/items/${props.group.id}`);
    }
    if(props.group)
        return (
            <ListItem key={props.index} button onClick={groupClicked}>
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