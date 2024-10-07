// src/pages/ServiceStationPage.js
import React from 'react';
import Nav from '../AutoAssist/Nav';
import { useNavigate } from 'react-router-dom';
import Footer from '../AutoAssist/Footer';
import ServiceStationForm from '../AutoAssist/ServiceStationForm';
import ServiceStationList from '../AutoAssist/ServiceStationList';

function ServiceStationPage({ serviceStations, saveServiceStation, deleteServiceStation, setCurrentServiceStation, currentServiceStation, handleSelectServiceStation }) {
  const navigate = useNavigate();
  const handleSelectAndRedirect = (stationId) => {
    handleSelectServiceStation(stationId);  // Set the selected service station
    navigate('/reminders');  // Redirect to the reminder form page
  };
  return (
    <div>
      <Nav />
      <h1 className="title">Service Station Management</h1>
      <ServiceStationForm saveServiceStation={saveServiceStation} currentServiceStation={currentServiceStation} />
      <ServiceStationList 
        serviceStations={serviceStations} 
        setCurrentServiceStation={setCurrentServiceStation} 
        deleteServiceStation={deleteServiceStation} 
        selectServiceStation={handleSelectAndRedirect} 
      />
      <Footer />
    </div>
  );
}

export default ServiceStationPage;
