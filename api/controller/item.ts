import { IItem, Item } from "../entity/item";
import { database } from "../utils/firebase";
import {toArray} from 'lodash';
import express from "express";
import { User } from "../entity/user";

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


  /*const generateOwingArr = async (groupId: string)=>{
    // find the group with the id
    const connectedUser = '-MS3VYXs7TTA5oSadrcA';
    const usersInGroup =  await database.ref('/groups/'+ groupId).once('value').then((snapshot)=>snapshot.val().users);
    usersInGroup.forEach(async (userId:string)=>{
      if(userId != connectedUser){
        let modifiedUser;
        // add the iterated user to the connected user owing array
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
        if(modifiedUser)
          database.ref('/users/'+connectedUser).update({owingArr:modifiedUser.owingArr});

      }
    });
    // populate the owing array
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
    });
  }*/
  export const addItem=async (req: express.Request, res: express.Response)=>{
    try{
      const newItem = new Item(req.body);
      console.log(newItem);
      database.ref('/items').push(newItem);
      await splitTotal(newItem, 'add');
      // database.ref('/groups/'+'-MS3W5LMXAwk9nqRl0Dc').update({users:['-MS3VYXs7TTA5oSadrcA','-MS3Vc-PX4CZzmfVi9hO']});
      // generateOwingArr('-MS3W5LMXAwk9nqRl0Dc');
      res.status(200);
      res.send();
    }
    catch(error){
      console.log(error.message)
      res.statusCode=500;
      res.end();
    }

  }
  const splitTotal = async (item: Item, mode: string)=>{
    const usersInGroup =  await database.ref('/groups/'+ item.groupId).once('value').then((snapshot)=>snapshot.val().users);
    const groupCount = item.splitMode=='all' ? usersInGroup.length : item.splitWith.length;
    // split evenly between memebers of the group
    switch (item.splitMode) {
      case 'all': {
        // search in the db the user associated with the userId iterated from the group
          // if the user in question is not the buyer of the item
          // then find in his owingArr the user who bought the item and add a debt associated with him
        for(const userId of item.splitWith){
          if (userId != item.user) {
            const tempUser = await database.ref('/users/'+ userId).once('value').then((snapshot)=>snapshot.val());
            const tempOwing = tempUser.owingArr.find((x:any) => x.user == item.user);
            if (mode == 'add')
              tempOwing.owing += item.total / groupCount;
            else
              tempOwing.owing -= item.total / groupCount;
            await database.ref('/users/'+userId).update({owingArr:tempUser.owingArr});
          }
        }

        break;
      }
      case 'even': {
        for(const userId of item.splitWith){
          // search in the db the user associated with the userId iterated from the group
          // if the user in question is not the buyer of the item
          // then find in his owingArr the user who bought the item and add a debt associated with him
          const owingArr = usersInGroup.find((user: User) => user.id == userId).
            owingArr.find((x:any) => x.user == item.user);
          owingArr.owing += item.total / (groupCount + 1);

          await database.ref('/users/'+userId).update({owingArr});
        };
        break;
      }
      default:{
        for(const userId of item.splitWith) {
          if (userId != item.user) {
            const tempUser = await database.ref('/users/'+ userId).once('value').then((snapshot)=>snapshot.val());
            const tempOwing = tempUser.owingArr.find((x:any) => x.user == item.user);
            if (mode == 'add')
              tempOwing.owing += (item.total * Number(item.splitMode)) / groupCount;
            else
              tempOwing.owing -= (item.total * Number(item.splitMode)) / groupCount;

              await database.ref('/users/'+userId).update({owingArr:tempUser.owingArr});
          }
        }
        break;
      }
    }
  }
  export const deleteItem=async (id:string)=>{
    try{
      const deletedItem = await database.ref('/items/'+id).once('value').then((snapshot)=>snapshot.val());
      splitTotal(deletedItem, 'delete');
      await database.ref('/items/'+id).set(null);
    }
    catch(error){
      console.log(error);
    }

  }

  export const fetchItems =async (req: express.Request, res: express.Response)=>{
    try{
      const groupdId: string = req.query.groupId.toString();
      console.log('fetchItems');
      console.log(groupdId);
      let items:any[] =[];
      await database.ref('/items/').orderByChild('groupId').equalTo(groupdId).once('value', (snapshot) => {
        if (snapshot.val()) {
          const keys = toArray(Object.keys(snapshot.val()));
          items = [...toArray(snapshot.val())];
          items = items.map((item, index) => {
            return {
              ...item,
              id: keys[index]
            };
          });
          res.send(items);
        }
      });
      
    }
    catch(error){
      console.log(error.message);
      res.status(500);
      res.end();
    }

  }
