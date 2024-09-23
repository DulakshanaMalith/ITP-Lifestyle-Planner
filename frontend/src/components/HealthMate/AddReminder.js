import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddReminder() {
  const [reminder, setReminder] = useState({
    reminderType: '',
    description: '',
    days: '',
    time: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReminder({ ...reminder, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reminder),
      });

      if (!response.ok) throw new Error('Failed to add reminder');

      setSuccessMessage('Reminder added successfully!');
      setReminder({
        reminderType: '',
        description: '',
        days: '',
        time: ''
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setSuccessMessage('Failed to add reminder. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-blue-200 p-6">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#0A354C]">Add New Reminder</h2>

        {/* Success/Error Message */}
        {successMessage && (
          <div
            className={`text-center mb-6 p-4 rounded-lg ${
              successMessage.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reminder Type Input */}
          <div className="relative">
            <label className="block text-gray-600 mb-2">Reminder Type:</label>
            <input
              type="text"
              name="reminderType"
              value={reminder.reminderType}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0A354C] focus:border-[#0A354C] placeholder-gray-400"
              placeholder="E.g., Medicine, Checkup"
            />
          </div>

          {/* Description Input */}
          <div className="relative">
            <label className="block text-gray-600 mb-2">Description:</label>
            <input
              type="text"
              name="description"
              value={reminder.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0A354C] focus:border-[#0A354C] placeholder-gray-400"
              placeholder="E.g., Take your meds, Attend doctor appointment"
            />
          </div>

          {/* Days Input */}
          <div className="relative">
            <label className="block text-gray-600 mb-2">Day:</label>
            <input
              type="date"
              name="days"
              value={reminder.days}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0A354C] focus:border-[#0A354C]"
            />
          </div>

          {/* Time Input */}
          <div className="relative">
            <label className="block text-gray-600 mb-2">Time:</label>
            <input
              type="time"
              name="time"
              value={reminder.time}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0A354C] focus:border-[#0A354C]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0A354C] text-white p-3 rounded-lg font-semibold shadow-lg hover:bg-[#083040] transition-all"
          >
            Add Reminder
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddReminder;
