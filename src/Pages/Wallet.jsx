import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";
import { BsArrowLeftRight } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Compontents/loader";
import { QRCodeCanvas } from "qrcode.react"; // Import QRCodeCanvas component

const Wallet = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [expandedTransactionId, setExpandedTransactionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState(""); // New state for amount
  const [activeTab, setActiveTab] = useState("all");
  const transactionsPerPage = 7;
  const [loading, setLoading] = useState(false); // New state for loading
  const [showSendPopup, setShowSendPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
      setTotalBalance(data.availableBalance || 0);
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
      // Remove GassFee from the data
      const filteredData = data.map(({ GassFee, ...rest }) => rest);
      setTransactions(filteredData); // Set transactions to only sender transactions
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
    // setShowReceiverCard((prev) => !prev); // Toggle receiver card visibility
    setShowPopup(true);
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
    setShowSendPopup(true);
    // Add scan QR code functionality here
    setReceiverAddress("")
    setAmount("")
    toast.info("Scan QR code functionality coming soon!");
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

      toast.success(data.transactionResult.message);
      //  toaster  
      if(data.transactionResult.message ==="Transfer completed successfully and notifications sent"){
        toast.success(`Successfully sent ${amount} AUSC to ${receiverAddress}`);
        await fetchUserTransactions(user.receiveAddress);
        await fetchSenderTransactions(user.senderAddress);
        window.location.reload(); // Refresh the page 
      } else {
        toast.error("Error sending coins: " + (data.transactionResult ? data.transactionResult.message : "Unknown error"));
      }

    } catch (error) {
      toast.error("Error sending coins: " + error.message);
    } finally {
      // Reset form after sending
      setReceiverAddress("");
      setAmount("");
      setShowSendPopup(false);
    }
  };

  const refreshWallet = async () => {
    if (user) {
      await fetchWalletData(user.id);
      toast.success("Wallet refreshed successfully!");
      await fetchUserTransactions(user.receiveAddress);
      await fetchSenderTransactions(user.senderAddress);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(receiverAddress);
    toast.success("Receiver address copied to clipboard!");
    setShowPopup(false);
  };
  const popUp = () => {
    toast.info("Coming Soon!");
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

  const formatBalance = (balance) => {
    if (balance >= 1000000000) {
      return (balance / 1000000000).toFixed(1) + " B";
    } else if (balance >= 1000000) {
      return (balance / 1000000).toFixed(1) + " M";
    } else if (balance >= 1000) {
      return (balance / 1000).toFixed(1) + " K";
    } else {
      return balance.toString();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md md:max-w-2xl lg-max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Wallet</h2>
        <p className="text-center text-gray-500">Total Balance</p>
        <h3 className="text-4xl font-semibold text-gray-800 text-center my-2">
          {formatBalance(Math.round(totalBalance))} <strong className="text-green-600">AUSC</strong> 
        </h3>

        <div className="grid grid-cols-2 gap-4 my-4">
          <button
            onClick={handleSendClick}
            className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md hover:bg-red-700 w-full"
          >
            <FiArrowUpRight /> Send
          </button>
          <button
            onClick={handleReceiveClick}
            className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md hover:bg-green-700 w-full"
          >
            <FiArrowDownLeft /> Receive
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 w-full"
            onClick={popUp}
          >
            <BsArrowLeftRight /> Swap
          </button>
          <button
            onClick={popUp} // Assuming a placeholder function for now
            className="bg-purple-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md hover:bg-purple-700 w-full"
          >
            Coin Stack
          </button>
          <button
            onClick={refreshWallet}
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md hover:bg-yellow-700 w-full"
          >
            Refresh
          </button>
        </div>

        {showSendPopup && (

          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-96 border border-gray-300">
              <h4 className="text-xl font-semibold text-indigo-700">
                Send Coins
              </h4>
              <form className="mt-4 space-y-3" onSubmit={handleSend}>
                <input
                  type="text"
                  placeholder="Receiver Address"
                  value={receiverAddress}
                  required
                  onChange={(e) => setReceiverAddress(e.target.value)}
                  className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  required
                  onChange={(e) => setAmount(e.target.value)}
                  className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-5 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSendPopup(false)}
                    className="bg-gray-400 text-white py-2 px-5 rounded-full shadow-lg hover:bg-gray-500 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setAmount((totalBalance * 0.25 * 0.9).toFixed(2))}
                    className="bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                  >
                    25%
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmount((totalBalance * 0.50 * 0.9).toFixed(2))}
                    className="bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                  >
                    50%
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmount((totalBalance * 0.75 * 0.9).toFixed(2))}
                    className="bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                  >
                    75%
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmount((totalBalance * 0.9).toFixed(2))}
                    className="bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                  >
                    100%
                  </button>
                </div>
              </form>
            </div>
          </div>
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
            onClick={handlesenderTransactionClick}
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
            <FiArrowDownLeft className="inline-block mr-2" /> Receive
          </button>
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h4 className="text-lg font-bold">Receiver Address</h4>
              <p className="text-gray-700 mt-2">{receiverAddress}</p>
              <div className="mt-4 flex justify-center">
                <QRCodeCanvas value={receiverAddress} /> {/* Display QR code */}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Copy Address
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-300 text-black py-2 px-4 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
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
                        {tx.amount >= 1000000000
                          ? (tx.amount / 1000000000).toFixed(1) + " B"
                          : tx.amount >= 1000000
                          ? (tx.amount / 1000000).toFixed(1) + " M"
                          : tx.amount >= 1000
                          ? (tx.amount / 1000).toFixed(1) + " K"
                          : tx.amount} 
                        <strong className="text-green-600 ml-2">AUSC</strong>
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
                        <h4 className="text-lg font-bold">
                          Transaction Details
                        </h4>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(tx.timestamp).toLocaleString()}
                        </p>
                        <p>
                          <strong>Sender Address:</strong> {tx.senderAddress}
                        </p>
                        <p>
                          <strong className="text-green-600 mr-2">Amount:</strong> 
                          {tx.amount >= 1000000000
                            ? (tx.amount / 1000000000).toFixed(1) + " B"
                            : tx.amount >= 1000000
                            ? (tx.amount / 1000000).toFixed(1) + " M"
                            : tx.amount >= 10000
                            ? (tx.amount / 1000).toFixed(1) + " K"
                            : tx.amount} 
                          <strong className="ml-2">AUSC</strong>
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
