"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchItems = exports.deleteItem = exports.addItem = exports.dbItems = void 0;
const item_1 = require("../entity/item");
const firebase_1 = require("../utils/firebase");
const lodash_1 = require("lodash");
exports.dbItems = [
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
];
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
const addItem = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = new item_1.Item(data);
    firebase_1.database.ref('/items').push(newItem);
    yield splitTotal(newItem, 'add');
    // database.ref('/groups/'+'-MS3W5LMXAwk9nqRl0Dc').update({users:['-MS3VYXs7TTA5oSadrcA','-MS3Vc-PX4CZzmfVi9hO']});
    // generateOwingArr('-MS3W5LMXAwk9nqRl0Dc');
});
exports.addItem = addItem;
const splitTotal = (item, mode) => __awaiter(void 0, void 0, void 0, function* () {
    const usersInGroup = yield firebase_1.database.ref('/groups/' + item.groupId).once('value').then((snapshot) => snapshot.val().users);
    const groupCount = item.splitMode == 'all' ? usersInGroup.length : item.splitWith.length;
    // split evenly between memebers of the group
    switch (item.splitMode) {
        case 'all': {
            // search in the db the user associated with the userId iterated from the group
            // if the user in question is not the buyer of the item
            // then find in his owingArr the user who bought the item and add a debt associated with him
            for (const userId of item.splitWith) {
                if (userId != item.user) {
                    const tempUser = yield firebase_1.database.ref('/users/' + userId).once('value').then((snapshot) => snapshot.val());
                    const tempOwing = tempUser.owingArr.find((x) => x.user == item.user);
                    if (mode == 'add')
                        tempOwing.owing += item.total / groupCount;
                    else
                        tempOwing.owing -= item.total / groupCount;
                    yield firebase_1.database.ref('/users/' + userId).update({ owingArr: tempUser.owingArr });
                }
            }
            break;
        }
        case 'even': {
            for (const userId of item.splitWith) {
                // search in the db the user associated with the userId iterated from the group
                // if the user in question is not the buyer of the item
                // then find in his owingArr the user who bought the item and add a debt associated with him
                const owingArr = usersInGroup.find((user) => user.id == userId).
                    owingArr.find((x) => x.user == item.user);
                owingArr.owing += item.total / (groupCount + 1);
                yield firebase_1.database.ref('/users/' + userId).update({ owingArr });
            }
            ;
            break;
        }
        default: {
            for (const userId of item.splitWith) {
                if (userId != item.user) {
                    const tempUser = yield firebase_1.database.ref('/users/' + userId).once('value').then((snapshot) => snapshot.val());
                    const tempOwing = tempUser.owingArr.find((x) => x.user == item.user);
                    if (mode == 'add')
                        tempOwing.owing += (item.total * Number(item.splitMode)) / groupCount;
                    else
                        tempOwing.owing -= (item.total * Number(item.splitMode)) / groupCount;
                    yield firebase_1.database.ref('/users/' + userId).update({ owingArr: tempUser.owingArr });
                }
            }
            break;
        }
    }
});
const deleteItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedItem = yield firebase_1.database.ref('/items/' + id).once('value').then((snapshot) => snapshot.val());
    splitTotal(deletedItem, 'delete');
    yield firebase_1.database.ref('/items/' + id).set(null);
});
exports.deleteItem = deleteItem;
const fetchItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let items = [];
    yield firebase_1.database.ref('/items/').orderByChild('groupId').equalTo(req.body.groupId).on('value', (snapshot) => {
        if (snapshot.val()) {
            const keys = lodash_1.toArray(Object.keys(snapshot.val()));
            items = [...lodash_1.toArray(snapshot.val())];
            items = items.map((item, index) => {
                return Object.assign(Object.assign({}, item), { id: keys[index] });
            });
        }
    });
    res.send(items);
});
exports.fetchItems = fetchItems;
//# sourceMappingURL=item.js.map