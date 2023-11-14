import React from 'react';
import { useLocation } from 'react-router-dom';
import useBooks from '../hooks/useBooks';
import BookList from '../components/BookList';
import BackButton from '../components/ui/BackButton';

export default function SearchBook() {
  const {
    state: { search },
  } = useLocation();

  const {
    searchBooks: { isLoading, data: books },
  } = useBooks('', search);

  return (
    <>
      <BackButton text={`'${search}' 검색목록`} />
      <BookList isLoading={isLoading} books={books} />
    </>
  );
}
