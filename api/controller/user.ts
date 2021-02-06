import { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../objectTypes/user';
import { database, firebaseInstance } from '../../utils/firebase';
import { firebaseAdminInstance } from '../../utils/firebaseAdmin';
import {toArray} from 'lodash';

//make logic to only calculate if the item list has a different length

const resetOwingArr =(userInGroup: IUser[])=>{
  userInGroup.forEach(user=>{
    user.owingArr.forEach(x=> x.owing =0);
  });
}
const fetchUsersInGroup = async (groupId: string)=>{
  let usersInGroup =[];
  //await database.ref('/users/').orderByChild('groups').equalTo('value').then((snapshot)=>snapshot.val().users);
  const usersIds = await database.ref('/groups/'+ groupId).once('value').then((snapshot)=>snapshot.val().users);
  for (const userId of usersIds){
    await database.ref('/users/'+ userId).once('value').then((snapshot)=>{
      usersInGroup.push({...snapshot.val(), id: userId});
    });
  }
  return usersInGroup;
}
  
const getConnectedUser = async(tokenId)=>{
  let connectedUser;
  await firebaseAdminInstance.auth()
  .verifyIdToken(tokenId)
    .then(async (decodedToken) => {
      //fetch user
      connectedUser = await database.ref('/users').orderByChild('email').
        equalTo(firebaseInstance.auth().currentUser.email).once('value').then(async (snapshot) => {
          const user = snapshot.val();
          user.groups =await Promise.all(user.groups.map(async (group)=> await database.ref('/groups/' + group).once('value').then((snapshot) => snapshot.val())));
          return user
        })
      const key = Object.keys(connectedUser)
      connectedUser = { ...toArray(connectedUser)[0], id: key[0] };
  })
  .catch((error) => {
    console.log(error.message)
    throw 'Error for fetching user';
  });
  return connectedUser;          
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method){
    case 'GET': {
      if (req.query.method == 'getConnectedUser') {
        try {
          const connectedUser = await getConnectedUser(req.query.tokenId);
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(connectedUser))
        }
        catch{
          res.statusCode = 403
          res.end();
        }

      }
      else{
        let userInGroup = await fetchUsersInGroup('-MS3W5LMXAwk9nqRl0Dc');
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(userInGroup))
      }
      
      break;
    }
  }
  
}
