// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMBAnbvI0be6j6TeRJOXRyyBvOEWRkmyc",
    authDomain: "reactpodcastapp.firebaseapp.com",
    projectId: "reactpodcastapp",
    storageBucket: "reactpodcastapp.appspot.com",
    messagingSenderId: "783132831120",
    appId: "1:783132831120:web:8e4eeba23e7f73c32c9715",
    measurementId: "G-SEJVPBR3JQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };