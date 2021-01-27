import { NextApiRequest, NextApiResponse } from "next"
import { IItem, Item } from "./entity/item";
import { database } from "../../utils/firebase";
import { dbUsers } from "./user";
import {toArray} from 'lodash';

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
      
      
  const generateOwingArr = async (groupId: string)=>{
    //find the group with the id
    const connectedUser = '-MS3VYXs7TTA5oSadrcA';
    const usersInGroup =  await database.ref('/groups/'+ groupId).once('value').then((snapshot)=>snapshot.val().users);
    usersInGroup.forEach(async (userId)=>{
      if(userId != connectedUser){
        let modifiedUser=null;
        //add the iterated user to the connected user owing array
        await database.ref('/users/'+ connectedUser).once('value').then(snapshot=>{
          modifiedUser = snapshot.val();
          if(modifiedUser.owingArr){
            modifiedUser.owingArr.push({
              user: userId,
              owing: 0
            })
          }
          else{
            modifiedUser.owingArr = [{
              user: userId,
              owing: 0
            }]
          }
        });
        database.ref('/users/'+connectedUser).update({owingArr:modifiedUser.owingArr});

        modifiedUser = null;
        //add the connected user to the iterated user owing array
        await database.ref('/users/'+ userId).once('value').then(snapshot=>{
          modifiedUser = snapshot.val();
          if(modifiedUser.owingArr){
            modifiedUser.owingArr.push({
              user: connectedUser,
              owing: 0
            })
          }
          else{
            modifiedUser.owingArr = [{
              user: connectedUser,
              owing: 0
            }]
          }
          
        });
        database.ref('/users/'+userId).update({owingArr:modifiedUser.owingArr});
      }
      
    });
    //populate the owing array
    /*usersGroup.usersIds.forEach(userId =>{
        //adds every user to owingArr of the instance user
        if(userId != this.id ){
            this.owingArr.push({
                user: userId,
                owing: 0
            });
            dbUsers.find(user => user.id == userId).owingArr.push({
                user: this.id,
                owing:0
            });
        }
    });*/
  }
  const addItem=(data)=>{
    const connectedUser='-MS3VYXs7TTA5oSadrcA';
    const newItem = new Item({...data, user: connectedUser});
    database.ref('/items').push(newItem);
    dbItems.push(newItem);
    //splitTotal(newItem, 'add');
    //database.ref('/groups/'+'-MS3W5LMXAwk9nqRl0Dc').update({users:['-MS3VYXs7TTA5oSadrcA','-MS3Vc-PX4CZzmfVi9hO']});
    //generateOwingArr('-MS3W5LMXAwk9nqRl0Dc');
  }
  const splitTotal = (item: IItem, mode: string)=>{
    console.log('splittotal');
    console.log(item);
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
  const fetchItems =async (groupId: string)=>{
    let items =null;
    await database.ref('/items/').orderByChild('groupId').equalTo(groupId).on('value', (snapshot)=>{
      items = [...toArray(snapshot.val())];
    });
    return items
  }
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch(req.method){
      case 'POST':{
        addItem(req.body);
        res.statusCode = 200;
        res.end();
        break;
      }
      case 'GET':{
        const fetchedItems = await fetchItems('-MS3W5LMXAwk9nqRl0Dc');
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(fetchedItems));
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