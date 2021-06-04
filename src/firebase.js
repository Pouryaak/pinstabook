import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCIGZab2gNeTRSxUDMMnkS8uBPSWvW88XM",
  authDomain: "pinstabook-99575.firebaseapp.com",
  databaseURL:
    "https://pinstabook-99575-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pinstabook-99575",
  storageBucket: "pinstabook-99575.appspot.com",
  messagingSenderId: "586567303057",
  appId: "1:586567303057:web:0550842d74e001bf612430",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();

export { auth, provider, database };
