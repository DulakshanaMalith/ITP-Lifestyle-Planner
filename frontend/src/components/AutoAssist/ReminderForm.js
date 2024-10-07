import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './vehicleform.css';

const ReminderForm = ({ saveReminder, vehicles = [], currentReminder, selectedServiceStation }) => {
  const [vehicleName, setVehicleName] = useState('');
  const [reminderType, setReminderType] = useState('');
  const [date, setDate] = useState('');
  const [appointedTime, setAppointedTime] = useState('');
  const [location, setLocation] = useState(selectedServiceStation?.name || '');
  const [cost, setCost] = useState('');
  const [notes, setNotes] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState({
    date: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (currentReminder) {
      setVehicleName(currentReminder.vehicleName._id);
      setReminderType(currentReminder.reminderType);
      setDate(currentReminder.date.split('T')[0]);
      setAppointedTime(currentReminder.appointedTime);
      setLocation(currentReminder.location);
      setCost(currentReminder.cost);
      setNotes(currentReminder.notes);
      setEmail(currentReminder.email || '');
    }
  }, [currentReminder]);

  // Validation for date to check if it's not in the past
  const validateDate = (inputDate) => {
    const today = new Date();
    const selectedDate = new Date(inputDate);
    
    // Reset the time portion for comparison purposes
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return 'Reminder Date Cannot Be In The Past';
    }
    return '';
  };

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail)) {
      return 'Invalid email address';
    }
    return '';
  };

  const handleDateChange = (e) => {
    const dateError = validateDate(e.target.value);
    setDate(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, date: dateError }));
  };

  const handleEmailChange = (e) => {
    const emailError = validateEmail(e.target.value);
    setEmail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the date before submitting
    const dateError = validateDate(date);
    if (dateError) {
      setErrors((prevErrors) => ({ ...prevErrors, date: dateError }));
      return; // Prevent form submission if date is invalid
    }

    // Save the reminder
    saveReminder({
      vehicleName,
      reminderType,
      date,
      appointedTime,
      location,
      cost,
      notes,
      email,
      _id: currentReminder?._id
    });

    // Optionally, clear the form after submission
    clearForm();
  };

  const clearForm = () => {
    setVehicleName('');
    setReminderType('');
    setDate('');
    setAppointedTime('');
    setLocation('');
    setCost('');
    setNotes('');
    setErrors({ date: '',email:'' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Vehicle Name:
        <select value={vehicleName} onChange={(e) => setVehicleName(e.target.value)} required>
          <option value="">Select a vehicle</option>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle._id}>
                {vehicle.brand} {vehicle.model}
              </option>
            ))
          ) : (
            <option value="">No vehicles available</option>
          )}
        </select>
      </label>
      <label>
        Reminder Type:
        <select value={reminderType} onChange={(e) => setReminderType(e.target.value)} required>
          <option value="">Select a reminder type</option>
          <option value="Service Reminder">Service Reminder</option>
          <option value="License Renewal">License Renewal</option>
        </select>
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          className='input'
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          required
        />
        {errors.date && <p className="error">{errors.date}</p>}
      </label>
      <label>
        Appointed Time:
        <input
          type="time"
          value={appointedTime}
          onChange={(e) => setAppointedTime(e.target.value)}
          required
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button className="main-button1" type="button" onClick={() => navigate('/service-stations')}>
          Select Service Station
        </button>
      </label>
      <label>
        Estimated cost:
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
        />
      </label>
      <button type="submit">Save Reminder</button>
    </form>
  );
};

export default ReminderForm;
