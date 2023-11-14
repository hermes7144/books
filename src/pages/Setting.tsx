import React from 'react';
import { Link } from 'react-router-dom';
import { BsBag, BsCardList, BsHeart } from 'react-icons/bs';

export default function Setting() {
  return (
    <div className='p-2'>
      <h1 className='text-lg font-bold'>나의 거래</h1>
      <div className='p-2'>
        <Link to='/setting/sell' className='flex items-center gap-2 text-lg'>
          <BsCardList />
          판매내역
        </Link>
        <Link to='/setting' className='flex items-center gap-2 text-lg'>
          <BsHeart />
          관심목록
        </Link>
        <Link to='/setting' className='flex items-center gap-2 text-lg'>
          <BsBag />
          구매내역
        </Link>
      </div>
    </div>
  );
}
