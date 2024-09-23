import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ReminderList() {
  const [reminders, setReminders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch('http://localhost:5000/health');
        if (!response.ok) throw new Error('Failed to fetch reminders');
        const data = await response.json();
        setReminders(data);
      } catch (error) {
        setErrorMessage('Failed to fetch reminders.');
      }
    };

    fetchReminders();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/health/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete reminder');

      setReminders(reminders.filter(reminder => reminder._id !== id));
    } catch (error) {
      setErrorMessage('Failed to delete reminder.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-[#0A354C] mb-8">Your Reminder List</h2>

        {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}

        <Link to="/add">
          <button className="w-full bg-[#0A354C] text-white py-3 rounded-lg hover:bg-[#07343D] transition-colors mb-6">
            Add New Reminder
          </button>
        </Link>

        {reminders.length === 0 ? (
          <p className="text-gray-500 text-center">No reminders found. Start by adding one!</p>
        ) : (
          <ul className="space-y-6">
            {reminders.map(reminder => (
              <li key={reminder._id} className="bg-gray-50 border border-gray-300 rounded-xl shadow-md p-6 flex justify-between items-center hover:shadow-lg transition-shadow">
                <div>
                  <h3 className="text-xl font-semibold text-[#0A354C] mb-2">{reminder.reminderType}</h3>
                  <p className="text-gray-600 mb-1">{reminder.description}</p>
                  <p className="text-gray-500 text-sm">{reminder.days} days, {reminder.time} time</p>
                </div>
                <div className="flex space-x-3">
                  <Link to={`/update/${reminder._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(reminder._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ReminderList;
