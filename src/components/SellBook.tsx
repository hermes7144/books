import React from 'react';
import Button from './ui/Button';

export default function SellBook({ book, handleClick }) {
  return (
    <div className='flex my-2 border border-gray-200' key={book.title}>
      <img className='w-24 h-32' src={book.cover} alt={book.title} />
      <section className='text-left flex-grow ml-3'>
        <article>{book.title}</article>
        <article>{book.author}</article>
        <article>{book.publisher}</article>
        <article>{book.priceStandard}</article>
      </section>
      <Button text={'선택'} onClick={() => handleClick(book)} />
    </div>
  );
}
