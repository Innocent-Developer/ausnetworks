import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupbyReferall = () => {
  const [Fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // This id is set from the route path "/signup=rc?.new/:id"

  useEffect(() => {
    if (id) {
      setReferralCode(id);
    }
  }, [id]);
  console.log(referralCode)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Fullname, email, password, referallcode: referralCode }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Signup successful! Please check your email for verification.');
        console.log('Signup successful!');
        navigate('/login');
      } else {
        toast.error(data.errors ? Object.values(data.errors).join(', ') : data.msg || 'Signup failed.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundImage: "url('/signupbackground.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', backdropFilter: 'blur(5px)' }}>
      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-md w-full bg-white/50 p-8 rounded-xl shadow-xl" style={{ backdropFilter: 'blur(15px)' }}>
        <h2 className="text-center text-3xl font-bold text-gray-800">Create an Account</h2>
        <p className="text-center text-sm text-gray-600">Join us and start your mining journey!</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-md p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500"
            placeholder="Full Name"
            value={Fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="email"
            required
            className="w-full border border-gray-300 rounded-md p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            className="w-full border border-gray-300 rounded-md p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500"
            placeholder="Referral Code (Optional)"
            value={referralCode}
            readOnly
          />

          <button
            type="submit"
            className={`w-full py-3 rounded-md text-white font-bold transition duration-300 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <div>
            <p>Already have an account? <NavLink to="/login" className="text-indigo-600 hover:text-indigo-700">Login</NavLink></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupbyReferall;
