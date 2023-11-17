import React, { useEffect, useState } from 'react';
import Messages from '../components/Messages';
import Input from '../components/Input';
import { useChatContext } from '../context/ChatContext';
import { useLocation, useParams } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';
import { getBook } from '../api/firebase';

export default function BookChat() {
  const { data } = useChatContext();
  const { id } = useParams();
  const [book, setBook] = useState<any>();

  useEffect(() => {
    async function bookQuery(id) {
      const res = (await getBook(id)).data();
      console.log(res);

      setBook(res);
    }

    id && bookQuery(id);
  }, [id]);
  return (
    <div>
      <BackButton text={data.otherUser.displayName} />
      {book && (
        <div className='border-t border-b mb-1'>
          <div className='flex p-2 gap-2'>
            <img className='w-15 h-20' src={book.cover} alt='cover' />
            <div className='flex flex-col'>
              <span className='text-lg line-clamp-2'>{book.title}</span>
              <span>{book.price}원</span>
            </div>
          </div>
        </div>
      )}
      <Messages />
      <Input book={book} />
    </div>
  );
}
