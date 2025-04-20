import React, { useState, useEffect } from "react";
import Mnavbar from "./Mnavbar";
import Miningloader from "./Miningloader";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Miningapp = () => {
  const navigate = useNavigate();
  const [showNews, setShowNews] = useState(true);
  const [userData, setUserData] = useState({
    Fullname: "Guest", 
    totalBalance: 0,
    availableBalance: 0,
    totalReferal: 0,
    pendingBalance: "NA"
  });

  const fetchUserData = async () => {
    try {
      const storedUser = localStorage.getItem("mininguser");
      const token = localStorage.getItem("miningtoken");
      const tokenExpiry = localStorage.getItem("miningtokenExpiry");

      if (!storedUser || !token || !tokenExpiry) {
        navigate('/login-mining');
        return;
      }

      if (new Date().getTime() > parseInt(tokenExpiry)) {
        localStorage.clear();
        navigate('/login-mining');
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser._id || parsedUser.id || parsedUser.userId;

      if (!userId) {
        toast.error("User ID is missing.");
        navigate('/login-mining');
        return;
      }

      console.log("Sending user ID to backend:", userId);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-user-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ _id: userId })
      });

      if (response.ok) {
        const latestData = await response.json();

        const updatedUser = {
          ...parsedUser,
          ...latestData
        };
        localStorage.setItem("mininguser", JSON.stringify(updatedUser));

        setUserData({
          Fullname: latestData.name || "Guest",
          totalBalance: parseFloat(latestData.totalBalance) || 0,
          availableBalance: parseFloat(latestData.availableBalance) || 0,
          totalReferal: parseFloat(latestData.totalReferal) || 0,
          pendingBalance: latestData.pendingBalance || "NA"
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to fetch user data');

        setUserData({
          Fullname: parsedUser.Fullname || parsedUser.username || "Guest",
          totalBalance: parseFloat(parsedUser.totalBalance) || 0,
          availableBalance: parseFloat(parsedUser.availableBalance) || 0,
          totalReferal: parseFloat(parsedUser.totalReferal) || 0,
          pendingBalance: parsedUser.pendingBalance || "NA"
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error('Failed to update user data');

      try {
        const parsedUser = JSON.parse(localStorage.getItem("mininguser"));
        if (parsedUser) {
          setUserData({
            Fullname: parsedUser.Fullname || parsedUser.username || "Guest",
            totalBalance: parseFloat(parsedUser.totalBalance) || 0,
            availableBalance: parseFloat(parsedUser.availableBalance) || 0,
            totalReferal: parseFloat(parsedUser.totalReferal) || 0,
            pendingBalance: parsedUser.pendingBalance || "NA"
          });
        }
      } catch (e) {
        console.error("Error parsing stored user data:", e);
        toast.error('Could not load user data');
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    const intervalId = setInterval(fetchUserData, 30000);
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <StyledWrapper>
      <div className="container">
      <Mnavbar />
        <div className="welcome-text">
          <h1>Welcome, {userData.Fullname}!</h1>
        </div>
        <div className="stats-container">
          <div className="stat-card">
            <h2>Total Balance</h2>
            <p>{formatNumber(userData.totalBalance)}</p>
          </div>
          <div className="stat-card">
            <h2>Available Balance</h2>
            <p>{formatNumber(userData.availableBalance)}</p>
          </div>
          <div className="stat-card">
            <h2>Total Referral</h2>
            <p>{userData.totalReferal}</p>
          </div>
          <div className="stat-card">
            <h2>Price</h2>
            <p>${userData.pendingBalance}</p>
          </div>
        </div>

        {showNews && (
          <div className="news-container">
            <div className="news-card">
              <h2>
                Latest News
                <button onClick={() => setShowNews(false)}>✖</button>
              </h2>
              <p>Stay updated with the latest news in the mining industry!</p>
              <ul>
                <li>New mining regulations announced.</li>
                <li>Market trends show an increase in cryptocurrency value.</li>
                <li>Innovative mining technologies are on the rise.</li>
              </ul>
            </div>
          </div>
        )}

        <Miningloader />
      </div>
    </StyledWrapper>
  );
};

const formatNumber = (num) => {
  return num >= 1e9 ? (num / 1e9).toFixed(1) + "B" :
         num >= 1e6 ? (num / 1e6).toFixed(1) + "M" :
         num >= 1e3 ? (num / 1e3).toFixed(1) + "K" :
         num.toFixed(0);
};

const StyledWrapper = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  width: 100%;

  .container {
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    padding: 0 15px;
  }

  .welcome-text {
    @media (max-width: 768px) {
  .welcome-text {
    text-align: center;
    margin: 10px 0;
    
    h1 {
      font-size: clamp(1.5rem, 3vw, 2rem);
    }
  }
}

@media (max-width: 480px) {
  .welcome-text {
    text-align: center;
    margin: 5px 0;
    
    h1 {
      font-size: clamp(1.2rem, 2.5vw, 1.5rem);
    }
  }
}
    margin: 20px 0;
    
    h1 {
      color: #2c3e50;
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    }
  }

  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px 0;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    padding: clamp(15px, 3vw, 25px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    border: 1px solid rgba(255,255,255,0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 15px 30px rgba(0,0,0,0.15);
    }

    h2 {
      color: #2980b9;
      font-size: clamp(1rem, 2.5vw, 1.2rem);
      font-weight: 600;
      margin-bottom: 10px;
    }

    p {
      color: #34495e;
      font-size: clamp(1.2rem, 3vw, 1.5rem);
      font-weight: 500;
      word-break: break-word;
    }
  }

  .news-container {
    padding: 10px 0;
  }

  .news-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    padding: clamp(15px, 3vw, 25px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    margin: 20px 0;
    border: 1px solid rgba(255,255,255,0.2);

    h2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #2980b9;
      font-size: clamp(1.1rem, 2.5vw, 1.2rem);
      margin-bottom: 15px;

      button {
        color: #e74c3c;
        background: none;
        border: none;
        font-size: clamp(1.1rem, 2.5vw, 1.2rem);
        cursor: pointer;
        padding: 5px;
        
        &:hover {
          opacity: 0.8;
        }
      }
    }

    p {
      color: #34495e;
      font-size: clamp(1rem, 2vw, 1.1rem);
      margin-bottom: 15px;
    }

    ul {
      list-style-type: disc;
      padding-left: 20px;
      
      li {
        color: #34495e;
        margin: 8px 0;
        font-size: clamp(0.9rem, 1.8vw, 1rem);
      }
    }
  }

  @media (max-width: 768px) {
    padding: 10px;

    .container {
      width: 100%;
      padding: 0 10px;
    }

    .stats-container {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      padding: 15px 0;
    }
  }

  @media (max-width: 480px) {
    .stats-container {
      grid-template-columns: repeat(2, 1fr); /* ✅ Two boxes in one row */
      gap: 10px;
    }

    .stat-card {
      text-align: center;
    }
  }
`;

export default Miningapp;
