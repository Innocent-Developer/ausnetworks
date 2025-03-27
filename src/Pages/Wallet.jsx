import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";
import { BsArrowLeftRight } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Compontents/loader";
const Wallet = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [expandedTransactionId, setExpandedTransactionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showReceiverCard, setShowReceiverCard] = useState(false);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState(""); // New state for amount
  const [activeTab, setActiveTab] = useState("all");
  const transactionsPerPage = 7;
  const [showSendForm, setShowSendForm] = useState(false); // New state to control send form visibility
  const [loading, setLoading] = useState(false); // New state for loading

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
      await fetchSenderTransactions(userData.senderAddress);
    };
    fetchUserData();
  }, []);

  const fetchWalletData = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/get-user-info`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: userId }),
        }
      );
      if (!response.ok) throw new Error("Failed to fetch wallet data");
      const data = await response.json();
      setTotalBalance(data.totalBalance || 0);
    } catch (error) {
      toast.error("Error fetching wallet data: " + error.message);
    }
  };

  const fetchUserTransactions = async (userId) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/get-user-transaction`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: userId }),
        }
      );
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      setTransactions(data || []);
    } catch (error) {
      toast.error("Error fetching transactions: " + error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  const fetchSenderTransactions = async (userId) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/get-sender-user-transaction`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: userId }),
        }
      );
      if (!response.ok) throw new Error("Failed to fetch sender transactions");
      const data = await response.json();
      setTransactions(data); // Set transactions to only sender transactions
    } catch (error) {
      toast.error("Error fetching sender transactions: " + error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleTransactionClick = (transactionId) => {
    setExpandedTransactionId(
      expandedTransactionId === transactionId ? null : transactionId
    );
  };

  const handleReceiveClick = () => {
    setReceiverAddress(user.receiveAddress);
    setShowReceiverCard((prev) => !prev); // Toggle receiver card visibility
  };
  
  const handleReceiveTransactionClick = () => {
    setActiveTab("receivetransaction");
    fetchUserTransactions(user.receiveAddress); // Fetch only user transactions
  };
  
  const handlesenderTransactionClick = () => {
    setActiveTab("sendtransaction");
    fetchSenderTransactions(user.senderAddress); // Fetch only sender transactions
  };
  
  const handleSendClick = () => {
    setShowSendForm((prev) => !prev); // Toggle send form visibility
  };

  const handleSend = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/send-coin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderAddress: user.senderAddress,
            receiverAddress,
            amount,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to send coins");
      const data = await response.json();
      toast.success(`Successfully sent ${amount} AUSC to ${receiverAddress}`);
      // Optionally refresh transactions after sending
      await fetchUserTransactions(user.receiveAddress);
      await fetchSenderTransactions(user.senderAddress);
    } catch (error) {
      toast.error("Error sending coins: " + error.message);
    } finally {
      // Reset form after sending
      setReceiverAddress("");
      setAmount("");
      setShowSendForm(false);
    }
  };

  const refreshWallet = async () => {
    if (user) {
      await fetchWalletData(user.id);
      await fetchUserTransactions(user.receiveAddress);
      await fetchSenderTransactions(user.senderAddress);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(receiverAddress);
    toast.success("Receiver address copied to clipboard!");
    setShowReceiverCard(false);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (activeTab === "send") return tx.transactionType === "debit";
    if (activeTab === "receive") return tx.transactionType === "credit";
    return true;
  });

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Wallet</h2>
        <p className="text-center text-gray-500">Total Balance</p>
        <h3 className="text-4xl font-semibold text-gray-800 text-center my-2">
          {Math.round(totalBalance)} AUSC
        </h3>

        <div className="flex justify-around my-4">
          <button
            onClick={handleReceiveClick}
            className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md hover:bg-green-600"
          >
            <FiArrowDownLeft /> Receive
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-600">
            <BsArrowLeftRight /> Swap
          </button>
          <button
            onClick={handleSendClick}
            className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md hover:bg-red-600"
          >
            <FiArrowUpRight /> Send
          </button>
          <button
            onClick={refreshWallet}
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md hover:bg-yellow-600"
          >
             Refresh
          </button>
        </div>

        {showSendForm && (
          <form className="mt-4 p-4 bg-gray-200 rounded-lg shadow-md" onSubmit={handleSend}>
            <h4 className="text-lg font-bold">Send Coins</h4>
            <input
              type="text"
              placeholder="Receiver Address"
              value={receiverAddress}
              required
              onChange={(e) => setReceiverAddress(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Send
            </button>
          </form>
        )}

        {/* Tabs for filtering transactions */}
        <div className="flex justify-around my-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-2 px-4 rounded-lg ${
              activeTab === "all" ? "bg-gray-300" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={ handlesenderTransactionClick}
            className={`py-2 px-4 rounded-lg ${
              activeTab === "send" ? "bg-gray-300" : "bg-gray-200"
            }`}
          >
            <FiArrowUpRight className="inline-block mr-2" /> Send
          </button>
          <button
             onClick={handleReceiveTransactionClick}
            className={`py-2 px-4 rounded-lg ${
              activeTab === "receive" ? "bg-gray-300" : "bg-gray-200"
            }`}
          >
            <FiArrowDownLeft className="inline-block mr-2" /> Receive Transaction
          </button>
        </div>

        {showReceiverCard && (
          <div className="mt-4 p-4 bg-gray-200 rounded-lg shadow-md">
            <h4 className="text-lg font-bold">Receiver Address</h4>
            <p className="text-gray-700">{receiverAddress}</p>
            <button
              onClick={copyToClipboard}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Copy Address
            </button>
          </div>
        )}

        {loading ? ( // Show loader while fetching transactions
          <div className="flex justify-center items-center mt-10 px-10 ">
            <Loader />
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-700">Transactions</h3>
            <ul className="mt-4 space-y-3">
              {currentTransactions.length > 0 ? (
                currentTransactions.map((tx) => (
                  <div key={tx._id}>
                    <li
                      onClick={() => handleTransactionClick(tx._id)}
                      className={`p-4 rounded-lg shadow-md cursor-pointer flex justify-between items-center transition-all duration-300 ${
                        tx.transactionType === "credit"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      <span className="text-gray-700">
                        {new Date(tx.timestamp).toLocaleString()}
                      </span>
                      <span className="text-gray-700">
                        {tx.senderAddress.substring(0, 8)}...
                        {tx.senderAddress.slice(-6)}
                      </span>
                      <span
                        className={
                          tx.transactionType === "credit"
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {tx.amount} AUSC
                        {tx.receiverAddress === user.receiveAddress ? (
                          <span
                            className="ml-2 text-green-600"
                            title="Transaction Received"
                          >
                            <FiArrowDownLeft />
                          </span>
                        ) : (
                          <span
                            className="ml-2 text-red-600"
                            title="Transaction Sent"
                          >
                            <FiArrowUpRight />
                          </span>
                        )}
                      </span>
                    </li>
                    {expandedTransactionId === tx._id && (
                      <div className="mt-2 p-4 bg-white rounded-lg shadow-md">
                        <h4 className="text-lg font-bold">Transaction Details</h4>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(tx.timestamp).toLocaleString()}
                        </p>
                        <p>
                          <strong>Sender Address:</strong> {tx.senderAddress}
                        </p>
                        <p>
                          <strong>Amount:</strong> {tx.amount} AUSC
                        </p>
                        <p>
                          <strong>Gas Fee:</strong> {tx.GassFee} AUSC
                        </p>
                        <p>
                          <strong>Status:</strong> {tx.status}
                        </p>
                        <p className="p-2 bg-gray-300  text-center rounded-lg">
                          <strong>
                            <a
                              href={`${process.env.REACT_APP_API_URL}/get-transaction/${tx.transaction_Hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Transaction Hash
                            </a>
                          </strong>
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No transactions found.</p>
              )}
            </ul>
          </>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
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
