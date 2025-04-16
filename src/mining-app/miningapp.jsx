import React, { useState } from "react";
import Mnavbar from "./Mnavbar";
import Miningloader from "./Miningloader";

const Miningapp = () => {
  const [showNews, setShowNews] = useState(true);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Assuming the user object structure is dynamic and can have different keys
  const totalBalance = storedUser ? parseFloat(storedUser.totalBalance) : 0;
  const totalReferall = storedUser ? parseFloat(storedUser.totalReferal) : 0;
  const pendingBalance = storedUser ? storedUser.pendingBalance || "NA" : "NA";

  return (
    <>
      <Mnavbar />
      {/* top bar show three box etc  */}
      <div>
        <div className="text-center my-4">
          <h1 className="text-2xl md:text-xl font-bold">
            Welcome, {storedUser ? storedUser.Fullname : "Guest"}!
          </h1>
        </div>
      </div>
      <div className="flex flex-row justify-around p-2 space-x-2 ">
        <div className="bg-white shadow-md rounded-lg p-2 flex-1 transition-transform duration-300 hover:scale-105 hover:shadow-lg border-b-2 border-gray-300">
          <h2 className="text-lg font-bold">Total Balance</h2>
          <p className="text-xl">
            {totalBalance >= 1e9
              ? (totalBalance / 1e9).toFixed(1) + "B"
              : totalBalance >= 1e6
              ? (totalBalance / 1e6).toFixed(1) + "M"
              : totalBalance >= 1e3
              ? (totalBalance / 1e3).toFixed(1) + "K"
              : totalBalance.toFixed(0)}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-2 flex-1 transition-transform duration-300 hover:scale-105 hover:shadow-lg border-b-2 border-gray-300">
          <h2 className="text-lg font-bold">Total Referral</h2>
          <p className="text-xl">{totalReferall}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-2 flex-1 transition-transform duration-300 hover:scale-105 hover:shadow-lg border-b-2 border-gray-300">
          <h2 className="text-lg font-bold">Price </h2>
          <p className="text-xl">${pendingBalance}</p>
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
