import React from 'react';
import {ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton, ListItemAvatar, Avatar} from '@material-ui/core';
import {T_ItemProps} from '../../objectTypes/item';
import {Delete} from '@material-ui/icons';
import { dbUsers } from '../../fakeDb';
import { useSelector } from 'react-redux';

const ItemForList = (props: T_ItemProps) => {
    const user = useSelector(state=>state.userInGroup.values[props.item.user]);
    return (
        <ListItem key={props.index} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar color`}
                src={`/img/${user.color}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText primary={props.item.name} secondary={props.item.total} />
            <ListItemSecondaryAction>
                <IconButton aria-label="delete" onClick={()=>props.delete(props.index)}>
                    <Delete fontSize="small" />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
} 

export default ItemForList;

/*<Checkbox
    edge="end"
    onChange={/*handleToggle(value)}
    checked={checked.indexOf(value) !== -1}
    inputProps={{ 'aria-labelledby': labelId }}
/>*/