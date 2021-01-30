export const admin = require("firebase-admin");

var serviceAccount = require("../splitzy-4baa3-firebase-adminsdk-izqht-eaf0843347.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://splitzy-4baa3-default-rtdb.firebaseio.com"
});