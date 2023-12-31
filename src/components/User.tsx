import React from 'react';

export default function User({ user: { displayName, neighborhood }, showNeighborHood = false }) {
  return (
    <div className='flex items-center shrink-0 gap-2'>
      <div className='h-8 w-8 bg-avatar' />
      <div className='flex flex-col'>
        <span className='font-medium hidden md:block'>{displayName}</span>
        {showNeighborHood && <span className='text-sm text-gray-400'>{neighborhood}</span>}
      </div>
    </div>
  );
}
