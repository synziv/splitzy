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
exports.facebookAuth = exports.createUser = void 0;
const firebase_1 = require("../utils/firebase");
const firebase_2 = require("../utils/firebase");
const user_1 = require("../entity/user");
const lodash_1 = require("lodash");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_1.User({
        name: user.name,
        email: user.email
    });
    const key = yield firebase_2.database.ref('/users').push(newUser).key;
    return Object.assign(Object.assign({}, newUser), { id: key });
});
exports.createUser = createUser;
const facebookAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Sign in with the credential from the Facebook user.
        let user = null;
        const credentialJson = firebase_1.firebaseInstance.auth.AuthCredential.fromJSON(req.body.credential);
        console.log(credentialJson);
        yield firebase_1.firebaseInstance.auth().signInWithCredential(credentialJson)
            .then((result) => __awaiter(void 0, void 0, void 0, function* () {
            // Signed in
            const appUser = yield firebase_2.database.ref('/users').orderByChild('email').equalTo(result.user.email).once('value').then((snapshot) => snapshot.val());
            console.log(appUser);
            if (appUser == null) {
                user = yield exports.createUser({
                    name: result.user.displayName,
                    email: result.user.email
                });
            }
            else {
                const key = Object.keys(appUser);
                user = Object.assign(Object.assign({}, lodash_1.toArray(appUser)[0]), { id: key[0] });
                user.groups = yield Promise.all(user.groups.map((group) => __awaiter(void 0, void 0, void 0, function* () { return yield firebase_2.database.ref('/groups/' + group).once('value').then((snapshot) => snapshot.val()); })));
                console.log(user);
            }
        }));
        return user;
    }
    catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
        console.log(errorMessage);
    }
});
exports.facebookAuth = facebookAuth;
//# sourceMappingURL=auth.js.map