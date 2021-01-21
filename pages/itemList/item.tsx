import React from 'react';
import {ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton, ListItemAvatar, Avatar} from '@material-ui/core';
import {T_ItemProps} from '../../objectTypes/item';
import {Delete} from '@material-ui/icons';
const Item = (props: T_ItemProps) => {
    return (
        <ListItem key={props.index} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar color`}
                src={`/img/${props.item.user.color}.jpg`}
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

export default Item;

/*<Checkbox
    edge="end"
    onChange={/*handleToggle(value)}
    checked={checked.indexOf(value) !== -1}
    inputProps={{ 'aria-labelledby': labelId }}
/>*/