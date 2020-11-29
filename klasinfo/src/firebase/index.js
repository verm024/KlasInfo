import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENTID
};

firebase.initializeApp(config);

let db = firebase.firestore();
let auth = firebase.auth();
let storage = firebase.storage();
let timestamp = firebase.firestore.Timestamp.now();

export default {
  db,
  auth,
  storage,
  timestamp
};
