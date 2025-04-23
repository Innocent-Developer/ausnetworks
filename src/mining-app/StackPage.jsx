import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const StackCoin = () => {
  const [form, setForm] = useState({
    userId: '',
    amount: '',
    duration: '',
    durationType: 'month',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post('https://minning-app.onrender.com/stake', form);
      setMessage(response.data.message);
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-md mx-auto p-6 bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-3xl mt-10"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">💎 Stake Tokens</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {['userId', 'amount', 'duration'].map((field) => (
          <div key={field} className="relative">
            <input
              type={field === 'amount' || field === 'duration' ? 'number' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder=" "
            />
            <label
              className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
          </div>
        ))}
        <div className="relative">
          <select
            name="durationType"
            className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={form.durationType}
            onChange={handleChange}
          >
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          <label className="absolute left-4 top-2 text-sm text-gray-500">Duration Type</label>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition shadow-md"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Staking...
            </>
          ) : (
            'Stake Now'
          )}
        </button>
      </form>
      {message && <p className="mt-6 text-green-600 text-center">{message}</p>}
      {error && <p className="mt-6 text-red-600 text-center">{error}</p>}
    </motion.div>
  );
};

export default StackCoin;
