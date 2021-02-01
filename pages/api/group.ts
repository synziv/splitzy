import { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../objectTypes/user';
import { database } from '../../utils/firebase';

//make logic to only calculate if the item list has a different length

const resetOwingArr =(userInGroup: IUser[])=>{
  userInGroup.forEach(user=>{
    user.owingArr.forEach(x=> x.owing =0);
  });
}
const fetchUserGroups = async (userId: string)=>{
  let usersInGroup =[];
  //await database.ref('/users/').orderByChild('groups').equalTo('value').then((snapshot)=>snapshot.val().users);
  const usersIds = await database.ref('/groups/').once('value').then((snapshot)=>snapshot.val().users);
  for (const userId of usersIds){
    await database.ref('/users/'+ userId).once('value').then((snapshot)=>{
      usersInGroup.push({...snapshot.val(), id: userId});
    });
  }
  return usersInGroup;
}
const createGroup= async(data)=>{
    const key = database.ref('/groups').push({
        name: data.name,
        users: [data.user]
    }).key;
    let user =await database.ref('/users/'+data.user).once('value').then((snapshot)=> snapshot.val());
    //console.log(user.groups);
    console.log(user);
    if(user.groups !=null)
      user.groups.push(key);
    else
      user.groups =[key];
    console.log(user);
    await database.ref('/users/'+data.user).update({groups:user.groups});
    //generateOwingArr('-MS3W5LMXAwk9nqRl0Dc');
    return user;
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method){
    case 'GET':{
      let userInGroup = await fetchUserGroups('-MS3W5LMXAwk9nqRl0Dc');
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(userInGroup))
      break;
    }
    case 'POST':{
        const user = await createGroup(req.body);
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(user));
        break;
      }
  }
  
}