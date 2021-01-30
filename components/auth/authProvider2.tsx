import React, { useState, useEffect, useContext, createContext } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/auth.actions';
import { firebaseInstance } from '../../utils/firebase';

export type AuthContextType = {
    user: {},
    signInWithFacebook: ()=>void
  }


const authContext = createContext(null);

// You can wrap your _app.js with this provider
export function AuthProvider2({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Custom React hook to access the context
export const useAuth = () => {
  return authContext;
};

export const useProvideAuth =()=> {
  // Store the user in state
  const [user, setUser] = useState(null);

  const signInWithFacebook = () => {
      console.log('facebook sign provider2')
    const dispatch = useDispatch();
    const provider = new firebaseInstance.auth.FacebookAuthProvider();
    firebaseInstance.auth().signInWithRedirect(provider);
    firebaseInstance.auth()
                .getRedirectResult()
                .then(async (result) => {
                    if (result.credential)
                        await dispatch(login(result.credential));
                    
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
  };

  const signout = () => {
    return firebaseInstance
      .auth()
      .signOut()
      .then(() => setUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebaseInstance.auth().onIdTokenChanged(() => setUser(false));
    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithFacebook,
    signout
  };
}