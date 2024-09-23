import React, { useState } from 'react';
import axios from 'axios';
import './AddSpecialDayForm.css'; // Import your CSS file for styling
import Nav from '../Nav/Nav';
import Footer from '../../Footer/Footer';

const AddSpecialDayForm = () => {
  const [formValues, setFormValues] = useState({
    event: '',
    date: '',
    time: '', // Added time for notifications
    name: '',
    email: '',
    address: '',
    wish: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateField = (name, value) => {
    let error = '';
    const validEvents = ['Birthdays', 'Anniversaries', 'Memorial Dates', 'Other special events'];
    const currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    switch (name) {
      case 'event':
        if (!validEvents.includes(value)) {
          error = 'Please select a valid event.';
        }
        break;
      case 'date':
        if (value < currentDate) {
          error = 'Please select a future date.';
        }
        break;
      case 'time':
        if (!value) {
          error = 'Please select a valid time.';
        }
        break;
      case 'name':
        if (!nameRegex.test(value)) {
          error = 'Name should contain only letters and spaces.';
        }
        break;
      case 'email':
        if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address (e.g., modithad8@gmail.com).';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check
    const isValid = Object.keys(formValues).every((field) => {
      validateField(field, formValues[field]);
      return !errors[field];
    });

    if (isValid) {
      try {
        console.log('Submitting data:', formValues); // Log form data for debugging

        const response = await axios.post('http://localhost:5000/api/reminders', formValues);

        if (response.status === 201) {
          setSuccessMessage('Reminder added successfully!');
          setErrors({});
          setFormValues({
            event: '',
            date: '',
            time: '', // Reset time field after submission
            name: '',
            email: '',
            address: '',
            wish: ''
          });
        } else {
          const errorData = await response.data;
          setErrors({ form: errorData.error || 'Error occurred while adding the reminder. Please try again.' });
        }
      } catch (err) {
        console.error('Error submitting form:', err.response ? err.response.data : err.message); // Log error details
        setErrors({ form: err.response?.data?.error || 'There was an error submitting the form. Please try again later.' });
      }
    }
  };

  return (
    <div>
      <Nav />
    <div className="form-container">
      <h2>Add New Special Day To Remind</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.form && <p className="error-message">{errors.form}</p>}
      <form className="special-day-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="event">Select your Event</label>
          <select
            id="event"
            name="event"
            value={formValues.event}
            onChange={handleChange}
          >
            <option value="">Select event here</option>
            <option value="Birthdays">Birthdays</option>
            <option value="Anniversaries">Anniversaries</option>
            <option value="Memorial Dates">Memorial Dates</option>
            <option value="Other special events">Other special events</option>
          </select>
          {errors.event && <p className="error-message">{errors.event}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
          />
          {errors.date && <p className="error-message">{errors.date}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="time">Reminder Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formValues.time}
            onChange={handleChange}
          />
          {errors.time && <p className="error-message">{errors.time}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter e-mail"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formValues.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="wish">Wish</label>
          <input
            type="text"
            id="wish"
            name="wish"
            value={formValues.wish}
            onChange={handleChange}
            placeholder="Type here"
          />
        </div>
        <button type="submit" className="submit-button">ADD</button>
      </form>
    </div>
    <Footer />
    </div>
  );
};

export default AddSpecialDayForm;
