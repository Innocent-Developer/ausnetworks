import React, { useState } from "react";
import Mnavbar from "../mining-app/Mnavbar";

const KYC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleContactClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Mnavbar />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            KYC Under Development
          </h1>
          <p className="text-lg">
            We are currently working on this page. Please check back later.
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleContactClick}
          >
            Contact Us
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-2">Contact Information</h2>
            <p>Email: support@example.com</p>
            <p>Phone: (123) 456-7890</p>
            <button 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default KYC;
