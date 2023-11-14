import React from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ text }) {
  const navigate = useNavigate();

  return (
    <div className='flex items-center gap-4 border-b py-3'>
      <BsChevronLeft className='cursor-pointer text-2xl' onClick={() => navigate(-1)} />
      <span className='text-xl font-bold'>{text}</span>
    </div>
  );
}
