// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdhuwoB1Xi9xJYMBaMjf5j1y2DMz458q8",
  authDomain: "dentist-clinic-5edab.firebaseapp.com",
  projectId: "dentist-clinic-5edab",
  storageBucket: "dentist-clinic-5edab.firebasestorage.app",
  messagingSenderId: "457715072684",
  appId: "1:457715072684:web:fb51db5bae37254bd4a909",
  measurementId: "G-QRHK40SKZN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();