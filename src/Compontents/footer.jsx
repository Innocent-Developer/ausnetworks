import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Footer = () => {
  const [emailAddress, setemailAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailAddress) {
      setError('Email is required');
      return;
    }
    setError('');
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/store-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailAddress }),
      });

      if (response.ok) {
        setSuccess('Email subscribed successfully');
        toast.success('Email subscribed successfully');
        setemailAddress('');
      } else {
        setError('Failed to subscribe email');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <footer className="bg-[#0f1117] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Join Community Section */}
        <div className="border border-gray-700 rounded-t-xl p-6 mb-12 flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-white text-2xl font-bold mb-4 md:mb-0">Join the A-U-S community</h2>
          <div className="flex space-x-4 text-xl text-white">
            <a href="#"><i className="fab fa-discord" /></a>
            <a href="#"><i className="fab fa-telegram-plane" /></a>
            <a href="#"><i className="fab fa-x-twitter" /></a>
            <a href="#"><i className="fab fa-medium" /></a>
            <a href="#"><i className="fab fa-reddit-alien" /></a>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-semibold mb-4">Use Scala</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Wallets</a></li>
              <li><a href="#" className="hover:text-white">Miners</a></li>
              <li><a href="#" className="hover:text-white">XLA Coin</a></li>
              <li><a href="#" className="hover:text-white">Get XLA</a></li>
              <li><a href="#" className="hover:text-white">Scala Share</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Learn</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Wiki</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Notary Nodes</a></li>
              <li><a href="#" className="hover:text-white">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Mining Pools</a></li>
              <li><a href="#" className="hover:text-white">Statistics</a></li>
              <li><a href="#" className="hover:text-white">Network Explorer</a></li>
              <li><a href="#" className="hover:text-white">Brand Assets</a></li>
              <li><a href="#" className="hover:text-white">Shop</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-2">Subscribe to our newsletter for the latest updates.</p>
            <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={emailAddress}
                onChange={(e) => setemailAddress(e.target.value)}
                className="bg-gray-800 px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white"
              >
                Subscribe
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
            </form>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <a href='https://mi-networks.web.app/' target='_blank'>© {new Date().getFullYear()}MI-Networks. All rights reserved.</a>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Terms and Conditions</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
