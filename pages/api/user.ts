import { NextApiRequest, NextApiResponse } from 'next';
import { IItem } from '../../objectTypes/item';
import { dbItems } from './item';
import { IUser } from '../../objectTypes/user';

export const dbUsers: IUser[] = [
  {
    id: 0,
    name: 'Alexis',
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
const splitTotal = (item: IItem, userInGroup: IUser[])=>{
  const groupCount = item.splitMode=='all' ? userInGroup.length : item.splitWith.length;
  //split evenly between memebers of the group
  if(item.splitMode == 'all'){
    item.splitWith.forEach(userId=>{
          //search in the db the user associated with the userId iterated from the group
          //if the user in question is not the buyer of the item
          //then find in his owingArr the user who bought the item and add a debt associated with him
          if(userId!=item.user){
              userInGroup.find(user=>user.id == userId).
              owingArr.find(x=> x.user==item.user).
                  owing+=item.total/groupCount;
          }
              
      })
  }
  //split with a fraction between two member of the group
  else{
      if(typeof(item.splitMode) == "number"){
        userInGroup.find(user=>user.id == item.splitWith[0]).
              owingArr.find(x=> x.user==item.user).
                  owing+=(item.total * item.splitMode)/groupCount;
      }
      //split evenly between specified members fo the group
      else if(item.splitMode == 'even'){
        item.splitWith.forEach(userId=>{
              //search in the db the user associated with the userId iterated from the group
              //if the user in question is not the buyer of the item
              //then find in his owingArr the user who bought the item and add a debt associated with him
              userInGroup.find(user=>user.id == userId).
                  owingArr.find(x=> x.user==item.user).
                  owing+=item.total/(groupCount+1);
                  
          });
      }
  }
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let userInGroup = dbUsers.filter(group=>group.groups.includes(1));
  //changer groupid
  const itemsInGroup = dbItems.filter(item=>item.groupId==1);
  itemsInGroup.forEach(item=>{
    splitTotal(item, userInGroup);
  });
  res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(userInGroup))
}
