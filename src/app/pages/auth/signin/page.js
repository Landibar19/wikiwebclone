'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { handleLogin, handleRequestResetPassword } from '@/services/auth/users/signinUtils';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-0 left-0 m-4">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <form onSubmit={(event) => handleLogin(event, username, password, keepLoggedIn, setMessage, dispatch, router)} className="bg-transparent p-6 rounded w-80">
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
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700">Keep me logged in</span>
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-72 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
        <div className='flex flex-col items-center justify-center text-blue-800 mt-4'>
          <h2><Link href='/' className='hover:underline'>Help with login</Link></h2>
          <h2><button onClick={() => setShowResetForm(!showResetForm)} className='hover:underline'>Forgot password</button></h2>
        </div>
        {showResetForm && (
          <form onSubmit={(event) => handleRequestResetPassword(event, email, setMessage)} className="bg-transparent p-6 rounded w-80 mt-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-72 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              >
                Request Reset
              </button>
            </div>
          </form>
        )}
        <Link href='/pages/auth/signup' className='flex items-center justify-center mt-7 text-blue-800 hover:underline'>
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </div>
  );
};

export default Signin;