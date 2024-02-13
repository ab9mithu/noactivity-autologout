// Login.js
import React, { useState,useContext } from "react";
import { signInUserWithEmailAndPassword } from "./auth-service";
import { signInWithGoogle } from "./auth-service";
import { SignUp } from "./sign-up";
import { db } from "./firebase-config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { LoginContext } from "../context/login-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isLoggedIn,setIsLoggedIn}= useContext(LoginContext);




  const settingLog=()=>{
    setIsLoggedIn(true)
  }


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  // example where we can see database is overwritten
  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInUserWithEmailAndPassword(email, password);
      alert("Logged in with user id and password");
      const createdAt = new Date();
      const docRef = await setDoc(doc(db, "userData", userCredential.user.uid), {
        name: userCredential.user.email,
        createdAt: createdAt,
      });
      console.log(docRef);
      setEmail("");
      setPassword("");
      settingLog();
    } catch (error) {
      console.log(`{${error.code}: ${error.message}`);
      setEmail("");
      setPassword("");
    }
  };
  
// example where the data is written for every activity
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((userCredential) => {
        alert("logged in with google");

        const createdAt = new Date();
        console.log({ userCredential });
        const docRef = addDoc(collection(db, "userData"), {
          name: userCredential.user.email,
          createdAt: createdAt,
          
        });
        console.log(docRef)
        setEmail("");
        setPassword("");
        settingLog();
      })
      .catch((error) => {
        console.log(`{${error.code}: ${error.message}`);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div>
    {!isLoggedIn && (
      <div>
        <SignUp />
        <br />
        <br />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <button onClick={handleEmailLogin}>Login with Email</button>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    )}
  </div>

  );
};

export default Login;
