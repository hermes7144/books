import React from 'react';
import useBooks from '../hooks/useBooks';
import BookList from '../components/BookList';

export default function Allbooks() {
  const {
    booksQuery: { isLoading, data: books },
  } = useBooks();

  return <BookList isLoading={isLoading} books={books} />;
}
