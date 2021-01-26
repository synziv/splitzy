import React from 'react';
import OwingUserForList from './owingUserForList';
import { List } from '@material-ui/core';
import { useSelector } from 'react-redux';

const generateUserInGroup = (connectedUser: number) =>{
    const userInGroup = useSelector(state=>state.userInGroup.values);
    const connectedUserTemp = userInGroup.find(user=>user.id == connectedUser);
    
    return connectedUserTemp.owingArr.map((value, index) =>{
        const owingUser = userInGroup.find(user=> user.id == value.user);
        const valueForChild = {user:owingUser, owing: value.owing};
        return <OwingUserForList value={valueForChild} index={index} />
    });
}
    
    
    
    
const TotalPrice = () => {
    return (
        <List dense>
            <h1>Alexis</h1>
            {generateUserInGroup(0)}
            <h1>Beatrice</h1>
            {generateUserInGroup(1)}
        </List>
    )
} 

export default TotalPrice;