import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../api/firebase';
import Message from './Message';
import { useChatContext } from '../context/ChatContext';
export default function Messages() {
  const { data } = useChatContext();

  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <>
      <div className='bg-white overflow-y-auto h-[calc(100vh_-_290px)]'>{messages.length > 0 && messages.map((message) => <Message key={message.id} message={message} />)}</div>
    </>
  );
}
