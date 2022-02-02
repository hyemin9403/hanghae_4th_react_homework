// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKtyZApTUdAiiFc4IlLF8biqiG-uW3zig",
  authDomain: "sparta-react-basic-11768.firebaseapp.com",
  projectId: "sparta-react-basic-11768",
  storageBucket: "sparta-react-basic-11768.appspot.com",
  messagingSenderId: "997752569352",
  appId: "1:997752569352:web:4a0b189af6ae57b14a5bbd",
};

initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();
