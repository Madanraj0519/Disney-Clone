// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD903jurqSGkJOSjz6Sw5OWzhrXf9LNXKc",
  authDomain: "disney-plus-clone-7ce1b.firebaseapp.com",
  projectId: "disney-plus-clone-7ce1b",
  storageBucket: "disney-plus-clone-7ce1b.appspot.com",
  messagingSenderId: "48703666601",
  appId: "1:48703666601:web:0433be2de0e50a51c8ecb8",
  measurementId: "G-DSE0EH2ZV8"
};


// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
