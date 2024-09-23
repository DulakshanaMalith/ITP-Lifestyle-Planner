import React, { useState } from 'react';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const handleRedirect = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-blue-200 p-8">
      <h1 className="text-4xl font-bold mb-8 text-[#0A354C]">Doctor Appointments</h1>
      
      {/* Create Appointment Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-10 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-[#0A354C]">Create Appointment</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleRedirect('https://www.doc.lk')}
            className="bg-[#0A354C] text-white py-3 rounded-lg hover:bg-[#083040] transition-colors duration-300 shadow-md"
          >
            Book via Doc990
          </button>
          <button
            onClick={() => handleRedirect('https://www.echannelling.com')}
            className="bg-[#0A354C] text-white py-3 rounded-lg hover:bg-[#083040] transition-colors duration-300 shadow-md"
          >
            Book via E-Channeling
          </button>
        </div>
      </div>

      {/* Your Appointments Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-[#0A354C]">Your Appointments</h2>
        {appointments.length > 0 ? (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
              >
                <span className="font-medium">{appointment.service}</span> on{' '}
                <span className="text-gray-600">{appointment.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You have no upcoming appointments yet.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
