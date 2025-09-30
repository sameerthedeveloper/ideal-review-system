// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf8WefM94ekVZ90ITXPvVuilKwcZ2K_Uo",
  authDomain: "idealtraderreviewsystem.firebaseapp.com",
  projectId: "idealtraderreviewsystem",
  storageBucket: "idealtraderreviewsystem.firebasestorage.app",
  messagingSenderId: "918961046593",
  appId: "1:918961046593:web:b8b6c6061ec00b686272c0",
  measurementId: "G-BJ2YV70LCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);