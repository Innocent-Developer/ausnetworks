import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-2xl font-bold text-white hover:scale-105 transition-transform duration-200">
              A-U-S Networks
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
              Home
            </NavLink>
            <NavLink to="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
              About
            </NavLink>
            <NavLink to="/mining" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
              Mining
            </NavLink>
            <NavLink to="/wallet" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
              Wallet
            </NavLink>
            <NavLink to="/transaction"  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
            Latest Transaction
            </NavLink>
            <NavLink to="/contact" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-all duration-200">
              Contact
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none transition-transform duration-200 hover:scale-110"
            >
              {isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMenu}></div>
      )}

      {/* Sidebar Menu */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden z-50`}> 
        <div className="p-5 space-y-4">
          <NavLink to="/" className="block text-white text-lg">Home</NavLink>
          <NavLink to="/about" className="block text-white text-lg">About</NavLink>
          <NavLink to="/mining" className="block text-white text-lg">Mining</NavLink>
          <NavLink to="/wallet" className="block text-white text-lg">Wallet</NavLink>
          <NavLink to="/transaction" className="block text-white text-lg">Latest Transaction</NavLink>
          <NavLink to="/contact" className="block text-white text-lg bg-indigo-600 px-4 py-2 rounded-md">Contact</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
