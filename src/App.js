import React, { useEffect, useContext, useState } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./utility/login";
import Navigation from "./components/navigation";
import { signingOut } from "./utility/auth-service";
import { Home } from "./components/home";
import { LoginContext } from "./context/login-context";
import { useIdleTimer } from "react-idle-timer/legacy";

// App component
const App = () => {
  const {isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [remaining, setRemaining] = useState(0);

  const onIdle = () => {
    if(isLoggedIn){
    signingOut();
    setIsLoggedIn(false);}
    // Close Modal Prompt
    // Do some idle action like log out your user
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    timeout: 20 * 1000,
    events: [
      "mousemove",
      "keydown",
      "wheel",
      "DOMMouseScroll",
      "mousewheel",
      "mousedown",
      "touchstart",
      "touchmove",
      "MSPointerDown",
      "MSPointerMove",
      "visibilitychange",
      "focus",
    ],
  });

  useEffect(() => {
    if(isLoggedIn){
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
      console.log(remaining)
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }});

  return (
    <div>
      {/* Navigation component */}
      <Navigation />
      {/* Routes */}
      <Routes>
        {/* Route for the Home page */}
        <Route path="/home" element={<Home />} />

        {/* Route for the Google login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
