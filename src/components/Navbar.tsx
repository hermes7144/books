import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import { useAuthContext } from '../context/AuthContext';
export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <nav className='flex items-end gap-4 font-semibold'>
        <Link to='/' className='text-4xl text-primary'>
          DNBS
        </Link>
        {user && <Link to='/neighborhood'>{user?.neighborhood ? user.neighborhood : '동네인증'}</Link>}
      </nav>
      <nav className='flex items-center gap-4 font-semibold'>
        {user && (
          <Link to='/books/new' className='text-xl'>
            <BsFillPencilFill />
          </Link>
        )}
        {!user && <button onClick={login}>Login</button>}
        {user && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  );
}
