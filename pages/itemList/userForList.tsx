import React from 'react';
import {ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton, ListItemAvatar, Avatar} from '@material-ui/core';
import { T_UserForListProps } from '../../objectTypes/addItemDialogProps';
const UserForList = (props: T_UserForListProps) => {
    return (
        <ListItem key={props.index} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar color`}
                src={`/img/${props.user.color}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText primary={props.user.name} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={()=>{props.handleToggle(props.user.id)}}
                checked={props.checked}
              />
            </ListItemSecondaryAction>
        </ListItem>
    )
} 

export default UserForList;