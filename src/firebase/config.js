// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-q0yZpyYDUXMyLD_IFu3PjpZIZhZoyXc",
    authDomain: "e-commerce-sanz-leonel.firebaseapp.com",
    projectId: "e-commerce-sanz-leonel",
    storageBucket: "e-commerce-sanz-leonel.appspot.com",
    messagingSenderId: "17673819136",
    appId: "1:17673819136:web:6c0e6dc425dd94299c74e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);