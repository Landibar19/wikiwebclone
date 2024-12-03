'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MdMenu } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import logo from "../../../../public/assets/Header/wikipedia.png";
import Image from 'next/image';
import Link from 'next/link';
import { CiSearch } from "react-icons/ci";
import Menu from './Menu';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [pageName, setPageName] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const menuRef = useRef(null);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePageClick = (name) => {
    setPageName(name);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className=' border-gray-400 border-b-[1px]'>
      <div className='flex py-2'>
        <div className="flex flex-row flex-1 items-center">
          <div onClick={handleMenuClick} className="cursor-pointer">
            {menuOpen ? <FaTimes className='size-7' /> : <MdMenu className='size-7' />}
          </div>
          <div className='flex flex-row px-5'>
            <Link href='/' onClick={() => handlePageClick('Home')}>
              <Image src={logo} alt="logo" className="w-14 h-14" />
            </Link>
            <h1 className="flex flex-col px-5 font-serif uppercase text-xl ">
              WikiClone
              <span className='text-xs font-serif capitalize '>Free Encyclopedia</span>
            </h1>
          </div>
        </div>
        <div className="flex flex-row flex-2 justify-end space-x-4 items-center">
          {showSearch ? (
            <input
              ref={searchRef}
              type="text"
              className='text-blue-800 border border-gray-500 rounded px-2 py-1'
              placeholder="Search..."
            />
          ) : (
            <CiSearch className='cursor-pointer' onClick={handleSearchClick} />
          )}
          <Link className='text-blue-800' href='/pages/donate' onClick={() => handlePageClick('Donate')}>Donate</Link>
          <Link className='text-blue-800' href='/pages/auth/signup' onClick={() => handlePageClick('Create account')}>Create account</Link>
          <Link className='text-blue-800' href='/pages/auth/signin' onClick={() => handlePageClick('Login')}>Login</Link>
        </div>
      </div>
      <div className="flex flex-row flex-1 justify-left items-center">
        <h1 className="text-xl font-serif">{pageName}</h1>
      </div>
      {menuOpen && <Menu ref={menuRef} />}
    </div>
  );
};

export default Header;