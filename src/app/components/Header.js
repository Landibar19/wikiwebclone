'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MdMenu } from "react-icons/md";
import logo from "../../../public/assets/Header/wikipedia.png";
import Image from 'next/image';
import Link from 'next/link';
import { CiSearch } from "react-icons/ci";
import { useRouter } from 'next/navigation';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [pageName, setPageName] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in by checking localStorage or cookies
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearchClick = () => {
    setShowSearch(true);
    searchRef.current.focus(); // Add this line to focus on the search input when it appears
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    // Clear the token from localStorage or cookies
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/auth/signin');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <MdMenu className="text-2xl mr-4" />
        <Link href="/">
          <Image src={logo} alt="Wikipedia Logo" width={40} height={40} />
        </Link>
        <h1 className="ml-4 text-xl">{pageName}</h1>
      </div>
      <div className="flex items-center">
        {showSearch && (
          <input
            ref={searchRef}
            type="text"
            placeholder="Search..."
            className="p-2 rounded border border-gray-300"
          />
        )}
        <CiSearch className="text-2xl ml-4 cursor-pointer" onClick={handleSearchClick} />
        {isLoggedIn ? (
          <button onClick={handleSignOut} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Sign Out
          </button>
        ) : (
          <Link href="/auth/signin">
            <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;