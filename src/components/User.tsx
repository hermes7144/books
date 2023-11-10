import React from 'react';

export default function User({ user: { displayName, neighborhood } }) {
  return (
    <div className='flex items-center shrink-0 gap-2 mb-2'>
      <div className='h-10 w-10 bg-avatar' />
      <div className='flex flex-col'>
        <span className='font-medium'>{displayName}</span>
        <span className='text-sm text-gray-400'>{neighborhood}</span>
      </div>
    </div>
  );
}
