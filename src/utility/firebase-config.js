// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import 'firebase/auth';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzPwBO5jF14Qg4uU2qqw56RS7-5TK0jfU",
  authDomain: "use-login-543a8.firebaseapp.com",
  projectId: "use-login-543a8",
  storageBucket: "use-login-543a8.appspot.com",
  messagingSenderId: "206626245896",
  appId: "1:206626245896:web:c354f173575ad4ba21b0bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export default app;

