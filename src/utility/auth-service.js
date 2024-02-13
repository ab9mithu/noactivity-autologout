// authService.js
import { auth } from './firebase-config'; // Import auth from firebaseConfig
import { createUserWithEmailAndPassword,signInWithPopup, signOut, GoogleAuthProvider,signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";

export const signInUserWithEmailAndPassword = async(email, password) => {
  return await signInWithEmailAndPassword(auth,email, password);
};

export const signInWithGoogle = async() => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  }); 
  return await signInWithPopup(auth,provider);
};

export const  signingOut = async () => {
    console.log("i am executing")
  return await signOut(auth);
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const onAuthStateChangedListner = (
    callback //listner use subscribe and unsubscribe function
  ) => {
    const resp = onAuthStateChanged(auth, callback); // onAuthStateChanged returns the user to callback as an argument.
    console.log(resp)
  };