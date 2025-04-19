import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const LoginMining = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('mininguser');
    const tokenExpiry = localStorage.getItem('miningtokenExpiry');
    
    if (token && tokenExpiry) {
      // Check if token has expired
      if (new Date().getTime() > parseInt(tokenExpiry)) {
        // Token expired, clear storage and redirect to login
        localStorage.clear();
        toast.info('Session expired. Please login again.');
      } else {
        // Token valid, redirect to dashboard
        navigate('/web-app/mining/mobile-app');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      toast.success("Login successful!");

      if (response.ok) {
        // Calculate token expiry (7 days from now)
        const expiryTime = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
        
        // Store user data, token and expiry time in localStorage
        localStorage.setItem('mininguser', JSON.stringify(data.user));
        localStorage.setItem('miningtoken', data.token);
        localStorage.setItem('miningtokenExpiry', expiryTime.toString());
        navigate(`/web-app/mining/mobile-app`);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <span className="input-span">
          <label htmlFor="email" className="label">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </span>
        <span className="input-span">
          <label htmlFor="password" className="label">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </span>
        <input 
          className="submit" 
          type="submit" 
          value={loading ? "Signing in..." : "Sign in"}
          disabled={loading}
        />
        <span className="span">
          Don't have an account? <NavLink to="/signup">Sign up</NavLink>
        </span>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #1a202c, #2d3748);
  padding: 1rem;
  
  .form {
    --bg-light: #efefef;
    --bg-dark: #707070;
    --clr: #58bc82;
    --clr-alpha: #9c9c9c60;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
    background: #2d3748;
    padding: clamp(1rem, 5vw, 2rem);
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    @media (max-width: 480px) {
      max-width: 100%;
      border-radius: 0.5rem;
    }
  }

  .form .input-span {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form input[type="email"],
  .form input[type="password"] {
    border-radius: 0.5rem;
    padding: clamp(0.75rem, 3vw, 1rem) clamp(0.5rem, 2vw, 0.75rem);
    width: 100%;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--clr-alpha);
    outline: 2px solid var(--bg-dark);
    color: var(--bg-light);
    font-size: clamp(14px, 2vw, 16px);

    @media (max-width: 480px) {
      padding: 0.75rem 0.5rem;
    }
  }

  .form input[type="email"]:focus,
  .form input[type="password"]:focus {
    outline: 2px solid var(--clr);
  }

  .label {
    align-self: flex-start;
    color: var(--clr);
    font-weight: 600;
    font-size: clamp(14px, 2vw, 16px);
  }

  .form .submit {
    padding: clamp(0.75rem, 3vw, 1rem) clamp(0.5rem, 2vw, 0.75rem);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 3rem;
    background-color: var(--bg-dark);
    color: var(--bg-light);
    border: none;
    cursor: pointer;
    transition: all 300ms;
    font-weight: 600;
    font-size: clamp(14px, 2vw, 16px);

    @media (max-width: 480px) {
      padding: 0.75rem 0.5rem;
    }
  }

  .form .submit:hover:not(:disabled) {
    background-color: var(--clr);
    color: var(--bg-dark);
    transform: scale(1.02);
  }

  .form .submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .span {
    text-decoration: none;
    color: var(--bg-light);
    font-size: clamp(14px, 2vw, 16px);
    text-align: center;
  }

  .span a {
    color: var(--clr);
    text-decoration: none;
    margin-left: 0.25rem;
  }

  .span a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  @media (max-height: 600px) {
    padding: 1rem 0;
    min-height: auto;
  }
`;

export default LoginMining;
