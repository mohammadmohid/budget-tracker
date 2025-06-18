// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfjtcGrIWCH7F9WFC9LCFnEehQuZWJxOI",
  authDomain: "budget-tracker-e5b3d.firebaseapp.com",
  projectId: "budget-tracker-e5b3d",
  storageBucket: "budget-tracker-e5b3d.firebasestorage.app",
  messagingSenderId: "427608565509",
  appId: "1:427608565509:web:29bb73299a662c0777f96c",
  measurementId: "G-GCNPTCNQ0E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
