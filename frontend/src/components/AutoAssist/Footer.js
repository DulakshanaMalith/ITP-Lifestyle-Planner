import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Services</h4>
        <ul>
          <li>Auto Assist</li>
          <li>Meet Assist</li>
          <li>Shop Mart</li>
          <li>Event Minder</li>
          <li>Health Mate</li>
          <li>Finance Guard</li>
          <li>Pay Track</li>
          <li>Event Planner</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Contact Us</h4>
        <ul>
          <li>0716718281</li>
          <li>
            Email: <a href="mailto:lifest@conts.lk">lifest@conts.lk</a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Life Style Planner</h4>
        <ul>
          <li>About Us</li>
          <li>FAQ</li>
          <li>Privacy Policy</li>
          <li>Terms and Conditions</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;