import React from "react";
import { useNavigate } from "react-router-dom";
import "./Otherday.css";
import Other from '../../../assets/other.jpeg'

function Otherday() {
  const navigate = useNavigate();

  const handleAddReminder = () => {
    navigate("/addspecialday"); 
  };

  const handleViewReminder = () => {
    navigate("/otherday/reminder"); 
  };

  return (
    <div className="otherday-page">
      <div className="header">Other Special Days__</div>
      <div className="row">
        <div className="col-6">
          <img src={Other} alt="Other Special Days Illustration" />
        </div>
        <div className="col-6">
          <div className="otherday-options">
            <button className="reminder-button" onClick={handleAddReminder}>
              Add New Reminder
            </button>
            <button className="reminder-button" onClick={handleViewReminder}>
              View Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otherday;
