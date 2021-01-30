import ItemList from "../components/itemList/itemList"
import Login from "./auth/login"
import { useAuth } from "../components/auth/authProvider"
// /pages/authenticated.tsx
import React from 'react';
import nookies from 'nookies';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import { admin } from '../utils/firebaseAdmin';


const Home =()=>{
    const userCookie = useAuth();
    const loggedIn = ()=>{
        if(userCookie.user)
            return(
                <ItemList/>
            )
        else
            return(
                <Login/>
            )
    }
    return (
        <div>
            {loggedIn()}
        </div>
    )
}
export default Home;