import * as firebaseAdmin from 'firebase-admin';
import firebaseAdminInstance from "firebase-admin";

/* tslint:disable-next-line:no-var-requires */
const serviceAccount = require("../splitzy-4baa3-firebase-adminsdk-izqht-eaf0843347.json");
if(!firebaseAdmin.apps.length)
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
  databaseURL: "https://splitzy-4baa3-default-rtdb.firebaseio.com"
});
export const firebaseAdminInstanceApp = firebaseAdmin;