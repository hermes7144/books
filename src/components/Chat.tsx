import React from 'react';
import Messages from './Messages';
import Input from './Input';

export default function Chat() {
  return (
    <div className='flex flex-col'>
      <div></div>
      <Messages />
      <Input />
    </div>
  );
}
