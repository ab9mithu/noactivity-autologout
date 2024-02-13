// Navigation.js
import { useContext} from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/login-context';
import { signingOut } from '../utility/auth-service';

const Navigation = () => {
 const {isLoggedIn,setIsLoggedIn} =useContext(LoginContext)


 const settingOut =()=>{
  setIsLoggedIn(false)
 };

const userLogOut = async()=>{
  console.log("navigation before:",isLoggedIn)
  await signingOut();
  settingOut();

 
}
  return (
    <div>
      <ul>
        {/* Always display the "Home" link */}
        <li><Link to='/home'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        {isLoggedIn && (
          // Render additional navigation links only if user is logged in
          <>
            <li>About</li>
            <li>payment</li>
            <li>Contact</li>
            <li><Link  onClick={userLogOut}>Signout</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navigation;
