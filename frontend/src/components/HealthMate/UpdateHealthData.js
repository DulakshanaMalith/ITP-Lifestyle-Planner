import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateHealthData = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [type, setType] = useState('blood pressure');
  const [readings, setReadings] = useState(Array(7).fill({ day: null, value1: '', value2: '' }));

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/healthdata/view/${id}`);
        const { patientName, age, type, readings } = response.data;
        setPatientName(patientName);
        setAge(age);
        setType(type);
        setReadings(readings);
      } catch (error) {
        console.error('Error fetching health data:', error);
      }
    };

    fetchHealthData();
  }, [id]);

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

    const updatedHealthData = {
      patientName,
      age,
      type,
      readings,
    };

    try {
      await axios.put(`http://localhost:5000/healthdata/update/${id}`, updatedHealthData);
      console.log('Data updated successfully');
      navigate('/viewhealthdata');
    } catch (error) {
      console.error('Error updating the data:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-[#0A354C] mb-6 text-center">Update Health Data</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Patient Name:</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0A354C] focus:border-[#0A354C] transition duration-300"
              placeholder="Enter patient name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0A354C] focus:border-[#0A354C] transition duration-300"
              placeholder="Enter patient age"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0A354C] focus:border-[#0A354C] transition duration-300"
            >
              <option value="blood pressure">Blood Pressure</option>
              <option value="diabetes">Diabetes</option>
            </select>
          </div>

          {readings.map((reading, index) => (
            <div key={index} className="border-t pt-6 mt-6">
              <h4 className="text-xl font-semibold mb-4 text-gray-800">Day {index + 1}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">
                    {type === 'blood pressure' ? 'Systolic:' : 'Glucose:'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={reading.value1}
                    onChange={(e) => handleReadingChange(index, 'value1', e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0A354C] focus:border-[#0A354C] transition duration-300"
                    placeholder={type === 'blood pressure' ? 'Systolic value' : 'Glucose value'}
                  />
                </div>
                {type === 'blood pressure' && (
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">Diastolic:</label>
                    <input
                      type="number"
                      step="0.1"
                      value={reading.value2}
                      onChange={(e) => handleReadingChange(index, 'value2', e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0A354C] focus:border-[#0A354C] transition duration-300"
                      placeholder="Diastolic value"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-8">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-[#0A354C] text-white rounded-lg shadow-lg hover:bg-[#083040] transition duration-300"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate('/viewhealthdata')}
              className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-lg hover:bg-gray-300 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateHealthData;
