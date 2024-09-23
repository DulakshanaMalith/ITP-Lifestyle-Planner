import React from 'react';
import asiri from '../../images/logo.png';
import ruhunu from '../../images/ruhunu_hospital_logo.png';
import lanka from '../../images/lankahospitals-logo.png';
import suwa from '../../images/hq-logo-1-scaled.jpg';

const EmergencyContacts = () => {
  const hospitals = [
    {
      name: 'Asiri Hospital',
      url: 'https://asirihealth.com/',
      logo: asiri,
    },
    {
      name: 'Ruhunu Hospital',
      url: 'https://www.ruhunuhospital.lk/',
      logo: ruhunu,
    },
    {
      name: 'Lanka Hospital',
      url: 'https://www.lankahospitals.com/',
      logo: lanka,
    },
    {
      name: 'Suwa Sariya',
      url: 'https://www.1990.lk/',
      logo: suwa,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-blue-200 p-8">
      <h1 className="text-4xl font-bold mb-8 text-[#0A354C]">Emergency Contacts</h1>
      <h2 className="text-2xl font-semibold mb-6 text-[#0A354C]">Nearby Hospitals</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {hospitals.map((hospital, index) => (
          <li key={index} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
            <a
              href={hospital.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center text-lg text-[#0A354C] font-medium"
            >
              <img src={hospital.logo} alt={`${hospital.name} logo`} className="w-32 h-24 mb-4 rounded-lg" />
              <span className="text-xl font-semibold">{hospital.name}</span>
              <button className="mt-4 px-4 py-2 bg-[#0A354C] text-white rounded-full hover:bg-[#083040] transition-colors">
                Visit Website
              </button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmergencyContacts;
