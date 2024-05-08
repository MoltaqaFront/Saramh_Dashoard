//firebase.js
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/firebase-messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCZE6z6RamPDm-X77_teGdK5_YVt2Y5x_Q",
  authDomain: "saramh-ed00f.firebaseapp.com",
  projectId: "saramh-ed00f",
  storageBucket: "saramh-ed00f.appspot.com",
  messagingSenderId: "633678844927",
  appId: "1:633678844927:web:7e56e9d32daf3c350a0dca",
  measurementId: "G-YM05RMWG2B",
};

firebase.initializeApp(firebaseConfig);

export default firebase.messaging();
