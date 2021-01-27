import { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../objectTypes/user';
import { database } from '../../utils/firebase';

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
  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method){
    case 'GET':{
      let userInGroup = await fetchUsersInGroup('-MS3W5LMXAwk9nqRl0Dc');
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(userInGroup))
      break;
    }
  }
  
}
