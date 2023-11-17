import React, { useRef, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';

export default function Message({ message: { text, senderId, date } }: any) {
  const { uid } = useAuthContext();

  const ref = useRef<any>();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const formattedDate = new Date(date);
  const hours = formattedDate.getHours();
  const minutes = formattedDate.getMinutes();
  const amOrPm = hours >= 12 ? '오후' : '오전';

  const formattedTime = `${amOrPm}${hours % 12 || 12}:${minutes}`;

  return (
    <div ref={ref} className={`flex p-4 gap-1 items-end ${senderId === uid ? 'flex-row-reverse' : undefined}`}>
      <div>{senderId !== uid && <div className='w-10 h-10 rounded-full object-cover bg-avatar' />}</div>
      <div className={`flex max-w-3/4 ${senderId === uid ? 'flex-row-reverse' : undefined}`}>
        <p className={`p-2 ${senderId === uid ? 'bg-red-400 text-white' : 'bg-gray-300'}`} style={{ borderRadius: senderId === uid ? '10px 0 10px 10px' : '0 10px 10px 10px' }}>
          {text}
        </p>
      </div>
      <span className='text-sm'>{formattedTime}</span>
    </div>
  );
}
