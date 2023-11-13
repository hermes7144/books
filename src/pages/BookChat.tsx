import React from 'react';
import Messages from '../components/Messages';
import Input from '../components/Input';
import { useChatContext } from '../context/ChatContext';
import { BsChevronLeft } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BookChat() {
  const { data } = useChatContext();
  const navigate = useNavigate();

  const {
    state: {
      book: { cover, title, price },
    },
  } = useLocation();
  return (
    <div>
      <div className='flex items-center gap-4 border-b py-3'>
        <BsChevronLeft className='cursor-pointer text-2xl' onClick={() => navigate(-1)} />
        <span className='text-xl font-bold'>{data.otherUser.displayName}</span>
      </div>

      <div className='border-t border-b mb-1'>
        <div className='flex p-2 gap-2'>
          <img className='w-15 h-20' src={cover} alt='cover' />
          <div className='flex flex-col'>
            <span className='text-lg line-clamp-2'>{title}</span>
            <span>{price}원</span>
          </div>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
