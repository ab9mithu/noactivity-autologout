import React, { useState, useContext } from 'react';
import { LoginContext } from '../context/login-context';
import { signInUserWithEmailAndPassword } from './auth-service';
import { db } from './firebase-config';
import { setDoc, doc } from 'firebase/firestore';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useContext(LoginContext);


 

  const handleNewLogin = async () => {
    try {
      const userCredential = await signInUserWithEmailAndPassword(email, password);
      alert('Logged in with email and password');

      const createdAt = new Date();
      setEmail('');
      setPassword('');
      setIsLoggedIn(true);
    

      await setDoc(doc(db, 'userData', userCredential.user.uid), {
        name: userCredential.user.email,
        createdAt: createdAt,
      });

      console.log('Document written with ID:', userCredential.user.uid);
    } catch (error) {
      console.error('Error logging in or writing user data:', error);
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleNewLogin}>Sign Up</button>
    </div>
  );
};
