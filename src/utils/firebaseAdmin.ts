import * as firebaseAdmin from 'firebase-admin';
export const firebaseAdminInstance = require("firebase-admin");

var serviceAccount = require("../splitzy-4baa3-firebase-adminsdk-izqht-eaf0843347.json");
if(!firebaseAdmin.apps.length)
firebaseAdmin.initializeApp({
  credential: firebaseAdminInstance.credential.cert(serviceAccount),
  databaseURL: "https://splitzy-4baa3-default-rtdb.firebaseio.com"
});
export const firebaseInstance = firebaseAdmin;