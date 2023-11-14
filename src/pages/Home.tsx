import React from 'react';
import Allbooks from './Allbooks';
import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import { useAuthContext } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuthContext();

  return (
    <>
      <Allbooks />
      {user && (
        <Link to='/books/new' className='fixed bottom-0 right-0 m-8 bg-primary rounded-full p-4 cursor-pointer text-white'>
          <BsFillPencilFill />
        </Link>
      )}
    </>
  );
}
