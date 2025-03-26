import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";
import { BsArrowLeftRight } from "react-icons/bs";
import 'react-toastify/dist/ReactToastify.css';

const Wallet = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [expandedTransactionId, setExpandedTransactionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showReceiverCard, setShowReceiverCard] = useState(false);
  const [receiverAddress, setReceiverAddress] = useState("");
  const transactionsPerPage = 7;

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        toast.error("User data not found. Please log in.");
        return;
      }
      const userData = JSON.parse(storedUser);
      setUser(userData);
      await fetchWalletData(userData.id);
      await fetchUserTransactions(userData.receiveAddress);
    };
    fetchUserData();
  }, []);

  const fetchWalletData = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-user-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: userId }),
      });
      if (!response.ok) throw new Error("Failed to fetch wallet data");
      const data = await response.json();
      setTotalBalance(data.totalBalance || 0);
    } catch (error) {
      toast.error("Error fetching wallet data: " + error.message);
    }
  };

  const fetchUserTransactions = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-user-transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverAddress: userId }),
      });
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      setTransactions(data || []);
    } catch (error) {
      toast.error("Error fetching transactions: " + error.message);
    }
  };

  const handleTransactionClick = (transactionId) => {
    setExpandedTransactionId(expandedTransactionId === transactionId ? null : transactionId);
  };

  const handleReceiveClick = () => {
    setReceiverAddress(user.receiveAddress); // Assuming user has a receiveAddress property
    setShowReceiverCard(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(receiverAddress);
    toast.success("Receiver address copied to clipboard!");
    setShowReceiverCard(false); // Close the card after copying
  };

  // Calculate the current transactions to display
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Wallet</h2>
        <p className="text-center text-gray-500">Total Balance</p>
        <h3 className="text-4xl font-semibold text-gray-800 text-center my-2">{Math.round(totalBalance)} AUSC</h3>

        <div className="flex justify-around my-4">
          <button onClick={handleReceiveClick} className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md hover:bg-green-600">
            <FiArrowDownLeft /> Receive
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-600">
            <BsArrowLeftRight /> Swap
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md hover:bg-red-600">
            <FiArrowUpRight /> Send
          </button>
        </div>

        {showReceiverCard && (
          <div className="mt-4 p-4 bg-gray-200 rounded-lg shadow-md">
            <h4 className="text-lg font-bold">Receiver Address</h4>
            <p className="text-gray-700">{receiverAddress}</p>
            <button onClick={copyToClipboard} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
              Copy Address
            </button>
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-700">Transactions</h3>
        <ul className="mt-4 space-y-3">
          {currentTransactions.length > 0 ? (
            currentTransactions.map((tx) => (
              <div key={tx._id}>
                <li
                  onClick={() => handleTransactionClick(tx._id)}
                  className={`p-4 rounded-lg shadow-md cursor-pointer flex justify-between items-center transition-all duration-300 ${tx.transactionType === "credit" ? "bg-green-100" : "bg-red-100"}`}
                >
                  <span className="text-gray-700">{new Date(tx.timestamp).toLocaleString()}</span>
                  <span className="text-gray-700">{tx.senderAddress.substring(0, 8)}...{tx.senderAddress.slice(-6)}</span>
                  <span className={tx.transactionType === "credit" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {tx.amount} AUSC
                    {tx.receiverAddress === user.receiveAddress && (
                      <span className="ml-2 text-green-600" title="Transaction Received">
                        <FiArrowDownLeft />
                      </span>
                    )}
                    {tx.receiverAddress !== user.receiveAddress && (
                      <span className="ml-2 text-red-600" title="Transaction Sent">
                        <FiArrowUpRight />
                      </span>
                    )}
                  </span>
                </li>
                {expandedTransactionId === tx._id && (
                  <div className="mt-2 p-4 bg-white rounded-lg shadow-md">
                    <h4 className="text-lg font-bold">Transaction Details</h4>
                    <p><strong>Date:</strong> {new Date(tx.timestamp).toLocaleString()}</p>
                    <p><strong>Sender Address:</strong> {tx.senderAddress}</p>
                    <p><strong>Amount:</strong>  {tx.amount} AUSC</p>
                    <p><strong>Gas Fee:</strong>  {tx.GassFee} AUSC</p>
                    <p><strong>Status:</strong> {tx.status}</p>
                    <p className="p-2 bg-gray-300  text-center rounded-lg"><strong><a href={`${process.env.REACT_APP_API_URL}/get-transaction/${tx.transaction_Hash}`} target="_blank" rel="noopener noreferrer">Transaction Hash</a></strong></p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No transactions found.</p>
          )}
        </ul>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;