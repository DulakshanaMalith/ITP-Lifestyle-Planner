import React, { useState, useEffect } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import MeetNav from '../../Nav/Nav';
import Footer from '../../Footer/Footer';
import './ShowAMeet.css';

const URL = 'http://localhost:5000/meet';





const fetchMeetingDetails = async (id) => {
  return await axios.get(`${URL}/${id}`).then((res) => res.data);
};

const deleteMeeting = async (id) => {
    return await axios.delete(`${URL}/${id}`).then((res) => res.data);
  };

function ShowAMeet() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [meeting, setMeeting] = useState(null);

    //to countdown
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchMeetingDetails(id);
          setMeeting(data.meeting);
          updateCountdown(data.meeting.date);
        } catch (error) {
          console.error('Error fetching meeting details:', error);
          setMeeting(null); // If there's a 404 error, ensure the meeting is set to null
        }
      };
    
      fetchData();
    
      const interval = setInterval(() => {
        if (meeting) {
          updateCountdown(meeting.date);
        }
      }, 1000);
    
      return () => clearInterval(interval); // Clean up interval on component unmount
    }, [id, meeting]);
  
    const updateCountdown = (meetingDate) => {
      const now = new Date();
      const meetingDateObject = new Date(meetingDate);
      
      if (isNaN(meetingDateObject.getTime())) {
        setCountdown({ days: 'Invalid', hours: 'Invalid', minutes: 'Invalid', seconds: 'Invalid' });
        return;
      }
  
      const difference = meetingDateObject - now;
  
      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
  
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
      setCountdown({ days, hours, minutes, seconds });
    };

    const handleDelete = async () => {
      try {
        await deleteMeeting(id); // First, delete the meeting
        navigate('/upcoming-meetings'); // Then navigate to the upcoming meetings page
      } catch (error) {
        console.error('Error deleting the meeting:', error);
      }
    };

  const handleEdit = () => {
    navigate(`/edit-meeting/${id}`); // Redirect to the edit meeting page
  };
  
  const formatDateTime = (dateTimeString) => {
    const dateObject = new Date(dateTimeString);
    const date = dateObject.toLocaleDateString(); // e.g., "9/20/2024"
    const time = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // e.g., "10:30 AM"
    return { date, time };
  };

  
  

    return (
      <div>
      <div className="meeting-container">
         <MeetNav className="meet-nav"></MeetNav>
        {meeting ? (
          <div className="meeting-details">

            <h1 className="meeting-title">{meeting.name}</h1>
            <div className="countdown-container">
            
            <div className="countdown-timer">
              <div className="countdown-item">
                <span className="countdown-label">Days:</span>
                <span className="countdown-value">{countdown.days}</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-label">Hours:</span>
                <span className="countdown-value">{countdown.hours}</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-label">Minutes:</span>
                <span className="countdown-value">{countdown.minutes}</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-label">Seconds</span>
                <span className="countdown-value">{countdown.seconds}</span>
              </div>
            </div>
          </div>
            <p className="meeting-detail"><strong>Date:</strong> {formatDateTime(meeting.date).date}</p>
            <p className="meeting-detail"><strong>startTime:</strong> {meeting.startTime}</p>
            <p className="meeting-detail"><strong>endTime:</strong> {meeting.endTime}</p>
            <p className="meeting-detail"><strong>Location:</strong> {meeting.location}</p>
            <p className="meeting-detail"><strong>Participants:</strong> {meeting.participants.join(', ')}</p>
           
            <p className="meeting-detail"><strong>Notes:</strong> {meeting.notes}</p>
          
          <div className="meeting-buttons">
          <button className="edit-button"  onClick={handleEdit}>Edit</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
          </div>
            
        </div>
            
          
        ) : (
          <p className="loading-text">Loading...</p>
        )}
        
      </div>
      <Footer />
      </div>
      
    )
}

export default ShowAMeet
