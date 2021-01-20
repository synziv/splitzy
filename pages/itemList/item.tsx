import React from 'react';
import {ListItem, ListItemText, ListItemSecondaryAction, Checkbox} from '@material-ui/core';
import {ItemProps} from '../../objectTypes/item';
const Item = ({name:name, index:index, total:total, data:data}: ItemProps) => {
    const labelId = "checkbox-list-secondary-label-" + index;
    return (
        <ListItem key={index} button>
            <ListItemText id={labelId} primary={name} secondary={total}/>
            <ListItemSecondaryAction>
                <Checkbox
                    edge="end"
                    checked={index !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                />
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