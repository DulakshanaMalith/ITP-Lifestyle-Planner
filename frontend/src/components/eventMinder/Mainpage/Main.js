import React from 'react';
import './Main.css';  
import { useNavigate } from 'react-router-dom';
import landingPageImage from '../../../assets/landingPageImage.png'
import Nav from '../Nav/Nav';
import Footer from '../../Footer/Footer';


function Main() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/secondpage');
  };

  return (
    <div>
      <Nav />
    <div className="main-content">
      <div className="illustration">
        <img src={landingPageImage} alt="Illustration" />
      </div>
      <div className="text-content">
        <h1>EVENT <span className="highlight">MINDER</span></h1>
        <p>Welcome to Event Minder, your go-to tool for remembering and celebrating the special moments in your life. Whether it’s birthdays, anniversaries, or personal milestones, our platform ensures you never miss an important occasion. Easily set reminders, schedule personalized wish messages, and receive timely notifications, all in one convenient place. Plus, with features like gift shop locators and customizable notifications, celebrating your loved ones has never been easier. Stay connected, thoughtful, and prepared, making every special day memorable for you and your loved ones.</p>
        <button className="get-started" onClick={handleGetStartedClick}>Get Started</button>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Main;
