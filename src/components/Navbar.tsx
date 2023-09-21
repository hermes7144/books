import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
export default function Navbar() {
  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <nav className='flex items-end gap-4 font-semibold'>
        <Link to='/' className='text-4xl text-primary'>
          동네책방
        </Link>
        <Link to='/neighborhood'>동네인증</Link>
      </nav>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/books/new' className='text-xl'>
          <BsFillPencilFill />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
}
