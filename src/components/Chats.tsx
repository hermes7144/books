import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, getBook } from '../api/firebase';

export default function Chats() {
  const { uid } = useAuthContext();
  const { dispatch, data } = useChatContext();
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
    <div className='bg-slate-600'>
      {chats &&
        chats.map((chat) => (
          <div className='p-2.5 flex items-center gap-2.5 text-white cursor-pointer' key={chat[0]} onClick={() => handleClick(chat[1].userInfo)}>
            <div></div>
            <div>
              <span>{chat[1].userInfo.displayName}</span>
              <span>{chat[1].lastMessage.text}</span>
            </div>
          </div>
        ))}
    </div>
  );
}
