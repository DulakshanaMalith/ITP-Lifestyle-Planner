import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateReminder() {
  const { id } = useParams();
  const [reminder, setReminder] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReminder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/health/${id}`);
        if (!response.ok) throw new Error('Failed to fetch reminder');
        const data = await response.json();
        setReminder(data);
      } catch (error) {
        console.error('Failed to fetch reminder:', error);
      }
    };

    fetchReminder();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReminder({ ...reminder, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/health/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reminder),
      });

      if (!response.ok) throw new Error('Failed to update reminder');

      setSuccessMessage('Reminder updated successfully!');
      setTimeout(() => {
        navigate('/'); // Redirect after a short delay
      }, 2000);
    } catch (error) {
      setSuccessMessage('Failed to update reminder. Please try again.');
    }
  };

  if (!reminder) return <p className="text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-gray-200">
        {successMessage && (
          <p className={successMessage.includes('successfully') ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
            {successMessage}
          </p>
        )}
        <h2 className="text-3xl font-bold text-center text-[#0A354C] mb-6">Update Reminder</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Reminder Type:</label>
            <input
              type="text"
              name="reminderType"
              value={reminder.reminderType}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#0A354C] focus:ring focus:ring-[#0A354C] focus:ring-opacity-50"
              placeholder="Enter reminder type"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Description:</label>
            <input
              type="text"
              name="description"
              value={reminder.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#0A354C] focus:ring focus:ring-[#0A354C] focus:ring-opacity-50"
              placeholder="Enter description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Days:</label>
            <input
              type="number"
              name="days"
              value={reminder.days}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#0A354C] focus:ring focus:ring-[#0A354C] focus:ring-opacity-50"
              placeholder="Enter number of days"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Time:</label>
            <input
              type="time"
              name="time"
              value={reminder.time}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#0A354C] focus:ring focus:ring-[#0A354C] focus:ring-opacity-50"
            />
          </div>
          <button type="submit" className="w-full bg-[#0A354C] text-white p-3 rounded-lg hover:bg-[#0E4239] transition duration-300">
            Update Reminder
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateReminder;
