import React, { useRef, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';

export default function Message({ message, message: { text, senderId, date } }: any) {
  const { uid } = useAuthContext();

  const ref = useRef<any>();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const formattedDate = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);

  const hours = formattedDate.getHours();
  const minutes = formattedDate.getMinutes();
  const amOrPm = hours >= 12 ? '오후' : '오전';

  const formattedTime = `${amOrPm}${hours % 12}:${minutes}`;

  return (
    <div ref={ref} className={`flex p-4 ${senderId === uid ? 'flex-row-reverse' : undefined}`}>
      <div>{senderId !== uid && <div className='w-10 h-10 rounded-full object-cover bg-avatar' />}</div>
      <div className={`flex max-w-3/4 items-center ${senderId === uid ? 'flex-row-reverse' : undefined}`}>
        <p className={`bg-white p-2 m-2 ${senderId === uid ? 'bg-red-400 text-white' : 'bg-gray-300'}`} style={{ borderRadius: '0 10px 10px 10px' }}>
          {text}
        </p>
        <span>{formattedTime}</span>
      </div>
    </div>
  );
}
