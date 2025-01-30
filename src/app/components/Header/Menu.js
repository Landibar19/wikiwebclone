'use client';
import React from 'react';
import Link from 'next/link';

const Menu = () => {
  return (
    <div className="absolute top-20 w-40 h-full bg-white flex flex-col items-center justify-center shadow-lg z-50">
      <div className='absolute top-3 bg-white w-40'>
        <div className='border-b border-gray-400'>
          Main menu
        </div>
        <ul>
          <li className='p-2'><Link href='/'>Main Page</Link></li>
          <li className='p-2'><Link href='/pages/content'>Content</Link></li>
          <li className='p-2'><Link href='/page3'>Contact Us</Link></li>
          <li className='p-2'><Link href='/page3'>Help</Link></li>
          <li className='p-2'><Link href='/page3'>Community</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;