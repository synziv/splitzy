import React from 'react';
import { Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import { firebaseInstance } from '../../utils/firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/auth.actions';

const Login = () => {
    const dispatch = useDispatch();
    const provider = new firebaseInstance.auth.FacebookAuthProvider();
    
    const facebookAuth = () => {
        firebaseInstance.auth().signInWithRedirect(provider);
    }

    firebaseInstance.auth()
                .getRedirectResult()
                .then((result) => {
                    if (result.credential)
                        dispatch(login(result.credential));
                    
                }).catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                    console.log(errorCode)
                });
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<FacebookIcon />}
            onClick={facebookAuth}
        >Login !</Button>
        
    )
}

export default Login;