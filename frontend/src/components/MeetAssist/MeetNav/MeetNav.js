import React from 'react'
import { NavLink } from 'react-router-dom';
import './MeetNav.css';
import Logo from '../../../MEETIMAGES/Household lifestyle partner-01-01.png';
function MeetNav() {
  return (
    <header className="nav">
      <div className="logo">
        <div className="row">
          <div className="col-4">
          <img src={Logo}
          alt="Logo" />
          </div>
          <div className="col-5 p-3">
          <h2 >Life Style Planner</h2>
          </div>
        </div>
       
        
      </div>
      <nav>
        <ul className="nav-links">
        <li>
        <NavLink exact to="/" activeClassName="active">Home
        </NavLink>
          </li>
        <li>
          <NavLink exact to="/MH" activeClassName="active">MeetHome
          </NavLink>
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
        
      </div>
    </header>
    
  )
}

export default MeetNav
