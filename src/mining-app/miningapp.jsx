import React, { useState, useEffect } from "react";
import Mnavbar from "./Mnavbar";
import Miningloader from "./Miningloader";

const Miningapp = () => {
  const [showNews, setShowNews] = useState(true);
  const [userData, setUserData] = useState({
    Fullname: "Guest",
    totalBalance: 0,
    totalReferal: 0,
    pendingBalance: "NA"
  });

  // Function to fetch and update user data
  const fetchUserData = () => {
    try {
      const storedUser = localStorage.getItem("mininguser");
      const token = localStorage.getItem("miningtoken");
      const tokenExpiry = localStorage.getItem("miningtokenExpiry");
      
      if (storedUser && token && tokenExpiry) {
        // Check if token is still valid
        if (new Date().getTime() <= parseInt(tokenExpiry)) {
          const parsedUser = JSON.parse(storedUser);
          setUserData({
            Fullname: parsedUser.Fullname || parsedUser.username || "Guest",
            totalBalance: parseFloat(parsedUser.totalBalance) || 0,
            totalReferal: parseFloat(parsedUser.totalReferal) || 0,
            pendingBalance: parsedUser.pendingBalance || "NA"
          });
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  };

  // Fetch user data on component mount and set up interval for auto-refresh
  useEffect(() => {
    fetchUserData();
    
    // Set up interval to refresh data every 30 seconds
    const intervalId = setInterval(fetchUserData, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Mnavbar />
      {/* top bar show three box etc  */}
      <div>
        <div className="text-center my-4">
          <h1 className="text-2xl md:text-xl font-bold">
            Welcome, {userData.Fullname}!
          </h1>
        </div>
      </div>
      <div className="flex flex-row justify-around p-2 space-x-2 ">
        <div className="bg-white shadow-md rounded-lg p-2 flex-1 transition-transform duration-300 hover:scale-105 hover:shadow-lg border-b-2 border-gray-300">
          <h2 className="text-lg font-bold">Total Balance</h2>
          <p className="text-xl">
            {userData.totalBalance >= 1e9
              ? (userData.totalBalance / 1e9).toFixed(1) + "B"
              : userData.totalBalance >= 1e6
              ? (userData.totalBalance / 1e6).toFixed(1) + "M"
              : userData.totalBalance >= 1e3
              ? (userData.totalBalance / 1e3).toFixed(1) + "K"
              : userData.totalBalance.toFixed(0)}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-2 flex-1 transition-transform duration-300 hover:scale-105 hover:shadow-lg border-b-2 border-gray-300">
          <h2 className="text-lg font-bold">Total Referral</h2>
          <p className="text-xl">{userData.totalReferal}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-2 flex-1 transition-transform duration-300 hover:scale-105 hover:shadow-lg border-b-2 border-gray-300">
          <h2 className="text-lg font-bold">Price </h2>
          <p className="text-xl">${userData.pendingBalance}</p>
        </div>
      </div>
      {/* Show latest news */}
      {showNews && (
        <div>
          <div className="bg-white shadow-md rounded-lg p-4 my-4 border-b-2 border-gray-300">
            <h2 className="text-sm font-bold flex justify-between items-center">
              Latest News
              <button
                onClick={() => setShowNews(false)}
                className="text-red-500 pr-4"
              >
                ✖
              </button>
            </h2>
            <p className="text-lg">
              Stay updated with the latest news in the mining industry!
            </p>
            <ul className="list-disc pl-5">
              <li>New mining regulations announced.</li>
              <li>Market trends show an increase in cryptocurrency value.</li>
              <li>Innovative mining technologies are on the rise.</li>
            </ul>
          </div>
        </div>
      )}

      {/* mining buton  */}
        <Miningloader />
      
    </>
  );
};

export default Miningapp;
