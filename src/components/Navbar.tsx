import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import { login, logout, onUserStateChange } from '../api/firebase';
import { User } from 'firebase/auth';
export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onUserStateChange((user: User) => {
      setUser(user);
    });
  }, []);
  const handleLogin = () => {
    login().then((user) => {
      setUser(user);
    });
  };

  const handleLogout = () => {
    logout().then(setUser);
  };

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
        {!user && <button onClick={handleLogin}>Login</button>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}
