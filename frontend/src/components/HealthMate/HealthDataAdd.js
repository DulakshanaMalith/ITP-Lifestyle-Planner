import React, { useState } from 'react';
import axios from 'axios';

const HealthDataAdd = () => {
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [type, setType] = useState('blood pressure');
  const [readings, setReadings] = useState(
    Array(7).fill({ day: null, value1: '', value2: '' })
  );

  const initializeDays = () => {
    return Array.from({ length: 7 }, (_, index) => ({
      day: index + 1,
      value1: '',
      value2: '',
    }));
  };

  useState(() => {
    setReadings(initializeDays());
  }, []);

  const handleReadingChange = (index, field, value) => {
    const updatedReadings = [...readings];
    updatedReadings[index] = {
      ...updatedReadings[index],
      [field]: value,
    };
    setReadings(updatedReadings);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const healthData = {
      patientName,
      age,
      type,
      readings,
    };

    try {
      const response = await axios.post('http://localhost:5000/healthdata/add', healthData);
      console.log('Data added successfully:', response.data);
      setPatientName('');
      setAge('');
      setType('blood pressure');
      setReadings(initializeDays());
    } catch (error) {
      console.error('There was an error submitting the data', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-3xl font-bold text-[#0A354C] mb-6 text-center">Heart Beats Checker</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Name */}
          <div>
            <label className="block text-gray-700 mb-2">Patient Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A354C] transition duration-200"
              placeholder="Enter patient name"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A354C] transition duration-200"
              placeholder="Enter patient age"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-gray-700 mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A354C] transition duration-200"
            >
              <option value="blood pressure">Blood Pressure</option>
              <option value="diabetes">Diabetes</option>
            </select>
          </div>

          {/* Readings for Days */}
          {readings.map((reading, index) => (
            <div key={index} className="border-t pt-4 mt-4">
              <h4 className="text-lg font-semibold mb-2 text-[#0A354C]">Day {reading.day}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    {type === 'blood pressure' ? 'Systolic' : 'Glucose'}:
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={reading.value1}
                    onChange={(e) => handleReadingChange(index, 'value1', e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A354C] transition duration-200"
                    placeholder={type === 'blood pressure' ? 'Systolic value' : 'Glucose value'}
                  />
                </div>
                {type === 'blood pressure' && (
                  <div>
                    <label className="block text-gray-700 mb-2">Diastolic:</label>
                    <input
                      type="number"
                      step="0.1"
                      value={reading.value2}
                      onChange={(e) => handleReadingChange(index, 'value2', e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A354C] transition duration-200"
                      placeholder="Diastolic value"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-3 bg-[#0A354C] text-white rounded-lg shadow hover:bg-[#0E4239] transition duration-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                setPatientName('');
                setAge('');
                setType('blood pressure');
                setReadings(initializeDays());
              }}
              className="w-full sm:w-auto px-4 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthDataAdd;
