// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOF5ClFD7GAipbz0kwUZPFMihfxHq1f3M",
  authDomain: "idealtraders-87f3d.firebaseapp.com",
  projectId: "idealtraders-87f3d",
  storageBucket: "idealtraders-87f3d.firebasestorage.app",
  messagingSenderId: "785275251969",
  appId: "1:785275251969:web:dd22f1f053a6fd0a857f00",
  measurementId: "G-E41S5XK96S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);