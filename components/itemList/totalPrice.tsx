import React from 'react';
import OwingUserForList from './owingUserForList';
import { List } from '@material-ui/core';
import { useSelector } from 'react-redux';

const generateUserInGroup = (connectedUser: string) =>{
    const userInGroup = useSelector(state=>state.userInGroup.values);
    if(userInGroup && userInGroup.length > 0){
        const connectedUserTemp = userInGroup.find(user=>user.id == connectedUser);
        return connectedUserTemp.owingArr.map((value, index) =>{
            const owingUser = userInGroup.find(user=> user.id == value.user);
            const valueForChild = {user:owingUser, owing: value.owing};
            return <OwingUserForList value={valueForChild} index={index} />
        });
    }
}
    
    
    
    
const TotalPrice = () => {
    return (
        <List dense>
            <h1>Alexis</h1>
            {generateUserInGroup('-MS3VYXs7TTA5oSadrcA')}
            <h1>Beatrice</h1>
            {generateUserInGroup('-MS3Vc-PX4CZzmfVi9hO')}
        </List>
    )
} 

export default TotalPrice;