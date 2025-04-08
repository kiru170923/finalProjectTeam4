// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // Import Firestore SDK
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvoNSby6ebXpuru5KqNP9yyVfeA20PZOM",
  authDomain: "finalprojectfe01.firebaseapp.com",
  projectId: "finalprojectfe01",
  storageBucket: "finalprojectfe01.firebasestorage.app",
  messagingSenderId: "1032856902879",
  appId: "1:1032856902879:web:e949af532dc406c9f85d6a",
  measurementId: "G-SB2YY3T4YC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Exports db as a named export
export { db, app, auth, storage};
