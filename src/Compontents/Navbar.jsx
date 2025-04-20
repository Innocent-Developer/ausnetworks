import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleNavLinkClick = () => setIsOpen(false);

  return (
    <nav className="bg-gradient-to-r from-[#0f0f0f] to-[#1c1c1c] shadow-lg border-b border-gray-800 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-white tracking-wide">
              A-U-S <span className="text-blue-500">Networks</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/login-mining", label: "Mining", newTab: true }, // Mark this one to open in new tab
              // { to: "/login", label: "Wallet" },
              { to: "/transaction", label: "Latest Transaction" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={handleNavLinkClick}
                target={link.newTab ? "_blank" : undefined}
                rel={link.newTab ? "noopener noreferrer" : undefined}
                className="text-gray-300 hover:text-blue-500 transition duration-300 text-sm font-medium"
              >
                {link.label}
              </NavLink>
            ))}

            <NavLink
              to="/contact"
              onClick={handleNavLinkClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition duration-300"
            >
              Contact
            </NavLink>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#111] transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="p-6 space-y-4 ">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/login-mining", label: "Mining" },
            // { to: "/login", label: "Wallet" },
            { to: "/transaction", label: "Latest Transaction" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={handleNavLinkClick}
              className="block text-gray-200 gap-2 hover:text-blue-500 text-lg transition duration-200"
            >
              {link.label}
            </NavLink>
          ))}

          <NavLink
            to="/contact"
            onClick={handleNavLinkClick}
            className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-lg mt-4"
          >
            Contact
          </NavLink>

          {/* Social Icons - only mobile */}
          <div className="flex space-x-4 mt-8 text-white text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
