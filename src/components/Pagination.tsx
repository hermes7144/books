import React from 'react';

export default function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);
  const maxDisplayedPages = 10; // 표시할 최대 페이지 버튼 수
  const startPage = Math.max(1, Math.min(page - Math.floor(maxDisplayedPages / 2), numPages - maxDisplayedPages + 1));
  const endPage = Math.min(startPage + maxDisplayedPages - 1, numPages);

  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='flex justify-center gap-1'>
      <button className='border-none rounded-lg p-2 m-0 bg-gray-300 hover:bg-red-400 text-white' onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => setPage(pageNumber)} className={'border-none rounded-lg p-2 m-0  hover:bg-red-400 text-white ' + (page === pageNumber ? 'bg-red-500' : 'bg-gray-300')}>
          {pageNumber}
        </button>
      ))}
      <button className='border-none rounded-lg p-2 m-0 bg-gray-300 hover:bg-red-40 text-white' onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </button>
    </nav>
  );
}
