import { firebaseInstance } from "../utils/firebase";
import { database } from "../utils/firebase";
import firebase from "firebase";
import { IUser, User } from "../entity/user";
import {toArray} from 'lodash';
import express from "express";

export const createUser = async (user: IUser) => {
  const newUser = new User({
    name: user.name,
    email: user.email
  })
  const key = await database.ref('/users').push(newUser).key;
  return { ...newUser, id: key };
}

export const facebookAuth = async (req: express.Request, res: express.Response) => {
  try {
    // Sign in with the credential from the Facebook user.
    let user = null
    const credentialJson: firebase.auth.OAuthCredential = firebaseInstance.auth.AuthCredential.fromJSON(req.body.credential);
    await firebaseInstance.auth().signInWithCredential(credentialJson)
      .then(async (result: any) => {
        // Signed in
        const appUser = await database.ref('/users').orderByChild('email').equalTo(result.user.email).once('value').then((snapshot) => snapshot.val());
        if (appUser == null) {
          user = await createUser({
            name: result.user.displayName,
            email: result.user.email
          });
        }
        else {
          const key = Object.keys(appUser)
          user = { ...toArray(appUser)[0], id: key[0] };
          user.groups = await Promise.all(user.groups.map(async (group: any) => await database.ref('/groups/' + group).once('value')
            .then((snapshot) => {return {...snapshot.val(), id: snapshot.key}})))
        }
      });
    res.send(user);
  } 
  catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    // ...
    console.log(errorMessage);
  }
}
