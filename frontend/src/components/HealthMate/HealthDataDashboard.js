import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HealthDataDashboard = () => {
  const [healthData, setHealthData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedType, setSelectedType] = useState('blood pressure');
  const [patientName, setPatientName] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/healthdata/viewall');
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setHealthData(sortedData);
        setFilteredData(sortedData);
      } catch (error) {
        console.error('Error fetching health data:', error);
      }
    };

    fetchHealthData();
  }, []);

  useEffect(() => {
    filterData();
  }, [selectedType, patientName, healthData]);

  const filterData = () => {
    let data = healthData.filter((entry) => entry.type === selectedType);
    if (patientName) {
      data = data.filter((entry) => entry.patientName.toLowerCase().includes(patientName.toLowerCase()));
    }
    setFilteredData(data);
  };

  const getChartData = () => {
    const labels = [];
    const dataPoints = [];

    filteredData.forEach((entry) => {
      entry.readings.forEach((reading, index) => {
        labels.push(`Day ${index + 1}`);
        dataPoints.push(selectedType === 'blood pressure' ? reading.value1 : reading.value1); // Adjust for diastolic if needed
      });
    });

    return {
      labels: labels,
      datasets: [
        {
          label: `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Readings`,
          data: dataPoints,
          borderColor: selectedType === 'blood pressure' ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  };

  const goToDetails = () => {
    navigate('/viewhealthdata'); // Navigate to the "Details" page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-[#0A354C] mb-8">Health Data Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Patient Name:</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Search by patient name"
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#0A354C] focus:border-[#0A354C] p-3"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#0A354C] focus:border-[#0A354C] p-3"
            >
              <option value="blood pressure">Blood Pressure</option>
              <option value="diabetes">Diabetes</option>
            </select>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6 shadow-inner">
          <Line data={getChartData()} options={{ responsive: true }} />
        </div>

        <div className="text-center">
          <button
            onClick={goToDetails}
            className="bg-[#0A354C] text-white py-3 px-6 rounded-lg hover:bg-[#083040] transition duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthDataDashboard;
