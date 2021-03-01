import React from 'react';
import {ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton, ListItemAvatar, Avatar} from '@material-ui/core';
import { IUserInGroup } from '../../redux/reducers/userInGroup.reducer';
interface I_UserForListProps{
  index: number,
  user : IUserInGroup,
  checked: boolean,
  handleToggle: (id: string)=>void
}
const UserForList = (props: I_UserForListProps) => {
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