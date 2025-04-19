import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Mnavbar from "./Mnavbar";

const ReferralList = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReferrals = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("mininguser"));
        if (!userData || !userData.inviteCode) {
          toast.error("No invite code found");
          return;
        }

        const response = await fetch(
          "https://minning-app.onrender.com/get-referral-list",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ inviteCode: userData.inviteCode }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setReferrals(data.users);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch referrals");
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  return (
    <StyledWrapper>
      <div className="container">
        <Mnavbar />
        <h2>My Referrals : {referrals.length}</h2>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : referrals.length > 0 ? (
          <div className="referral-list">
            {referrals.map((user, index) => (
              <div key={index} className="referral-card">
                <div className="user-info">
                  <p>
                    <strong>Name:</strong> {user.Fullname}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {user.email
                      ? `${user.email.substring(0, 3)}${"*".repeat(
                          user.email.indexOf("@") - 3
                        )}${user.email.substring(user.email.indexOf("@"))}`
                      : ""}
                  </p>
                  <p>
                    <strong>kycStatus:</strong> {user.kycStatuys}{" "}
                    {user.kycStatuys?.trim().toLowerCase() === "verifed" && (
                      <span style={{ color: "green", fontSize: "1.2rem" }}>
                        ✅
                      </span>
                    )}
                  </p>
                  <p>
                    <strong>Last Mining:</strong> {user.lastMined}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-referrals">No referrals found</div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  h2 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 30px;
    font-size: 2.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .loading {
    text-align: center;
    padding: 20px;
    font-size: 18px;
    color: #3498db;
  }

  .referral-list {
    display: grid;
    gap: 25px;
    padding: 20px;
  }

  .referral-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }
  }

  .user-info {
    p {
      margin: 12px 0;
      color: #34495e;
      font-size: 1.1rem;
      padding: 8px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      strong {
        color: #2980b9;
        font-weight: 600;
        margin-right: 10px;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .no-referrals {
    text-align: center;
    padding: 60px;
    color: #7f8c8d;
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    margin: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  }
`;

export default ReferralList;
