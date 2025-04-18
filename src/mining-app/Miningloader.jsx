import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MiLoaders from "./miLoader"; // Make sure the filename and export are correct
import { toast } from "react-toastify";

const MiningDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [lastMined, setLastMined] = useState(null);
  const [isMining, setIsMining] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("User ID:", parsedUser.id);
          setUserData(parsedUser);
          setLastMined(parsedUser.lastMined || null);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (lastMined) {
      const interval = setInterval(() => {
        const lastMinedTime = new Date(lastMined).getTime();
        const currentTime = new Date().getTime();
        const diff = 24 * 60 * 60 * 1000 - (currentTime - lastMinedTime);

        if (diff <= 0) {
          setTimeLeft(null);
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lastMined]);

  const canMine = () => {
    if (!lastMined) return true;
    const lastMinedTime = new Date(lastMined).getTime();
    const currentTime = new Date().getTime();
    return currentTime - lastMinedTime >= 24 * 60 * 60 * 1000;
  };

  const mining = async () => {
    if (!userData || isMining || !canMine()) return;

    setIsMining(true);

    try {
      const response = await fetch(
        "https://minning-app.onrender.com/mining-coin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: userData.id }),
        }
      );

      const data = await response.json();

      if (data.success) {
        const updatedUserData = {
          ...userData,
          totalBalance: data.userBalance,
          lastMined: new Date().toISOString(),
        };

        localStorage.setItem("user", JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
        setLastMined(updatedUserData.lastMined);

        await fetch("https://minning-app.onrender.com/update-last-mined", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userData.id }),
        });

        toast.success("Mining successful!");
      } else {
        toast.error("Mining failed!");
      }
    } catch (error) {
      console.error("Error during mining:", error);
      toast.error("Error during mining!");
    } finally {
      setIsMining(false);
    }
  };
  const handleCopyInviteCode = () => {
    const inviteCode = userData?.inviteCode || "No invite code available";
    const inviteCodelink=`https://aus-networks.vercel.app/signup-rc-new/${inviteCode}`

    navigator.clipboard.writeText(inviteCodelink)
      .then(() => {
        toast.success(`Invite code ${inviteCodelink} copied to clipboard!`);
      })
      .catch((error) => {
        console.error("Failed to copy invite code:", error);
        toast.error("Failed to copy invite code!");
      });
  };

  if (loading) {
    return <MiLoaders />;
  }

  return (
    <div className="p-4 text-white rounded-lg border border-gray-300 shadow-md">
      <h1 className="text-2xl mb-4">, {userData?.username}</h1>
      <MiLoaders />;
      <div className="flex my-10 justify-between container">
        <button
          onClick={mining}
          disabled={!canMine() || isMining}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-2 rounded-full disabled:opacity-50"
        >
          {isMining
            ? "Mining..."
            : canMine()
            ? "Start Mining"
            : "Already mined today"}
        </button>
        <button
          onClick={handleCopyInviteCode}
          className="mt-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-full"
        >
          Copy Invite Code
        </button>
      </div>
      {timeLeft && (
        <div className="text-lg mb-4 text-black animate-time-left rounded-lg bg-gray-100 p-3 border border-gray-200">
          Time left until next mining: {timeLeft}
        </div>
      )}
    </div>
  );
};

export default MiningDashboard;
