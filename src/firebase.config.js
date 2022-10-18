// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQwoXf7AeYrMDtI77eqVSwWZlDewzd0XY",
  authDomain: "house-marketplace-app-38291.firebaseapp.com",
  projectId: "house-marketplace-app-38291",
  storageBucket: "house-marketplace-app-38291.appspot.com",
  messagingSenderId: "917091453785",
  appId: "1:917091453785:web:73d3a028b1670a991a9a48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
