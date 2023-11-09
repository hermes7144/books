import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function Chats() {
  const { uid } = useAuthContext();
  const { dispatch } = useChatContext();
  const [chats, setChats] = useState<any>([]);
  const navigate = useNavigate();
  const params = useParams();

  return <div className='bg-slate-600'>{chats && chats.map((chat) => {})}</div>;
}
