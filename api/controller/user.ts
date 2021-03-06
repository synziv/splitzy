import { IUser } from '../entity/user';
import { database, firebaseInstance } from '../utils/firebase';
import { firebaseAdminInstanceApp } from '../utils/firebaseAdmin';
import {toArray} from 'lodash';
import express from 'express';

// make logic to only calculate if the item list has a different length

/*const resetOwingArr =(userInGroup: IUser[])=>{
  userInGroup.forEach(user=>{
    user.owingArr.forEach(x=> x.owing =0);
  });
}*/
export const fetchUsersInGroup = async (groupId: string)=>{
  const usersInGroup:any[] =[];
  // await database.ref('/users/').orderByChild('groups').equalTo('value').then((snapshot)=>snapshot.val().users);
  const usersIds = await database.ref('/groups/'+ groupId).once('value').then((snapshot)=>snapshot.val().users);
  for (const userId of usersIds){
    await database.ref('/users/'+ userId).once('value').then((snapshot)=>{
      usersInGroup.push({...snapshot.val(), id: userId});
    });
  }
  return usersInGroup;
}

export const getConnectedUser = async(tokenId:any)=>{
  let connectedUser;
  await firebaseAdminInstanceApp.auth()
    .verifyIdToken(tokenId)
    .then(async (decodedToken) => {
      // fetch user
      const currentUser = firebaseInstance.auth().currentUser
      if (currentUser) {
        connectedUser = await database.ref('/users').orderByChild('email').
        equalTo(currentUser.email).once('value').then(async (snapshot) => {
          const user = snapshot.val();
          user.groups = await Promise.all(user.groups.map(async (group: any) => await database.ref('/groups/' + group).once('value').then((snapshot1) => snapshot1.val())));
          return user
        })
      const key = Object.keys(connectedUser)
      connectedUser = { ...toArray(connectedUser)[0], id: key[0] };
      }
      else {
        // user is signed out, show sign-in form
      }

    })
  .catch((error) => {
    console.log(error.message)
    throw new Error('Error for fetching user');
  });
  return connectedUser;
}
