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
firebase.initializeApp(config);

const firebaseapp = firebase.initializeApp(config);

export default firebaseapp.firestore();
