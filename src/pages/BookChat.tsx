import React from 'react';
import Messages from '../components/Messages';
import Input from '../components/Input';
import { useChatContext } from '../context/ChatContext';
import { BsChevronLeft } from 'react-icons/bs';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function BookChat() {
  const { data } = useChatContext();
  const navigate = useNavigate();

  const {
    state: {
      book: { cover, title, price },
    },
  } = useLocation();
  return (
    <div className='w-full p-5'>
      <div className='flex items-center gap-4 pb-4'>
        <BsChevronLeft className='cursor-pointer text-xl' onClick={() => navigate(-1)} />
        <span className='text-2xl font-medium'>{data.otherUser.displayName}</span>
      </div>

      <div className='border-t border-b mb-1'>
        <div className='flex p-2 gap-2'>
          <img className='w-15 h-20' src={cover} alt='cover' />
          <div className='flex flex-col'>
            <span className='text-lg'>{title}</span>
            <span>{price}원</span>
          </div>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
