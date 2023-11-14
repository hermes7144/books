import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import User from './User';
import Button from './ui/Button';
import { BsSearch } from 'react-icons/bs';
export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleBook = (e: any) => {
    setSearch(e.target.value);
  };

  const handleClick = async () => {
    navigate('/books/search', { state: { search } });
  };
  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <nav className='flex items-end gap-4 font-semibold'>
        <Link to='/' className='text-4xl text-primary hidden md:block'>
          DNBS
        </Link>
        {user && <Link to='/neighborhood'>{user?.neighborhood ? user.neighborhood : '동네인증'}</Link>}
      </nav>
      <nav className='flex items-center gap-4 font-semibold'>
        <div className='hidden md:flex'>
          <input type='text' className='border' onChange={handleBook} value={search} />
          <BsSearch className='text-2xl cursor-pointer' onClick={handleClick} />
        </div>

        {user && (
          <Link to='/setting'>
            <User user={user} />
          </Link>
        )}
        {!user && <Button text='로그인' onClick={login}></Button>}
        {user && <Button text='로그아웃' onClick={logout}></Button>}
      </nav>
    </header>
  );
}
