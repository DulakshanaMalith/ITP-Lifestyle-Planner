import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MeetNav from '../../Nav/Nav';
import Footer from '../../Footer/Footer';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const URL = "http://localhost:5000/meet";
const TimetableURL = "http://localhost:5000/meetShedule/schedules";

const fetchMeetingsHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const fetchTimetablesHandler = async () => {
  return await axios.get(TimetableURL).then((res) => res.data);
};

function MeetSchedule() {
  const [meetings, setMeetings] = useState([]);
  const [timetables, setTimetables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeetingsHandler().then((data) => {
      setMeetings(data.meetings);
    });

    fetchTimetablesHandler().then((data) => {
      setTimetables(data);
    });
  }, []);

  const today = new Date(); 

  const tileClassName = ({ date }) => {
    const meetingDates = meetings
      .filter((meeting) => {
        const meetingDate = new Date(meeting.date);
        meetingDate.setHours(0, 0, 0, 0); 
        return meetingDate >= today;
      })
      .map((meeting) => new Date(meeting.date).setHours(0, 0, 0, 0)); 
  
    const timetableDates = timetables
      .filter((timetable) => {
        const timetableDate = new Date(timetable.date);
        timetableDate.setHours(0, 0, 0, 0); 
        return timetableDate >= today;
      })
      .map((timetable) => new Date(timetable.date).setHours(0, 0, 0, 0));
  
    const currentDate = new Date(date).setHours(0, 0, 0, 0); 
  
    if (meetingDates.includes(currentDate) && timetableDates.includes(currentDate)) {
      return 'highlight-pink';
    } else if (meetingDates.includes(currentDate)) {
      return 'highlight-red';
    } else if (timetableDates.includes(currentDate)) {
      return 'highlight-green';
    }
  
    return '';
  };
  
  const onDayClick = (value) => {
    // Format the selected date as YYYY-MM-DD
    const selectedDate = value.toLocaleDateString('en-CA'); // 'en-CA' gives us the format YYYY-MM-DD
    navigate(`/timetable/${selectedDate}`); // Pass the date as a simple string
  };
  return (
    <div>
      <MeetNav />
      <div>
      <div className="calendar-container">
        <h1>Make Schedule</h1>

        <Calendar
          tileClassName={tileClassName}
          onClickDay={onDayClick}
        />
        <div className="legend-bar">
          <div className="legend-item">
            <span className="legend-color red"></span> Red: Future Meetings
          </div>
          <div className="legend-item">
            <span className="legend-color green"></span> Green: Timetable Exists
          </div>
          <div className="legend-item">
            <span className="legend-color pink"></span> Pink: Both Meeting and Timetable
          </div>
          </div>
          
        </div>
        <Footer />

        <style>{`
          .calendar-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }

          .react-calendar {
            width: 50%;
            max-width: 500px;
          }

          .highlight-red {
            background-color: red !important;
            color: white;
          }

          .highlight-green {
            background-color: green !important;
            color: white;
          }

          .highlight-pink {
            background-color: pink !important;
            color: white;
          }

          .legend-bar {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            gap: 20px;
          }

          .legend-item {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
          }

          .legend-color {
            width: 20px;
            height: 20px;
            display: inline-block;
          }

          .legend-color.red {
            background-color: red;
          }

          .legend-color.green {
            background-color: green;
          }

          .legend-color.pink {
            background-color: pink;
          }
        `}</style>
      </div>
    </div>
  );
}

export default MeetSchedule;