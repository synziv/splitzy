import { createContext, useState, useEffect, useContext } from 'react';
import 'firebase/auth';
import firebase from 'firebase/app';
import nookies from 'nookies';

const AuthContext = createContext<{ user: firebase.User | null }>({
  user: null,
});
//const firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");

const firebaseConfig = {
    apiKey: "AIzaSyDqCSteUWGiObMVDK7rB3hgoqHExkU-pCc",
    authDomain: "splitzy-4baa3.firebaseapp.com",
    databaseURL: "https://splitzy-4baa3-default-rtdb.firebaseio.com",
    projectId: "splitzy-4baa3",
    storageBucket: "splitzy-4baa3.appspot.com",
    messagingSenderId: "815338342836",
    appId: "1:815338342836:web:68fd8f927154bb761e0ae1",
    measurementId: "G-X45594301P"
};
function AuthProvider({ children }: any) {
   const [user, setUser] = useState<firebase.User | null>(null);

   useEffect(() => {
     return firebase.auth().onIdTokenChanged(async (user) => {
       console.log(user);
       if (!user) {
         setUser(null);
         nookies.set(undefined, 'token', '');
       } else {
         const token = await user.getIdToken();
         setUser(user);
         nookies.set(undefined, 'token', token);
       }
     });
   }, []);

   // force refresh the token every 10 minutes
   useEffect(() => {
     const handle = setInterval(async () => {
       const user = firebase.auth().currentUser;
       if (user) await user.getIdToken(true);
     }, 10 * 60 * 1000);

     // clean up setInterval
     return () => clearInterval(handle);
   }, []);

   return (
     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
   );
}
export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;