import React from "react";
import { useNavigate } from "react-router-dom";
import "./bdays.css"; // Ensure this path is correct
import Birthday from "../../../assets/birthday.jpeg";

function Bdays() {
  const navigate = useNavigate();

  const handleAddReminder = () => {
    navigate("/addspecialday"); // Navigate to AddSpecialDayForm page
  };

  const handleViewReminder = () => {
    navigate("/birthday/reminder"); // Navigate to the ViweBday page
  };

  return (
    <div className="birthday-page">
      <div className="header">Birthdays__</div>
      <div className="row">
        <div className="col-6">
          <img src={Birthday} alt="Birthday Illustration" />
        </div>
        <div className="col-6">
          <div className="birthday-options">
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

export default Bdays;
