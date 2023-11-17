import React, { useState } from 'react';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { BiChat, BiSolidChat } from 'react-icons/bi';
import { FaRegUser, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const [activeNav, setActiveNav] = useState(1);
  const location = useLocation();

  const link = location.pathname === '/' || location.pathname === '/setting';

  return (
    <>
      {link && (
        <nav className='flex md:hidden fixed bottom-0 left-0 right-0 h-14 items-center justify-between border-t border-gray-200 bg-white text-2xl text-gray-500'>
          <Link to='/' className='w-1/3 flex flex-col items-center  gap-1 cursor-pointer' onClick={() => setActiveNav(1)}>
            {activeNav === 1 ? <GoHomeFill /> : <GoHome />}
            <span className='text-sm'>홈</span>
          </Link>
          <Link to='/chats' className='w-1/3 flex flex-col items-center gap-1 cursor-pointer' onClick={() => setActiveNav(2)}>
            {activeNav === 2 ? <BiSolidChat /> : <BiChat />}
            <span className='text-sm'>채팅</span>
          </Link>
          <Link to='/setting' className='w-1/3 flex flex-col items-center gap-1 cursor-pointer' onClick={() => setActiveNav(3)}>
            {activeNav === 3 ? <FaUser /> : <FaRegUser />}
            <span className='text-sm'>내 정보</span>
          </Link>
        </nav>
      )}
    </>
  );
}
