// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLvmdgeJmKCYIvhoukiHSSBAK5bSa8gm4",
    authDomain: "fir-suplementarnia.firebaseapp.com",
    projectId: "fir-suplementarnia",
    storageBucket: "fir-suplementarnia.appspot.com",
    messagingSenderId: "1054591364746",
    appId: "1:1054591364746:web:8c5135b34052e36bc54773"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp