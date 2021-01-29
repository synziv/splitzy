import { NextApiRequest, NextApiResponse } from "next";
import { firebaseInstance } from "../../utils/firebase";
import { database } from "../../utils/firebase";
import { User } from "./entity/user";
import {toArray} from 'lodash';

const createUser = async (user)=>{
   const newUser = new User({
     name: user.name,
     email: user.email
   })
  const key = await database.ref('/users').push(newUser).key;
  console.log('user created');
  return {...newUser, id: key};
}

const facebookAuth = async (credential) => {
  // Sign in with the credential from the Facebook user.
  let user=null
  const credentialJson = firebaseInstance.auth.AuthCredential.fromJSON(credential);
  await firebaseInstance.auth().signInWithCredential(credentialJson)
    .then(async (result) => {
      // Signed in       
      const appUser = await database.ref('/users').orderByChild('email').equalTo(result.user.email).once('value').then((snapshot)=>snapshot.val());
      if(appUser == null){
        user = await createUser({
          name: result.user.displayName,
          email: result.user.email
        });
      }
      else{
        const key = Object.keys(appUser)
        user= {...toArray(appUser)[0], id: key[0]};
      }
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorMessage);
      console.log(email);
      console.log(errorCode);
      console.log(credential);
    });
    return user;

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch(req.method){
      case 'GET':{
        const user = await facebookAuth(req.query.credential);
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user))
        break;
      }
    }
}