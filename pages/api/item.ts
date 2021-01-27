import { NextApiRequest, NextApiResponse } from "next"
import { IItem, Item } from "./entity/item";
import { dbUsers } from "./user";

export let dbItems: IItem[] = [
    /*{
      id: 0,
      name: 'Banane',
      total: 10,
      user: 0,
      splitMode: 'all',
      splitWith: [1,2],
      groupId: 1
    },
    {
        id: 1,
        name: 'Pomme',
        total: 20,
        user: 1,
        splitMode: 'all',
        splitWith: [0,2],
        groupId: 1
      },*/
  ]
      
      

  const addItem=(data)=>{
    let lastItemId = {...dbItems[dbItems.length-1]}.id;
    const nextId = dbItems.length>0 ? lastItemId++ : 0;
    const newItem = new Item({...data}, nextId);
    dbItems.push(newItem);
    splitTotal(newItem, 'add');
  }
  const splitTotal = (item: IItem, mode: string)=>{
    const userInGroup = dbUsers.filter(user=> user.groups.includes(item.groupId));
    const groupCount = item.splitMode=='all' ? userInGroup.length : item.splitWith.length;
    //split evenly between memebers of the group
    switch (item.splitMode) {
      case 'all': {
        item.splitWith.forEach(userId => {
          //search in the db the user associated with the userId iterated from the group
          //if the user in question is not the buyer of the item
          //then find in his owingArr the user who bought the item and add a debt associated with him
          if (userId != item.user) {
            let owingArr = userInGroup.find(user => user.id == userId).
              owingArr.find(x => x.user == item.user);
            if (mode == 'add')
              owingArr.owing += item.total / groupCount;
            else
              owingArr.owing -= item.total / groupCount;
          }
        })
        break;
      }
      case 'even': {
        item.splitWith.forEach(userId => {
          //search in the db the user associated with the userId iterated from the group
          //if the user in question is not the buyer of the item
          //then find in his owingArr the user who bought the item and add a debt associated with him
          userInGroup.find(user => user.id == userId).
            owingArr.find(x => x.user == item.user).
            owing += item.total / (groupCount + 1);

        });
        break;
      }
      default:{
        const owingArr = userInGroup.find(user=>user.id == item.splitWith[0]).
              owingArr.find(x=> x.user==item.user);
        if(mode =='add')
              owingArr.owing+=(item.total * Number(item.splitMode))/groupCount;
        else
          owingArr.owing-=(item.total * Number(item.splitMode))/groupCount;
        break;
      }
    }
  }
  const deleteItem=(id:number)=>{
    const index = dbItems.findIndex(item=> item.id == id);
    const deletedItem = dbItems.find(item=> item.id == id);
    dbItems.splice(index, 1);
    splitTotal(deletedItem, 'delete');
  }
  export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch(req.method){
      case 'POST':{
        addItem(req.body);
        res.statusCode = 200;
        res.end();
        break;
      }
      case 'GET':{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(dbItems));
        break;
      }
      case 'DELETE':{
        deleteItem(req.body); 
        res.statusCode = 200;
        res.end();
        break;
      }   
    }

  }