import React, { useState } from 'react';
import { db } from '../api/firebase';
import { v4 as uuid } from 'uuid';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getChats } from '../api/firebase';
import { useParams } from 'react-router-dom';

export default function Input() {
  const { user } = useAuthContext();
  const { data } = useChatContext();
  const [text, setText] = useState('');
  const params = useParams(); // test

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = async () => {
    if (text === '') return;

    const res = await getChats(data.chatId);

    if (!res.exists()) {
      await setDoc(doc(db, 'chats', data.chatId), { messages: [] });

      await updateDoc(doc(db, 'userChats', user.uid), {
        [data.chatId + '.userInfo']: {
          uid: data.otherUser.uid,
          displayName: data.otherUser.displayName,
        },
        [data.chatId + '.id']: params.id,
      });
      await updateDoc(doc(db, 'userChats', data.otherUser.uid), {
        [data.chatId + '.userInfo']: {
          uid: user.uid,
          displayName: user.displayName,
        },
        [data.chatId + '.id']: params.id,
      });
    }

    await updateDoc(doc(db, 'chats', data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: user.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, 'userChats', user.uid), {
      [data.chatId + '.lastMessage']: { text },
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.otherUser.uid), {
      [data.chatId + '.lastMessage']: { text },
      [data.chatId + '.date']: serverTimestamp(),
    });

    setText('');
  };

  return (
    <div className='h-10 bg-white flex items-center justify-between border border-gray-300'>
      <input
        type='text'
        className='w-full border-none outline-none'
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleOnKeyPress} // Enter 입력 이벤트 함수
        value={text}
      />
      <div>
        <button className='border-none p-1 text-white bg-primary' onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
