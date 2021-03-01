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
const firebase_1 = require("../utils/firebase");
const firebaseAdmin_1 = require("../utils/firebaseAdmin");
const lodash_1 = require("lodash");
// make logic to only calculate if the item list has a different length
/*const resetOwingArr =(userInGroup: IUser[])=>{
  userInGroup.forEach(user=>{
    user.owingArr.forEach(x=> x.owing =0);
  });
}*/
const fetchUsersInGroup = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    const usersInGroup = [];
    // await database.ref('/users/').orderByChild('groups').equalTo('value').then((snapshot)=>snapshot.val().users);
    const usersIds = yield firebase_1.database.ref('/groups/' + groupId).once('value').then((snapshot) => snapshot.val().users);
    for (const userId of usersIds) {
        yield firebase_1.database.ref('/users/' + userId).once('value').then((snapshot) => {
            usersInGroup.push(Object.assign(Object.assign({}, snapshot.val()), { id: userId }));
        });
    }
    return usersInGroup;
});
const getConnectedUser = (tokenId) => __awaiter(void 0, void 0, void 0, function* () {
    let connectedUser;
    yield firebaseAdmin_1.firebaseAdminInstanceApp.auth()
        .verifyIdToken(tokenId)
        .then((decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
        // fetch user
        const currentUser = firebase_1.firebaseInstance.auth().currentUser;
        if (currentUser) {
            connectedUser = yield firebase_1.database.ref('/users').orderByChild('email').
                equalTo(currentUser.email).once('value').then((snapshot) => __awaiter(void 0, void 0, void 0, function* () {
                const user = snapshot.val();
                user.groups = yield Promise.all(user.groups.map((group) => __awaiter(void 0, void 0, void 0, function* () { return yield firebase_1.database.ref('/groups/' + group).once('value').then((snapshot1) => snapshot1.val()); })));
                return user;
            }));
            const key = Object.keys(connectedUser);
            connectedUser = Object.assign(Object.assign({}, lodash_1.toArray(connectedUser)[0]), { id: key[0] });
        }
        else {
            // user is signed out, show sign-in form
        }
    }))
        .catch((error) => {
        console.log(error.message);
        throw new Error('Error for fetching user');
    });
    return connectedUser;
});
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (req.method) {
            case 'GET': {
                if (req.query.method == 'getConnectedUser') {
                    try {
                        const connectedUser = yield getConnectedUser(req.query.tokenId);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(connectedUser));
                    }
                    catch (_a) {
                        res.statusCode = 403;
                        res.end();
                    }
                }
                else {
                    const userInGroup = yield fetchUsersInGroup('-MS3W5LMXAwk9nqRl0Dc');
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(userInGroup));
                }
                break;
            }
        }
    });
}
exports.default = handler;
//# sourceMappingURL=user.js.map