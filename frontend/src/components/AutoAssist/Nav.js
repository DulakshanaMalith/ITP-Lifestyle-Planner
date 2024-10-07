import React from "react";
import "./Nav.css";
// import Logo from "../../assets/logo.jpeg";
// import Profile from "../../assets/Profile.jpeg";
// import Logo from "./assets/logo.jpg";
import Profile from '../assests/profile.png'; // Example profile image path
// import Logo from './assets/logo.png';
import Logo from '../assests/logo.png' // Example logo path

function Nav() {
  return (
    <header className="nav">
      <div className="logo">
        <div className="row">
          <div className="col-4">
          <img src={Logo} alt="logo"/>
          </div>
          <div className="col-5 p-3">
          <h2 >Life Style Planner</h2>
          </div>
        </div>
       
        
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Reminders</a>
          </li>
          <li>
            <a href="#">Payments</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        <div className="profileName">Welcome! Abhilash</div>
        <img
          src={Profile}
          alt="Profile"
          className="profile-pic"
        />
      </div>
    </header>
  );
}

export default Nav;