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
    console.log(data);
    const key = database.ref('/groups').push({
        name: data.name,
        users: [data.userId]
    }).key;
    let user =await database.ref('/users/'+data.userId).once('value').then((snapshot)=> snapshot.val());
    console.log(user);
    //database.ref('/groups/'+'-MS3W5LMXAwk9nqRl0Dc').update({users:['-MS3VYXs7TTA5oSadrcA','-MS3Vc-PX4CZzmfVi9hO']});
    //generateOwingArr('-MS3W5LMXAwk9nqRl0Dc');
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
        //console.log(req.body)
        //await createGroup(req.query);
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(''))
        break;
      }
  }
  
}