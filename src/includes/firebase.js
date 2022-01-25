import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzKTvI-u51iQTtc0-OivTgbmh_HFwUFHg",
  authDomain: "musicplayer-718a8.firebaseapp.com",
  projectId: "musicplayer-718a8",
  storageBucket: "musicplayer-718a8.appspot.com",
  appId: "1:145336179903:web:1f0fd929ecddcd25bcfa0a",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Creates a local copy of data in user browser
// Caches the data in case the user goes offiline
// User wont be able to login if he/she is logged out in case of offline
// Storage is limited
// Upload files is not supported
db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`);
});

const userCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export {
  auth,
  db,
  userCollection,
  storage,
  songsCollection,
  commentsCollection,
};
