import Login from "./auth/login"
import { useAuth } from "../components/auth/authProvider"
import React from 'react';
import GroupList from "./groupList";
import { firebaseInstance } from "../utils/firebase";
import { IUser } from "./api/entity/user";
import { State } from "../redux/reducers";
import { useSelector, useDispatch } from 'react-redux';
import {isEmpty} from 'lodash';
import { getConnectedUser } from "../redux/actions/user.actions";
import { IConnectedUserState } from "../redux/reducers/connectedUser.reducer";

const Home =()=>{
    const dispatch = useDispatch();
    const userCookie = useAuth();
    const connectedUser: IConnectedUserState = useSelector((state:State)=> state.connectedUser);
    const loggedIn = ()=>{
        if(userCookie.user){
            console.log(userCookie.user);
            console.log(connectedUser)
            console.log(isEmpty(connectedUser.value));
            if(isEmpty(connectedUser.value) && connectedUser.requestState!='requesting'){
                if(firebaseInstance.auth().currentUser == null)
                    firebaseInstance.auth().signOut();
                userCookie.user.getIdToken().then((token)=>{
                    dispatch(getConnectedUser(token));
                });
            }
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