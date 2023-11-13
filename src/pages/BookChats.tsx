import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../api/firebase';
import { BsChevronLeft } from 'react-icons/bs';
import DateDifference from '../components/ui/DateDifference';

export default function BookChats() {
  const { uid } = useAuthContext();
  const { dispatch } = useChatContext();
  const [chats, setChats] = useState<any>([]);
  const navigate = useNavigate();
  const params = useParams();
  const {
    state: { book },
  } = useLocation();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', uid), (doc) => {
        const chatsData = Object.entries(doc.data()).filter((chat) => chat[1].id === params.id);
        setChats(chatsData);
      });

      return () => {
        unsub();
      };
    };
    uid && getChats();
  }, [uid, params.id]);

  const handleClick = async (user) => {
    dispatch({ type: 'CHANGE_USER', payload: user });
    navigate(`/chat/${params.id}`, { state: { book } });
  };

  return (
    <div>
      <div className='flex items-center gap-4 border-b py-3'>
        <BsChevronLeft className='cursor-pointer text-2xl' onClick={() => navigate(-1)} />
        <span className='text-xl font-bold'>채팅목록</span>
      </div>
      {chats &&
        chats.map((chat) => (
          <div className='p-2.5 flex justify-between cursor-pointer border-b' key={chat[0]} onClick={() => handleClick(chat[1].userInfo)}>
            <div className='flex gap-2 items-center'>
              <div className='h-10 w-10 bg-avatar' />
              <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                  <span className='text-lg font-bold'>{chat[1].userInfo.displayName}</span>
                  <span className='text-gray-400 text-sm'>
                    {chat[1].userInfo.neighborhood}ˑ
                    <DateDifference date={chat[1].date} />
                  </span>
                </div>
                <span>{chat[1].lastMessage.text}</span>
              </div>
            </div>
            <img className='h-14 w-14' src={chat[1].cover} alt='item' />
          </div>
        ))}
    </div>
  );
}
