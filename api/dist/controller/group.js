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
exports.createGroup = exports.fetchUserGroups = void 0;
const firebase_1 = require("../utils/firebase");
// make logic to only calculate if the item list has a different length
/*const resetOwingArr =(userInGroup: IUser[])=>{
  userInGroup.forEach(user=>{
    user.owingArr.forEach(x=> x.owing =0);
  });
}*/
const fetchUserGroups = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const usersInGroup = [];
    // await database.ref('/users/').orderByChild('groups').equalTo('value').then((snapshot)=>snapshot.val().users);
    const usersIdList = yield firebase_1.database.ref('/groups/').once('value').then((snapshot) => snapshot.val().users);
    for (const userIdDb of usersIdList) {
        yield firebase_1.database.ref('/users/' + userIdDb).once('value').then((snapshot) => {
            usersInGroup.push(Object.assign(Object.assign({}, snapshot.val()), { id: userIdDb }));
        });
    }
    return usersInGroup;
});
exports.fetchUserGroups = fetchUserGroups;
const createGroup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const key = firebase_1.database.ref('/groups').push({
        name: data.name,
        users: [data.user]
    }).key;
    const user = yield firebase_1.database.ref('/users/' + data.user).once('value').then((snapshot) => snapshot.val());
    // console.log(user.groups);
    console.log(user);
    if (user.groups != null)
        user.groups.push(key);
    else
        user.groups = [key];
    console.log(user);
    yield firebase_1.database.ref('/users/' + data.user).update({ groups: user.groups });
    // generateOwingArr('-MS3W5LMXAwk9nqRl0Dc');
    return user;
});
exports.createGroup = createGroup;
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (req.method) {
            case 'GET': {
                const userInGroup = yield exports.fetchUserGroups('-MS3W5LMXAwk9nqRl0Dc');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(userInGroup));
                break;
            }
            case 'POST': {
                const user = yield exports.createGroup(req.body);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(user));
                break;
            }
        }
    });
}
exports.default = handler;
//# sourceMappingURL=group.js.map