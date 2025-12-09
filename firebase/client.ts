// // Import the functions you need from the SDKs you need
// import { initializeApp,getApp,getApps } from "firebase/app";
// import {getAuth} from "firebase/auth";
// import {getFirestore} from "firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAtAdggWlqshHF2s-I8qOcv3F4dDmeW2c4",
//   authDomain: "prepwise-7f0d9.firebaseapp.com",
//   projectId: "prepwise-7f0d9",
//   storageBucket: "prepwise-7f0d9.firebasestorage.app",
//   messagingSenderId: "6015272842",
//   appId: "1:6015272842:web:dd3614391fbf81576e6a73",
//   measurementId: "G-7N6T75CWQ4"
// };

// // Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// export const auth = getAuth(app);
// export const db = getFirestore(app);






// Import the functions you need from the SDKs you need

import { initializeApp, getApps,getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbz1q2Yl7Y5ESEL8L_s6_iDEJNlZtLQqQ",
  authDomain: "interview-prep-8234a.firebaseapp.com",
  projectId: "interview-prep-8234a",
  storageBucket: "interview-prep-8234a.firebasestorage.app",
  messagingSenderId: "265131581916",
  appId: "1:265131581916:web:748aaf4efd970e2107af19",
  measurementId: "G-G7C6E6W73L"
};

// Initialize Firebase
const app =!getApps.length? initializeApp(firebaseConfig):getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);