'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MdMenu } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import { CiSearch } from "react-icons/ci";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../../redux/slices/authSlice';
import logo from "../../../../public/assets/Header/wikipedia.png";

const DynamicMenu = dynamic(() => import('./Menu'), { ssr: false });

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [pageName, setPageName] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);

  // Prevent hydration mismatches
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Ensure cookies are accessed only on the client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('clientAccessToken');
      console.log('Access token from cookies in Header:', token);
      if (token && !isLoggedIn) {
        dispatch(login());
      }
    }
  }, [dispatch, isLoggedIn]);

  // Handle click outside of search & menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (menuOpen && !event.target.closest('.menu-container')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Handle logout
  const handleSignOut = () => {
    Cookies.remove('accessToken');
    Cookies.remove('clientAccessToken');
    Cookies.remove('refreshToken');
    dispatch(logout());
    console.log('User logged out');
    router.push(isAdmin ? '/pages/admin/signin' : '/pages/auth/signin');
  };

  if (!hydrated) return null;

  return (
    <div className='border-gray-400 border-b-[1px] relative'>
      <div className='flex flex-col md:flex-row py-2'>
        <div className="flex flex-row flex-1 items-center justify-between md:justify-start">
          <div onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer md:hidden">
            {menuOpen ? <FaTimes className='size-7' /> : <MdMenu className='size-7' />}
          </div>
          <div className='flex flex-row px-5 items-center'>
            <Link href='/'>
              <Image src={logo} alt="logo" width={56} height={56} />
            </Link>
            <h1 className="flex flex-col px-5 font-serif uppercase text-xl">
              WikiClone
              <span className='text-xs font-serif capitalize'>Free Encyclopedia</span>
            </h1>
          </div>
        </div>
        <div className="flex flex-row flex-2 justify-end space-x-4 items-center mt-2 md:mt-0">
          {showSearch ? (
            <input
              ref={searchRef}
              type="text"
              className='absolute top-2 right-2 text-blue-800 border border-gray-500 rounded px-2 py-1 bg-white z-10'
              placeholder="Search..."
            />
          ) : (
            <CiSearch className='cursor-pointer' onClick={() => setShowSearch(true)} />
          )}
          <Link className='text-blue-800' href='/pages/donate'>Donate</Link>
          {isLoggedIn ? (
            <button onClick={handleSignOut} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Sign Out
            </button>
          ) : (
            <>
              <Link className='text-blue-800' href='/pages/auth/signup'>Create account</Link>
              <Link className='text-blue-800' href='/pages/auth/signin'>Login</Link>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row flex-1 justify-left items-center">
        <h1 className="text-xl font-serif">{pageName}</h1>
      </div>
      {menuOpen && <div className="menu-container"><DynamicMenu /></div>}
    </div>
  );
};

export default Header;