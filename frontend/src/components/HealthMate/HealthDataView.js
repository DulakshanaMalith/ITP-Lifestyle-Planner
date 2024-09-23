import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const HealthDataView = () => {
  const [healthData, setHealthData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/healthdata/viewall');
      setHealthData(response.data);
    } catch (error) {
      console.error('Error fetching health data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/healthdata/${id}`);
      fetchHealthData();
    } catch (error) {
      console.error('Error deleting health data:', error);
    }
  };

  const filteredHealthData = healthData.filter((data) => {
    const matchesSearchQuery = data.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilterType = filterType ? data.type === filterType : true;
    return matchesSearchQuery && matchesFilterType;
  });

  // Function to generate the report
  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Health Data Report", 14, 16);

    const tableColumn = ["Patient Name", "Age", "Type", "Readings"];
    const tableRows = [];

    filteredHealthData.forEach((data) => {
      const readings = data.readings
        .map((reading, index) => `Day ${index + 1}: ${reading.value1}${data.type === 'blood pressure' ? `/${reading.value2}` : ''}`)
        .join(", ");

      const rowData = [
        data.patientName,
        data.age,
        data.type,
        readings,
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("health_data_report.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <h2 className="text-4xl font-bold text-[#0A354C] mb-8">Health Data Records</h2>

      <div className="w-full max-w-6xl bg-white p-8 rounded-xl shadow-lg">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by patient name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0A354C] focus:border-[#0A354C] mb-4 md:mb-0"
          />

          {/* Filter Dropdown and Add Button */}
          <div className="flex space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0A354C] focus:border-[#0A354C]"
            >
              <option value="">All Types</option>
              <option value="blood pressure">Blood Pressure</option>
              <option value="diabetes">Diabetes</option>
            </select>

            {/* Add Health Data Button */}
            <button
              onClick={() => navigate('/addhealthdata')} // Navigate to the add page
              className="px-6 py-3 bg-[#0A354C] text-white rounded-lg shadow hover:bg-[#083040] transition duration-300"
            >
              Add Health Data
            </button>

            {/* Generate Report Button */}
            <button
              onClick={generateReport}
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
            >
              Generate Report
            </button>
          </div>
        </div>

        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="bg-[#0A354C] text-white">
              <th className="px-6 py-4">Patient Name</th>
              <th className="px-6 py-4">Age</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Readings</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHealthData.map((data, index) => (
              <tr
                key={data._id}
                className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-200`}
              >
                <td className="px-6 py-4">{data.patientName}</td>
                <td className="px-6 py-4">{data.age}</td>
                <td className="px-6 py-4">{data.type}</td>
                <td className="px-6 py-4">
                  {data.readings.map((reading, index) => (
                    <div key={index} className="text-sm">
                      Day {index + 1}: {reading.value1} {data.type === 'blood pressure' ? `/${reading.value2}` : ''}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 flex space-x-2">
                  <Link to={`/updatehealthdata/${data._id}`}>
                    <button className="px-4 py-2 bg-[#FFB300] text-white rounded-lg shadow hover:bg-[#e0a600] transition duration-300">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HealthDataView;
