import React from 'react';
import OwingUserForList from './owingUserForList';
import { List } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reducers';

const generateUserInGroup = (connectedUser: string) =>{
    const userInGroup = useSelector((state:State)=>state.userInGroup.values);
    if(userInGroup && userInGroup.length > 0){
        const connectedUserTemp = userInGroup.find(user => user.id == connectedUser);
        if (connectedUserTemp) {
            return connectedUserTemp.owingArr.map((value, index) => {
                const owingUser = userInGroup.find(user => user.id == value.user);
                if(owingUser){
                    const valueForChild = { user: owingUser, owing: value.owing };
                    return <OwingUserForList value={valueForChild} index={index} />
                }
            });
        }

    }
}
    
    
    
    
const TotalPrice = () => {
    return (
        <List dense>
            <h1>Alexis</h1>
            {generateUserInGroup('-MS3Vc-PX4CZzmfVi9hO')}
            <h1>Beatrice</h1>
            {generateUserInGroup('-MS3VYXs7TTA5oSadrcA')}
        </List>
    )
} 

export default TotalPrice;