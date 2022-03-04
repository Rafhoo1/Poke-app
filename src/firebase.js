import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyALmTIIpsX9eXDh-SkrtPQSjmk5FkPJmD8",
    authDomain: "crud-udemy-react-e64fe.firebaseapp.com",
    projectId: "crud-udemy-react-e64fe",
    storageBucket: "crud-udemy-react-e64fe.appspot.com",
    messagingSenderId: "1031044252362",
    appId: "1:1031044252362:web:eab0a2b3ff414f2c03aa33"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export {auth, firebase, db, storage}