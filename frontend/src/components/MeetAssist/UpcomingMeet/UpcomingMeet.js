import React, { useState , useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import MeetNav from '../MeetNav/MeetNav';
import Footer from '../../Footer/Footer';
import axios from "axios";
import "./UpcomingMeet.css"


const URL="http://localhost:5000/meet";

const fetchHandler=async()=>{
  return await axios.get(URL).then((res)=>res.data);
}
function UpcomingMeet() {
  const [meetings , setMeetings]=useState([]);
  const navigate = useNavigate();

  // Get today's date without time
  const today = new Date().setHours(0, 0, 0, 0);

  useEffect(() => {
    fetchHandler().then((data) => {
      const filteredMeetings = data.meetings.filter((meeting) => {
        const meetingDate = new Date(meeting.date).setHours(0, 0, 0, 0); // Set the time to 00:00:00 for comparison
        return meetingDate >= today; // Only show today's and upcoming meetings
      });
      setMeetings(filteredMeetings);
    });
  }, [today]);
  
  return (
    <div>
       <MeetNav />
    <div className="upcoming-meetings-container">
    
      <h1 className="main-heading">Your Upcoming Meetings</h1>
      <div className="meetings-list">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="meeting-item">
            <h2 className="meeting-name">{meeting.name}</h2>
            <button className="view-details-button" onClick={() => navigate(`/meeting/${meeting._id}`)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
    <Footer />

    </div>
  )
}

export default UpcomingMeet
