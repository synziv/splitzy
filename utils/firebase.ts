import firebase from 'firebase/app'
//const firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
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
if(!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const database = firebase.database(); 