import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import echannelling from "../../images/OIP.jpeg";
import doctor from "../../images/R.png";

const HomePage = () => {
  const services = [
    {
      name: "E Channeling",
      description:
        "Enjoy the convenience of scheduling appointments online with ease. Book appointments with your preferred doctor.",
      imgSrc: echannelling,
    },
    {
      name: "Doctor Meet",
      description:
        "Connect with doctors online and get medical consultations at the comfort of your home.",
      imgSrc: doctor,
    },
    {
      name: "Pharmacy Orders",
      description:
        "Order your medications online and have them delivered to your doorstep.",
      imgSrc: echannelling,
    },
  ];

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-4xl font-bold text-[#0A354C] mb-12 text-center">Tele Medicine Services</h1>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
        <Link to="/add">
          <button className="px-8 py-3 bg-[#0A354C] text-white font-semibold rounded-full hover:bg-[#083040] transition-all">
            Add Reminder
          </button>
        </Link>
        <Link to="/remainderlist">
          <button className="px-8 py-3 bg-yellow-400 text-white font-semibold rounded-full hover:bg-yellow-500 transition-all">
            View Reminders
          </button>
        </Link>
        <Link to="/emergency-contacts">
          <button className="px-8 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-all">
            Emergency Contacts
          </button>
        </Link>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105"
          >
            <img
              src={service.imgSrc}
              alt={service.name}
              className="mx-auto mb-6 h-40 w-40 object-cover rounded-full"
            />
            <h3 className="text-2xl font-semibold mb-4 text-[#0A354C]">
              {service.name}
            </h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      {/* E-Channeling Section */}
      <h2 className="text-3xl font-bold text-[#0A354C] mb-8 text-center">E-Channeling Services</h2>

      <div className="space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <img
              src={echannelling}
              alt="E-Channeling"
              className="w-32 h-32 object-cover rounded-full"
            />
            <div>
              <h3 className="text-2xl font-semibold text-[#0A354C] mb-2">
                E-CHANNELLING
              </h3>
              <p className="text-gray-600">
                e-Channelling is the most trustworthy & reliable online platform
                in Sri Lanka for scheduling medical consultations.
              </p>
            </div>
          </div>
          <a
            href="https://www.echannelling.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-[#0A354C] text-white font-semibold rounded-full hover:bg-[#083040] transition-all"
          >
            Visit E-Channeling
          </a>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <img
              src={doctor}
              alt="Doc990"
              className="w-32 h-32 object-cover rounded-full"
            />
            <div>
              <h3 className="text-2xl font-semibold text-[#0A354C] mb-2">DOC990</h3>
              <p className="text-gray-600">
                Doc990 offers online medical consultations with trusted doctors across Sri Lanka.
              </p>
            </div>
          </div>
          <a
            href="https://www.doc.lk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-[#0A354C] text-white font-semibold rounded-full hover:bg-[#083040] transition-all"
          >
            Visit DOC990
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
