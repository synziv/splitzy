import express from 'express';
import { IUser } from '../entity/user';
import { database } from '../utils/firebase';

// make logic to only calculate if the item list has a different length

/*const resetOwingArr =(userInGroup: IUser[])=>{
  userInGroup.forEach(user=>{
    user.owingArr.forEach(x=> x.owing =0);
  });
}*/
export const fetchUserGroups = async (req: express.Request, res: express.Response)=>{
  console.log("fetch users in group");
  console.log(req.query);
  try{
    const usersInGroup :any[] =[];
    // await database.ref('/users/').orderByChild('groups').equalTo('value').then((snapshot)=>snapshot.val().users);
    const usersIdList = await database.ref('/groups/'+ req.query.groupId).once('value').then((snapshot)=>snapshot.val().users);
    console.log(usersIdList);
    for (const userIdDb of usersIdList){
      await database.ref('/users/'+ userIdDb).once('value').then((snapshot)=>{
        usersInGroup.push({...snapshot.val(), id: userIdDb});
      });
    }
    console.log(usersInGroup);
    res.send(usersInGroup);
  }
  catch(error){
    res.status(500);
    res.end();
  }
  
}
export const createGroup= async(data:any)=>{
    const key = database.ref('/groups').push({
        name: data.name,
        users: [data.user]
    }).key;
    const user =await database.ref('/users/'+data.user).once('value').then((snapshot)=> snapshot.val());
    // console.log(user.groups);
    if(user.groups !=null)
      user.groups.push(key);
    else
      user.groups =[key];
    await database.ref('/users/'+data.user).update({groups:user.groups});
    // generateOwingArr('-MS3W5LMXAwk9nqRl0Dc');
    return user;
  }