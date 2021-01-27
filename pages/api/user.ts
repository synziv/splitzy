import { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../objectTypes/user';
import { database } from '../../utils/firebase';

export const dbUsers: IUser[] = [
  {
    id: 0,
    name: 'Alexis',
    email: 'alexis@email.com',
    total: 0,
    color: 'green',
    owingArr: [
      {
        user: 1,
        owing: 0
      },
      {
        user: 2,
        owing: 0
      }
    ],
    groups: [1]
  },
  {
    id: 1,
    name: 'Beatrice',
    email: 'bea@email.com',
    total: 0,
    color: 'purple',
    owingArr: [
      {
        user: 0,
        owing: 0
      },
      {
        user: 2,
        owing: 0
      }
    ],
    groups: [1]
  },
  {
    id: 2,
    name: 'John',
    email: 'john@email.com',
    total: 0,
    color: 'red',
    owingArr: [
      {
        user: 0,
        owing: 0
      },
      {
        user: 1,
        owing: 0
      }
    ],
    groups: [1]
  },
]
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
