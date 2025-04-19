import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Mnavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear all mining-related localStorage items
    localStorage.removeItem("mininguser");
    localStorage.removeItem("miningtoken");
    localStorage.removeItem("miningtokenExpiry");
    
    // Show logout notification
    toast.success("Logged out successfully");
    
    // Redirect to login page
    navigate('/login-mining');
  };

  return (
    <nav className={`bg-gray-300 p-4 opacity-1 relative z-10`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-lg font-bold">AUS-MINING</div>
        <div className="hidden md:flex space-x-4">
          <NavLink to="/web-app/mining/mobile-app" className="hover:text-gray-700">Home</NavLink>
          <NavLink to="/web-app/mining/mobile-app/node" className="hover:text-gray-700">Node</NavLink>
          <NavLink to="/web-app/mining/mobile-app/chat" className="hover:text-gray-700">chat</NavLink>
          <NavLink to="/web-app/mining/mobile-app/kyc" className="hover:text-gray-700">KYC</NavLink>
          <NavLink to="/" className="hover:text-gray-700">Settings</NavLink>
        </div>
        <div className="md:hidden">
          <button className="focus:outline-none" onClick={toggleNavbar}>
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar for mobile */}
      {isOpen && (
        <>
          {/* Overlay background (optional) */}
          <div className="fixed inset-0 bg-black opacity-30 z-40" onClick={toggleNavbar}></div>

          {/* Sidebar */}
          <div className="md:hidden bg-gray-300 p-4 fixed left-0 top-0 h-full w-64 shadow-lg z-50">
            <div className="text-2xl font-bold">AUS-MINING</div>
            <div className="flex flex-col space-y-4 p-4 pt-12 gap-2">
              <NavLink to="/web-app/mining/mobile-app" className="block p-2 hover:text-white hover:bg-gray-500 rounded-xl">Home</NavLink>
              <NavLink to="/web-app/mining/mobile-app/node" className="block p-2 hover:text-white hover:bg-gray-500 rounded-xl">Node</NavLink>
              <NavLink to="/web-app/mining/mobile-app/chat" className="block p-2 hover:text-white hover:bg-gray-500 rounded-xl">Chat</NavLink>
              <NavLink to="/web-app/mining/mobile-app/refferal" className="block p-2 hover:text-white hover:bg-gray-500 rounded-xl">Refferal</NavLink>
              <NavLink to="/web-app/mining/mobile-app/kyc" className="block p-2 hover:text-white hover:bg-gray-500 rounded-xl">KYC</NavLink>
              <NavLink to="/" className="block p-2 hover:text-white hover:bg-gray-500 rounded-xl">Settings</NavLink>
              <button className="block p-2 hover:text-white hover:bg-red-500 rounded-xl" onClick={handleLogout}>
                Logout
              </button>

              <div className="flex space-x-4 py-2 gap-2 border-t border-gray-400 pt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.35C0 23.4.6 24 1.325 24h21.35C23.4 24 24 23.4 24 22.675V1.325C24 .6 23.4 0 22.675 0zM12 24V12h-3v-4h3V6.5c0-3.1 1.9-4.5 4.5-4.5 1.3 0 2.5.1 2.5.1v3h-1.4c-1.4 0-1.8.9-1.8 1.8V8h4l-.6 4h-3.4v12h-4z" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.643 4.937c-.835.37-1.73.617-2.675.724a4.688 4.688 0 002.043-2.573 9.36 9.36 0 01-2.977 1.136A4.688 4.688 0 0016.616 3c-2.59 0-4.688 2.098-4.688 4.688 0 .367.042.724.125 1.067-3.9-.196-7.36-2.063-9.688-4.9a4.688 4.688 0 00-.634 2.354c0 1.62.823 3.055 2.073 3.895a4.66 4.66 0 01-2.12-.585v.059c0 2.27 1.613 4.16 3.75 4.588a4.688 4.688 0 01-2.12.08c.6 1.88 2.34 3.25 4.4 3.29a9.36 9.36 0 01-5.79 1.99c-.375 0-.743-.022-1.107-.065a13.19 13.19 0 007.14 2.1c8.57 0 13.25-7.1 13.25-13.25 0-.2 0-.4-.014-.6A9.427 9.427 0 0024 4.59a9.24 9.24 0 01-2.357.646 4.688 4.688 0 002.063-2.573z" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12 0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 22c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm5-15c-.553 0-1 .447-1 1s.447 1 1 1 1-.447 1-1-.447-1-1-1zm-5 1.5c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5 4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5zm0 7c-1.378 0-2.5-1.122-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.122 2.5 2.5-1.122 2.5-2.5 2.5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Mnavbar;
