import React from 'react';

const OrderPrescription = () => {
  const handleOrderPrescription = () => {
    window.open('https://www.echannelling.com/order-medicine', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center border border-gray-200">
        <h1 className="text-4xl font-bold mb-4 text-[#0A354C]">Order Medical Prescriptions</h1>
        <p className="text-lg mb-6 text-gray-700">
          Click the button below to order your medical prescriptions online. It’s quick and easy!
        </p>
        <button
          onClick={handleOrderPrescription}
          className="bg-[#0A354C] text-white py-3 px-6 rounded-lg shadow-lg hover:bg-[#0A455C] transition duration-300 transform hover:scale-105"
        >
          Order Prescriptions
        </button>
      </div>
    </div>
  );
};

export default OrderPrescription;
