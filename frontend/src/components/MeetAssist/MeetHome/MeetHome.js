import React from 'react';
import { useNavigate } from 'react-router-dom';
import MeetNav from '../../Nav/Nav';
import Footer from '../../Footer/Footer';

import mainImage2 from '../../../MEETIMAGES/MAIN2full.jpg';
import upcomingImage from '../../../MEETIMAGES/upcoming.jpg';
import remindImage from '../../../MEETIMAGES/remind.jpg';
import scheduleImage from '../../../MEETIMAGES/shedule.jpg';
import locationImage from '../../../MEETIMAGES/location.jpg';
import "./MeetHome.css";

function MeetHome() {
    const navigate = useNavigate();
  
    return (
        <div>
            <MeetNav className="meet-nav" />
        <div >
        
        <div className="main-window">
            {/* Left-hand side: text content */}
            <div className="main-content">
                <h1 className="welcome-heading">Welcome to Meet Assist</h1>
                <p className="welcome-description">
                    Never miss a beat with your meetings again! 
                    Join us and take the stress out of managing your schedule.
                    No more pressure, no more mistakes,
                    just seamless meeting management that keeps you on track.
                    With us by your side,
                    life becomes effortlessly simple!
                </p>
                <button className="get-started-button" onClick={() => navigate('/add-meeting')}>
                    Add a meeting
                </button>
            </div>

            {/* Right-hand side: image */}
            <div className="main-image">
                <img src={mainImage2} alt="Main Visual" />
            </div>
        </div>


        <div className="grid-container">
                <div className="grid-item">
                    <img src={upcomingImage} alt="Upcoming Meetings" />
                    <h2 className="section-heading">Upcoming Meetings</h2>
                    <p className="section-description">
                        Stay on top of your schedule with ease! View your upcoming meetings, make changes as needed, or even cancel them effortlessly.
                    </p>
                    <button className="get-start-button" onClick={() => navigate('/upcoming-meetings')}>Get Started</button>
                </div>

                <div className="grid-item">
                    <img src={scheduleImage} alt="Manage Time" />
                    <h2 className="section-heading">Manage Time</h2>
                    <p className="section-description">
                        Organize your meeting days with ease and manage all your tasks effectively.
                    </p>
                    <button className="get-start-button" onClick={() => navigate('/schedule')}>Get Started</button>
                </div>

                <div className="grid-item">
                    <img src={remindImage} alt="Reminders" />
                    <h2 className="section-heading">Reminders</h2>
                    <p className="section-description">
                        Receive timely reminders for your meetings directly to your messages.
                    </p>
                    <button className="get-start-button" onClick={() => navigate('/reminders')}>Get Started</button>
                </div>

                <div className="grid-item">
                    <img src={locationImage} alt="Get Direction" />
                    <h2 className="section-heading">Get Direction</h2>
                    <p className="section-description">
                        Get detailed directions to your meeting location effortlessly.
                    </p>
                    <button className="get-start-button" onClick={() => navigate('/get-direction')}>Get Started</button>
                </div>
            </div>
            
        </div>
        <Footer />
        </div>
    );
}

export default MeetHome;
