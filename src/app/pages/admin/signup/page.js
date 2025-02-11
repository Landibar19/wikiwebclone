'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AdminSignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    setMessage('');
    setSuccess(false);

    try {
      const response = await axios.post('/api/admin/signup', {
        username,
        email,
        password,
      });
      setMessage(response.data.message);
      setSuccess(true);
      // Redirect to admin login page after a short delay
      setTimeout(() => {
        router.push('/pages/admin/signin');
      }, 3000);
    } catch (error) {
      setMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mb-5 bg-gray-100">
      <div className="absolute top-0 left-0 m-4">
        <h1 className="text-2xl font-bold mb-4">Admin Sign Up</h1>
        <form onSubmit={handleSignUp} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <p className="text-gray-500 text-xs mt-1">Your username must be unique and contain 4-20 characters.</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <p className="text-gray-500 text-xs mt-1">Your password must be at least 8 characters long.</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <p className="text-gray-500 text-xs mt-1">Please re-enter your password for confirmation.</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <p className="text-gray-500 text-xs mt-1">Please enter a valid email address.</p>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-72 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Create Account'}
            </button>
          </div>
        </form>
        {message && <p className={`mt-4 ${success ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default AdminSignUp;