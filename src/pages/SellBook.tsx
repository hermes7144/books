import React from 'react';
import BackButton from '../components/ui/BackButton';
import { useAuthContext } from '../context/AuthContext';
import useBooks from '../hooks/useBooks';
import BookList from '../components/BookList';

export default function SellBook() {
  const { uid } = useAuthContext();
  const {
    sellBooks: { isLoading, data: books },
  } = useBooks(uid);

  return (
    <>
      <BackButton text='나의 판매목록' />
      <BookList isLoading={isLoading} books={books} />
    </>
  );
}
