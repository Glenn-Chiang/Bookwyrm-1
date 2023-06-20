import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyA0y6ENe1nexG0Yils3o4DNoxxO5vI68EU",
  authDomain: "bookwyrm-389702.firebaseapp.com",
  projectId: "bookwyrm-389702",
  storageBucket: "bookwyrm-389702.appspot.com",
  messagingSenderId: "733865292265",
  appId: "1:733865292265:web:a5ff9949fd176e45fe1b78",
  measurementId: "G-JT4S9YT0NS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);