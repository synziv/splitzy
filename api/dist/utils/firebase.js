"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.firebaseInstance = void 0;
const app_1 = __importDefault(require("firebase/app"));
// const firebase = require("firebase/app");
// Add the Firebase products that you want to use
/* tslint:disable-next-line:no-var-requires */
require("firebase/auth");
/* tslint:disable-next-line:no-var-requires */
require("firebase/database");
const firebaseConfig = {
    apiKey: "AIzaSyDqCSteUWGiObMVDK7rB3hgoqHExkU-pCc",
    authDomain: "splitzy-4baa3.firebaseapp.com",
    databaseURL: "https://splitzy-4baa3-default-rtdb.firebaseio.com",
    projectId: "splitzy-4baa3",
    storageBucket: "splitzy-4baa3.appspot.com",
    messagingSenderId: "815338342836",
    appId: "1:815338342836:web:68fd8f927154bb761e0ae1",
    measurementId: "G-X45594301P"
};
if (!app_1.default.apps.length)
    app_1.default.initializeApp(firebaseConfig);
exports.firebaseInstance = app_1.default;
exports.database = app_1.default.database();
//# sourceMappingURL=firebase.js.map