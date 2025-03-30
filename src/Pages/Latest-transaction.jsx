import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LatestTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchHash, setSearchHash] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 25;

  useEffect(() => {
    const controller = new AbortController();
    fetchAllTransactions(controller.signal);
    return () => controller.abort(); // Cleanup on unmount
  }, []);

  const fetchAllTransactions = async (signal) => {
    try {
      setLoading(true);
      const response = await fetch("https://minning-app.onrender.com/get-all-transaction", { signal });
      const data = await response.json();

      if (data && Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
      } else {
        console.error("Unexpected API response:", data);
        setTransactions([]);
      }

      setError(null);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Failed to fetch transactions");
        console.error("Fetch error:", err);
        setTransactions([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const searchTransaction = async () => {
    if (!searchHash.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(`https://minning-app.onrender.com/get-transaction/${searchHash}`);
      const data = await response.json();

      if (data && data.transaction) {
        setSearchResult(data.transaction);
        setTransactions([]);
        setError(null);
      } else {
        setError("Transaction not found");
        setSearchResult(null);
        await fetchAllTransactions();
      }
    } catch (err) {
      setError("Failed to search transaction");
      setSearchResult(null);
      await fetchAllTransactions();
    } finally {
      setLoading(false);
    }
  };

  const prepareChartData = () => {
    // Group transactions by day of week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const groupedByDay = transactions.reduce((acc, tx) => {
      const date = new Date(tx.date);
      const day = daysOfWeek[date.getDay()];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    // Ensure all days are represented in order
    const counts = daysOfWeek.map(day => groupedByDay[day] || 0);

    return {
      labels: daysOfWeek,
      datasets: [
        {
          label: 'Number of Transactions',
          data: counts,
          fill: false,
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.5)',
          tension: 0.1
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: 'Transaction Volume By Day',
        color: 'white'
      }
    },
    scales: {
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const clearSearch = () => {
    setSearchHash("");
    setSearchResult(null);
    fetchAllTransactions();
  };

  const formatAmount = (amount) => {
    if (amount >= 1000000000) {
      return (amount / 1000000000).toFixed(1) + ' B';
    } else if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + ' M';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(1) + ' K';
    } else {
      return amount.toFixed(2);
    }
  };

  const calculateTotalAmount = () => {
    const totalAmount = transactions.reduce((total, tx) => total + Number(tx.amount), 0);
    return formatAmount(totalAmount);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user?.receiveAddress;
    console.log(id);  
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-8 sm:py-12 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center sm:text-left">Latest Transactions</h1>

        {/* Transaction Analytics */}
        {!searchResult && transactions.length > 0 && (
          <div className="mb-8 bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-white text-lg font-semibold mb-2">Transaction Volume</h3>
                <Line data={prepareChartData()} options={chartOptions} />
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-white text-lg font-semibold mb-2">Transaction Distribution</h3>
                <Bar data={prepareChartData()} options={chartOptions} />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="bg-indigo-600 rounded-lg p-4">
                <h4 className="text-white text-sm font-medium">Total Transactions</h4>
                <p className="text-white text-2xl font-bold">{transactions.length}</p>
              </div>
              <div className="bg-green-600 rounded-lg p-4">
                <h4 className="text-white text-sm font-medium">Successful</h4>
                <p className="text-white text-2xl font-bold">
                  {transactions.filter(tx => tx.status === 'completed').length}
                </p>
              </div>
              <div className="bg-red-600 rounded-lg p-4">
                <h4 className="text-white text-sm font-medium">Failed</h4>
                <p className="text-white text-2xl font-bold">
                  {transactions.filter(tx => tx.status === 'failed').length}
                </p>
              </div>
              <div className="bg-yellow-600 rounded-lg p-4">
                <h4 className="text-white text-sm font-medium">Pending</h4>
                <p className="text-white text-2xl font-bold">
                  {transactions.filter(tx => tx.status === 'pending').length}
                </p>
              </div>
              <div className="bg-purple-600 rounded-lg p-4">
                <h4 className="text-white text-sm font-medium">Total Coins</h4>
                <p className="text-white text-2xl font-bold">{calculateTotalAmount()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              value={searchHash}
              onChange={(e) => setSearchHash(e.target.value)}
              placeholder="Search by transaction hash..."
              className="w-full sm:flex-1 bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            />
            <div className="flex gap-2 sm:gap-4">
              <button
                onClick={searchTransaction}
                className="flex-1 sm:flex-none bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-sm sm:text-base"
              >
                Search
              </button>
              {searchResult && (
                <button
                  onClick={clearSearch}
                  className="flex-1 sm:flex-none bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 text-sm sm:text-base"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center my-6 sm:my-8">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-indigo-500"></div>
            <div className="animate-pulse ml-3 sm:ml-4 text-base sm:text-lg text-indigo-500">Loading transactions...</div>
          </div>
        )}

        {/* Search Result */}
        {searchResult && (
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Search Result</h2>
            <div className="bg-gray-700 rounded-lg p-3 sm:p-4 space-y-2 text-sm sm:text-base">
              <p className="text-gray-300"><span className="font-bold">Hash:</span> <span className="break-all">{searchResult.transaction_Hash}</span></p>
              <p className="text-gray-300"><span className="font-bold">Amount:</span> {searchResult.amount}</p>
              <p className="text-gray-300"><span className="font-bold">Gas Fee:</span> {searchResult.GassFee}</p>
              <p className="text-gray-300"><span className="font-bold">Type:</span> {searchResult.transactionType}</p>
              <p className="text-gray-300 flex items-center gap-2">
                <span className="font-bold ">Status:</span>
                <span className="flex items-center gap-2">
                  {searchResult.status}
                  {searchResult.status.toLowerCase() === 'completed' && (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                  {searchResult.status.toLowerCase() === 'failed' && (
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  )}
                </span>
              </p>
              <p className="text-gray-300"><span className="font-bold">Sender:</span> <span className="break-all">{searchResult.senderAddress}</span></p>
              <p className="text-gray-300"><span className="font-bold">Receiver:</span> <span className="break-all">{searchResult.receiverAddress}</span></p>
              <p className="text-gray-300"><span className="font-bold">Date:</span> {searchResult.timestamp}</p>
            </div>
          </div>
        )}

        {/* All Transactions Table */}
        {!searchResult && transactions.length > 0 && (
          <div className="bg-gray-800 rounded-lg overflow-hidden overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Hash</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Time</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Sender</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider">Receiver</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {currentTransactions.map((tx, index) => (
                  <tr key={index} className="hover:bg-gray-700">
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-300">
                      {tx.Transaction_Hash}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-300">
                      {tx.amount}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-300 flex items-center gap-2">
                      {tx.status}
                      {tx.status.toLowerCase() === 'completed' && (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                      {tx.status.toLowerCase() === 'failed' && (
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      )}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-300">
                      {tx.date}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-300">
                      {tx.senderAddress}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-300">
                      {tx.receiverAddress}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 bg-gray-700">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg text-sm ${
                  currentPage === 1 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Previous
              </button>
              <span className="text-gray-300 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg text-sm ${
                  currentPage === totalPages
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestTransaction;
