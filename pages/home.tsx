import ItemList from "../components/itemList/itemList"
import Login from "./auth/login"
import { useAuth } from "../components/auth/authProvider"
// /pages/authenticated.tsx
import React from 'react';
import GroupList from "./groupList";
import { firebaseInstance } from "../utils/firebase";
import { IUser } from "./api/entity/user";
import { State } from "../redux/reducers";
import { useSelector } from 'react-redux';
import {isEmpty} from 'lodash';

const Home =()=>{
    const userCookie = useAuth();
    console.log('usercookie*********************');
    console.log(userCookie);
    const connectedUser: IUser = useSelector((state:State)=> state.connectedUser.value);
    const loggedIn = ()=>{
        if(userCookie.user){
            if(isEmpty(connectedUser))
            return(
                <GroupList/>
            )
        }
            
        else{
            //firebaseInstance.auth().signOut();
            return(
                <Login/>
            )
        }
            
    }
    return (
        <div>
            {loggedIn()}
        </div>
    )
}
export default Home;