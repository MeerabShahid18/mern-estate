// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-12c89.firebaseapp.com",
  projectId: "mern-estate-12c89",
  storageBucket: "mern-estate-12c89.firebasestorage.app",
  messagingSenderId: "421974963234",
  appId: "1:421974963234:web:47027c7da7be4e8ba5467b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);