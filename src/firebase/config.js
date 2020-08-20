import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: " AIzaSyAUS64Z_pUHVahjRyY1KqZCge2BGVfqyTE",
  authDomain: "rn-firebase-todo-d3c6c.firebaseapp.com",
  databaseURL: "https://rn-firebase-todo-d3c6c.firebaseio.com",
  projectId: "rn-firebase-todo-d3c6c",
  storageBucket: "rn-firebase-todo-d3c6c.appspot.com",
  messagingSenderId: "222561225701",
  appId: "1:222561225701:android:e169c6a5add80b23e13d0c",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
