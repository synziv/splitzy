import React from 'react';
import { T_TotalPriceProps } from '../../objectTypes/totalPriceProps';
import { dbGroups, dbUsers } from '../../fakeDb';
import OwingUserForList from './owingUserForList';
import { List } from '@material-ui/core';
import { IUser } from '../../objectTypes/user';

const generateUserInGroup = (connectedUser: number, groupUsers: IUser[]) =>
    groupUsers[connectedUser].owingArr.map((value, index) =>{
        const owingUser = groupUsers.find(user=> user.id == value.user);
        const valueForChild = {user:owingUser, owing: value.owing};
        return <OwingUserForList value={valueForChild} index={index} />
    });
    
    
    
const TotalPrice = ({groupUsers}) => {
    return (
        <List dense>
            <h1>Alexis</h1>
            {generateUserInGroup(0, groupUsers)}
            <h1>Beatrice</h1>
            {generateUserInGroup(1, groupUsers)}
        </List>
    )
} 

export default TotalPrice;