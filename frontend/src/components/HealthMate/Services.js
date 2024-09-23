import React from 'react';
import { Link } from 'react-router-dom';
import { FaPills, FaPhoneAlt, FaCalendarAlt, FaPrescriptionBottleAlt } from 'react-icons/fa'; // Importing icons

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 p-6">
      <h1 className="text-4xl font-bold mb-10 text-[#0A354C]">Welcome to Your Health Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Manage Medication */}
        <Link to="/dashboard">
          <div className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center space-x-4 mb-4">
              <FaPills className="text-4xl text-blue-500" />
              <h2 className="text-2xl font-semibold text-[#0A354C]">Manage Medication</h2>
            </div>
            <p className="text-gray-600">Click here to manage your medications and tasks.</p>
          </div>
        </Link>

        {/* Emergency Contacts */}
        <Link to="/emergency-contacts">
          <div className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center space-x-4 mb-4">
              <FaPhoneAlt className="text-4xl text-red-500" />
              <h2 className="text-2xl font-semibold text-[#0A354C]">Emergency Contacts</h2>
            </div>
            <p className="text-gray-600">Click here for your emergency contact services.</p>
          </div>
        </Link>

        {/* Doctor Appointments */}
        <Link to="/doctor-appointments">
          <div className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center space-x-4 mb-4">
              <FaCalendarAlt className="text-4xl text-green-500" />
              <h2 className="text-2xl font-semibold text-[#0A354C]">Doctor Appointments</h2>
            </div>
            <p className="text-gray-600">Click here to schedule an online appointment.</p>
          </div>
        </Link>

        {/* Prescription Order */}
        <Link to="/prescription-order">
          <div className="bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center space-x-4 mb-4">
              <FaPrescriptionBottleAlt className="text-4xl text-purple-500" />
              <h2 className="text-2xl font-semibold text-[#0A354C]">Prescription Order</h2>
            </div>
            <p className="text-gray-600">Click here to order your medical prescriptions.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Services;
