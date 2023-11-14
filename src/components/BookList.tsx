import React from 'react';
import BookCard from './BookCard';

export default function BookList({ isLoading, books }) {
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>{books && books.docs.map((book) => <BookCard key={book.data().id} book={book.data()} />)}</ul>
    </>
  );
}
