import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UseBooks from '../hooks/useBooks';
import SellBook from '../components/SellBook';
import Pagination from '../components/Pagination';

type BookListProps = {
  title: string;
  author: number;
  priceStandard: number;
  publisher: string;
  cover: string;
};

const options = [
  { value: 'B', descrption: '최상' },
  { value: 'H', descrption: '상' },
  { value: 'M', descrption: '중' },
  { value: 'L', descrption: '하' },
];

export default function NewBook() {
  const { user } = useAuthContext();

  const [search, setSearch] = useState('');
  const [bookList, setBookList] = useState<BookListProps[]>([]);
  const [quality, setQuality] = useState('');
  const [book, setBook] = useState<any>();
  const [isUploading, setIsUploading] = useState(false);
  const [isSale, setIsSale] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 5;
  const offset = (page - 1) * limit;

  const [totalResults, setTotalResults] = useState(0);

  const { addBook } = UseBooks();

  const navigate = useNavigate();

  const handleBook = (e: any) => {
    setSearch(e.target.value);
  };

  const handleOnKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const selectBook = (book: BookListProps) => {
    setSearch('');
    setQuality('');
    setBookList([]);
    setBook({ ...book, price: '', description: '', neighborhood: '' });
  };

  const giveawayForm = (isGiveaway: boolean) => {
    if (isGiveaway) {
      setBook((book: any) => ({ ...book, price: 0 }));
    } else {
      setBook((book: any) => ({ ...book, price: '' }));
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setBook((book: any) => ({ ...book, [name]: value }));
  };

  const handleSelect = (e: any) => setQuality(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book?.title) {
      alert('책을 먼저 선택해주세요!');
      return false;
    }

    setIsUploading(true);

    console.log('book', book);

    addBook.mutate(
      { ...book, quality, isSale, neighborhood: user.neighborhood, uid: user.uid },
      {
        onSuccess: () => {
          navigate(`/`);
        },
      }
    );
  };

  const handleSearch = async () => {
    if (!search) return;
    setBook([]);
    setPage(1);

    try {
      const res = await axios.get(`/itemSearch?Query=${search}&Cover=Big&&${process.env.REACT_APP_ALADIN_ITEM_SEARCH}&MaxResults=50`);

      setTotalResults(res.data.totalResults > 100 ? 100 : res.data.totalResults);

      const item = res.data.item;

      if (item.length === 0) {
        alert('검색결과가 없습니다!');
        return;
      }

      if (item.length > 0) {
        setBookList(item);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <div className='w-full text-center px-12'>
      <h2 className='text-2xl font-bold my-4'>새로운 책 등록</h2>
      <div className='flex mb-4'>
        <input className='my-0 flex-1 pl-3 outline-none border border-gray-300 rounded-l-lg' type='text' name='book' value={search} onChange={handleBook} onKeyDown={handleOnKeyPress} />
        <Button text={'검색'} onClick={handleSearch} />
      </div>

      {bookList.length > 0 && bookList.slice(offset, offset + limit).map((book) => <SellBook book={book} handleClick={selectBook} />)}
      {bookList.length > 0 && <Pagination total={totalResults} limit={10} page={page} setPage={setPage} />}

      <form onSubmit={handleSubmit}>
        <div className='flex flex-col md:flex-row'>
          {book?.cover && (
            <>
              <div className='flex justify-center items-center basis-2/5'>
                <img className='w-72 h-96 bg-cover' src={book.cover} alt={book.title} />
              </div>
              <div className='flex flex-col basis-3/5'>
                <label className='text-brand font-bold text-left'>제목</label>
                <input type='text' className='p-2 outline-none border border-gray-300 my-2 bg-gray-100 rounded-lg' value={book?.title} readOnly />
                <label className='text-brand font-bold text-left'>출판사</label>
                <input type='text' className='p-2 outline-none border border-gray-300 my-2 bg-gray-100 rounded-lg' value={book?.publisher} readOnly />
                <label className='text-brand font-bold text-left'>정가</label>
                <input type='number' className='p-2 outline-none border border-gray-300 my- bg-gray-100 rounded-lg' value={book?.priceStandard} readOnly />

                <label className='text-brand font-bold text-left pt-2 border-t border-gray-200 active'>거래 방식</label>
                <div className='flex my-2 gap-2'>
                  <button
                    type='button'
                    onClick={() => {
                      setIsSale(true);
                      giveawayForm(false);
                    }}
                    className={`py-2.5 px-5 text-sm font-bold focus:loutline-none rounded-full border border-gray-200 hover:bg-gray-100 ${isSale ? 'bg-primary text-white hover:bg-red-300' : 'bg-white text-gray-900'}`}>
                    판매하기
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      setIsSale(false);
                      giveawayForm(true);
                    }}
                    className={`py-2.5 px-5 text-sm font-bold focus:loutline-none  rounded-full border border-gray-200 hover:bg-gray-100  ${!isSale ? 'bg-primary text-white hover:bg-red-300' : 'bg-white text-gray-900'}`}>
                    나눔하기
                  </button>
                </div>

                <label className='text-brand font-bold text-left' htmlFor='quality'>
                  품질
                </label>
                <select id='quality' name='quality' className='border border-gray-300 my-2 p-2.5 rounded-lg block w-full ' onChange={handleSelect} value={quality} required>
                  <option value=''>-선택-</option>
                  {options && options.map((option) => <option key={option.value}>{option.descrption}</option>)}
                </select>
                <label className='text-brand font-bold text-left' htmlFor='price'>
                  판매가
                </label>
                <div className='relative mb-6'>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none'>￦</div>
                  <input type='number' id='price' name='price' className='border border-gray-300 focus:border-2 focus:border-gray-900 rounded-lg block w-full pl-10 p-2.5' value={book?.price} onChange={handleChange} disabled={!isSale} placeholder='가격을 입력해주세요.' required />
                </div>

                <label className='text-brand font-bold text-left' htmlFor='description'>
                  기타
                </label>
                <textarea id='description' name='description' rows={4} className='block w-full p-1 text-gray-800 bg-white border border-gray-200 mb-2 resize-none rounded-lg' placeholder='참고사항이나 특이사항을 입력해주세요.' value={book?.description} onChange={handleChange} required></textarea>
                <Button text={isUploading ? '업로드 중...' : '제품 등록하기'} disabled={isUploading} />
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
