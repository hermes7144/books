import React, { useState } from 'react';
import { db } from '../api/firebase';
import { v4 as uuid } from 'uuid';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getChats } from '../api/firebase';
import { useLocation, useParams } from 'react-router-dom';

export default function Input() {
  const params = useParams(); // test
  const { user } = useAuthContext();
  const { data } = useChatContext();
  const [text, setText] = useState('');
  const isInputEmpty = text.trim() === ''; // 입력 값이 공백만 있는지 확인

  const {
    state: {
      book: { cover },
    },
  } = useLocation();

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = async () => {
    if (isInputEmpty) return;

    const res = await getChats(data.chatId);

    if (!res.exists()) {
      await setDoc(doc(db, 'chats', data.chatId), { messages: [] });

      await updateDoc(doc(db, 'userChats', user.uid), {
        [data.chatId + '.userInfo']: {
          uid: data.otherUser.uid,
          displayName: data.otherUser.displayName,
          neighborhood: data.otherUser.neighborhood,
        },
        [data.chatId + '.id']: params.id,
        [data.chatId + '.cover']: cover,
      });
      await updateDoc(doc(db, 'userChats', data.otherUser.uid), {
        [data.chatId + '.userInfo']: {
          uid: user.uid,
          displayName: user.displayName,
          neighborhood: user.neighborhood,
        },
        [data.chatId + '.id']: params.id,
        [data.chatId + '.cover']: cover,
      });
    }

    await updateDoc(doc(db, 'chats', data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: user.uid,
        date: new Date().toISOString(),
      }),
    });

    // await updateDoc(doc(db, 'userChats', user.uid), {
    //   [data.chatId + '.lastMessage']: { text },
    //   [data.chatId + '.date']: new Date().toISOString(),
    // });

    // await updateDoc(doc(db, 'userChats', data.otherUser.uid), {
    //   [data.chatId + '.lastMessage']: { text },
    //   [data.chatId + '.date']: new Date().toISOString(),
    // });

    setText('');
  };

  return (
    <div className='h-10 bg-white flex items-center justify-between border border-gray-300 rounded-md'>
      <input
        type='text'
        className='w-full border-none outline-none'
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleOnKeyPress} // Enter 입력 이벤트 함수
        value={text}
      />
      <button className={`w-16 p-1 mr-1 text-white ${isInputEmpty ? 'bg-gray-400' : 'bg-primary'}`} onClick={handleSend} disabled={isInputEmpty}>
        전송
      </button>
    </div>
  );
}
