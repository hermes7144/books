import React from 'react';
import Messages from '../components/Messages';
import Input from '../components/Input';

export default function BookChat() {
  return (
    <div className='w-full p-5'>
      <div className='h-12 bg-slate-500'></div>
      <Messages />
      <Input />
    </div>
  );
}
