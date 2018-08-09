import firebase from "firebase";
import firestore from "firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBBKJn2Sq2bhg_s1F95W8D7tvLQBfhlPB4",
  authDomain: "nuxtgeo.firebaseapp.com",
  databaseURL: "https://nuxtgeo.firebaseio.com",
  projectId: "nuxtgeo",
  storageBucket: "nuxtgeo.appspot.com",
  messagingSenderId: "344944735209"
};
/* firebase.initializeApp(config); */

var firebaseApp = firebase.initializeApp(config);

/* FirebaseApp.firestore().settings({
  timestampsInSnapshots: true
});
 */
const db = firebase.firestore();
export default db;
