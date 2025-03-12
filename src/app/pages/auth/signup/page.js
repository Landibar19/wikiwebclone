'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Oval } from 'react-loader-spinner';
import { signUp } from '@/services/auth/users/signupUtils';

const SignUp = () => {
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

    await signUp(username, email, password, setMessage, setSuccess, setLoading, router);
  };

  return (
    <div className="relative mb-5 bg-gray-100">
      <div className="absolute top-0 left-0 m-4">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
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
              {loading ? (
                <div className="flex items-center justify-center">
                  <Oval
                    height={20}
                    width={20}
                    color="#ffffff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#f3f3f3"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                  <span className="ml-2">Signing Up...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
        {message && <p className={`mt-4 ${success ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        <div className='flex flex-col items-center justify-center text-blue-800 mt-4'>
          <h2><Link href='/' className='hover:underline'>Help with login</Link></h2>
          <h2><Link href='/' className='hover:underline'>Forgot password</Link></h2>
        </div>
        <Link href='/pages/auth/signin' className='flex items-center justify-center mt-2 text-blue-800 hover:underline'>
          Already have an account? Sign in
        </Link>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default SignUp;