import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MeetNav from '../../Nav/Nav';
import Footer from '../../Footer/Footer';



const URL = 'http://localhost:5000/meet';

const AddNewMeeting = () => {
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    participants: '',
    notes: ''
  });

  const [errors, setErrors] = useState({
    date: '',
    startTime: '',
    endTime: ''
  });

  const isFutureDate = (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  const isValidTimeRange = (startTime, endTime) => {
    if (!startTime || !endTime) return true;
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const start = new Date();
    start.setHours(startHour, startMinute);
    const end = new Date();
    end.setHours(endHour, endMinute);
    return start < end;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeeting((prevMeeting) => {
      const newMeeting = { ...prevMeeting, [name]: value };
      let newErrors = { ...errors };

      if (name === 'date') {
        if (!isFutureDate(value)) {
          newErrors.date = 'Please select a future date.';
        } else {
          newErrors.date = '';
        }
      } else if (name === 'startTime' || name === 'endTime') {
        if (newMeeting.startTime && newMeeting.endTime) {
          if (!isValidTimeRange(newMeeting.startTime, newMeeting.endTime)) {
            newErrors.startTime = 'Start time must be before end time.';
            newErrors.endTime = 'End time must be after start time.';
          } else {
          newErrors.startTime = '';
          newErrors.endTime = '';
        }
      } else if (name === 'endTime') {
        if (newMeeting.startTime && !isValidTimeRange(newMeeting.startTime, value)) {
          newErrors.startTime = 'Start time must be before end time.';
          newErrors.endTime = 'End time must be after start time.';
        } else {
          newErrors.endTime = '';
          newErrors.endTime = '';
        }
      }
      }

      setErrors(newErrors);
      return newMeeting;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFutureDate(meeting.date)) {
      setErrors({ ...errors, date: 'Please select a future date.' });
      return;
    }
    if (!isValidTimeRange(meeting.startTime, meeting.endTime)) {
      setErrors({ ...errors, startTime: 'Start time must be before end time.', endTime: 'End time must be after start time.' });
      return;
    }

    const formattedDate = new Date(meeting.date).toISOString().split('T')[0];
    const formattedStartTime = `${formattedDate}T${meeting.startTime}`;
    const formattedEndTime = `${formattedDate}T${meeting.endTime}`;

    const participantsArray = meeting.participants.split(',').map(participant => participant.trim());

    const newMeeting = {
      ...meeting,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      participants: participantsArray
    };
    
    try {
      await axios.post(URL, newMeeting);
      // Reset form and error state on success
      setMeeting({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        participants: '',
        notes: ''
      });
      setErrors({});
      navigate('/upcoming-meetings'); // Redirect to upcoming meetings page
    } catch (err) {
      console.error(err);
      // Handle server-side validation errors if necessary
    }
  };

  return (
    <div>
      <MeetNav />
      
      <div className="add-meeting-container">
      <div className="form-section form-header">
          <h1 className="meeting-title">Add New Meeting</h1>
        </div>
        <div className="form-section form-body">
        <form onSubmit={handleSubmit} className="meeting-form">
       
          <label className="meeting-label">
            Name:
            <input type="text" name="name" value={meeting.name} onChange={handleChange} className="meeting-input" />
          </label>
          
          
          <label className="meeting-label">
            Date:
            <input type="date" name="date" value={meeting.date} onChange={handleChange} className={`meeting-input ${errors.date ? 'input-error' : ''}`} min={new Date().toISOString().split('T')[0]} />
            {errors.date && <p className="meeting-error">{errors.date}</p>}
          </label>
          
          <label className="meeting-label">
            Start Time:
            <input type="time" name="startTime" value={meeting.startTime} onChange={handleChange} className={`meeting-input ${errors.startTime ? 'input-error' : ''}`} />
            {errors.startTime && <p className="meeting-error">{errors.startTime}</p>}
          </label>
          <label className="meeting-label">
            End Time:
            <input type="time" name="endTime" value={meeting.endTime} onChange={handleChange} className={`meeting-input ${errors.endTime ? 'input-error' : ''}`} min={meeting.startTime || '00:00'} />
            {errors.endTime && <p className="meeting-error">{errors.endTime}</p>}
          </label>
          <label className="meeting-label">
            Location:
            <input type="text" name="location" value={meeting.location} onChange={handleChange} className="meeting-input" />
          </label>
          <label className="meeting-label">
            Participants (comma separated):
            <input type="text" name="participants" value={meeting.participants} onChange={handleChange} className="meeting-input" />
          </label>
          <label className="meeting-label">
            Notes:
            <textarea name="notes" value={meeting.notes} onChange={handleChange} className="meeting-textarea"></textarea>
          </label>
          <button type="submit" className="meeting-submit-button">Add Meeting</button>
        </form>
        </div>
       
      </div>
      <Footer />
      <style>{`

       html, body { 
  height: 100%;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.add-meeting-container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid rgb(11, 77, 27); /* Match the green border from Change.css */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  background-image: url('/src/MEETIMAGES/MAIN1.jpg'); /* Ensure background image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.form-section {
  width: 100%;
  max-width: 500px; /* Match form width from Change.css */
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 20px;
}

.meeting-title {
  font-size: 30px; /* Match title font size */
  font-weight: bold;
  color: rgb(11, 77, 27); /* Use same color */
  margin: 0;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Consistent gap */
  flex: 1;
}

.meeting-form {
  display: flex;
  flex-direction: column;
}

.meeting-label {
  font-weight: bold; /* Bold labels for consistency */
  margin-bottom: 10px;
}

.meeting-input,
.meeting-textarea,
.meeting-date,
.meeting-time {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.meeting-input:focus,
.meeting-textarea:focus,
.meeting-date:focus,
.meeting-time:focus {
  outline: none;
  border-color: rgb(11, 77, 27); /* Match the focus color */
}

.meeting-textarea {
  height: 100px;
  resize: vertical;
}

.meeting-error {
  color: red;
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 10px;
}

.meeting-submit-button {
  background-color: rgb(11, 77, 27); /* Match button color */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  width: 100%; /* Full-width button */
}

.meeting-submit-button:hover {
  background-color: rgb(11, 77, 27); /* Maintain same hover effect */
}

    `}
  
</style>
    </div>
  );
};

export default AddNewMeeting;