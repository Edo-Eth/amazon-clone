// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
//auth
import { getAuth } from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import{getFirestore}from "firebase/firestore"
import { initializeApp } from "firebase/app";
// Yourb web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjSH83naT0_01xsHeKCXm1cCbv88yAR4o",
  authDomain: "clone-8ade7.firebaseapp.com",
  projectId: "clone-8ade7",
  storageBucket: "clone-8ade7.appspot.com",
  messagingSenderId: "72766957088",
  appId: "1:72766957088:web:478d16f87c153cd538be45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
// const app = firebase.initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = app.firestore();
