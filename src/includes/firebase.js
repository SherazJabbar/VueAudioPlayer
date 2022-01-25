import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  
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
