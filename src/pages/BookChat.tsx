import React from 'react';
import Messages from '../components/Messages';
import Input from '../components/Input';
import { useChatContext } from '../context/ChatContext';
import { useLocation } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';

export default function BookChat() {
  const { data } = useChatContext();

  const {
    state: {
      book: { cover, title, price },
    },
  } = useLocation();
  return (
    <div>
      <BackButton text={data.otherUser.displayName} />
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
