import React from 'react';
import {ListItem, ListItemText, ListItemAvatar, Avatar} from '@material-ui/core';
import { dbUsers } from '../../fakeDb';
import { IUser } from '../../objectTypes/user';

export type T_OwingUserForListProps = {
    value: {user:IUser, owing: number}
    index: number;
}

const OwingUserForList = (props: T_OwingUserForListProps) => {
    return (
        <ListItem key={props.index} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar color`}
                src={`/img/${props.value.user.color}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText primary={props.value.user.name} />
            <ListItemText primary={props.value.owing} />
        </ListItem>
    )
} 

export default OwingUserForList;