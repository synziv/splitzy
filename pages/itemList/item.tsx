import React from 'react';
import {ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton} from '@material-ui/core';
import {T_ItemProps} from '../../objectTypes/item';
import {Delete} from '@material-ui/icons';
const Item = (props: T_ItemProps) => {
    const labelId = "checkbox-list-secondary-label-" + props.index;
    return (
        <ListItem key={props.index} button>
            <ListItemText id={labelId} primary={props.item.name} secondary={props.item.total} />
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