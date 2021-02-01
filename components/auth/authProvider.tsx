import { createContext, useState, useEffect, useContext } from 'react';
import 'firebase/auth';
import firebase from 'firebase/app';
import nookies from 'nookies';
import { State } from "../../redux/reducers";
import { useSelector } from 'react-redux';
import { IUser } from '../../pages/api/entity/user';
import { IConnectedUserState } from '../../redux/reducers/connectedUser.reducer';

const AuthContext = createContext<{ user: firebase.User | null }>({
  user: null,
});

function AuthProvider({ children }: any) {
   const [user, setUser] = useState<firebase.User | null>(null);
   const connectedUser: IConnectedUserState = useSelector((state:State)=> state.connectedUser);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged((firebaseUser) => {
      console.log('*************connected user');
      console.log(connectedUser);
      console.log('*************firebase user');
      console.log(user);
      if (!firebaseUser) {
        setUser(null);
        nookies.set(undefined, 'token', '');
      } else {
        firebaseUser.getIdToken().then((token)=>{
          setUser(firebaseUser);
          nookies.set(undefined, 'token', token);
        });
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