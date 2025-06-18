import { initializeApp } from "firebase/app";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
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
