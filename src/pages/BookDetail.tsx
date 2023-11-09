import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { getUser } from '../api/firebase';
// import { getUser } from '../api/firebase';

export default function BookDetail() {
  const {
    state: {
      book: { id, uid, cover, title, priceStandard, price, quality, description, isSale, author, publisher, pubDate },
    },
  } = useLocation();
  const { user } = useAuthContext();
  const { dispatch } = useChatContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function setUserInfo() {
      try {
        const res = await getUser(uid);
        const writer = res.data();

        dispatch({ type: 'CHANGE_USER', payload: { ...writer, id } });
      } catch (err) {
        console.log(err);
      }
    }
    setUserInfo();
  }, [dispatch, uid, id]);

  const handleClick = () => {
    if (uid === user.uid) {
      navigate(`/chats/${id}`);
    } else {
      navigate(`/chat/${id}`);
    }
  };
  return (
    <>
      <section className='w-full p-4'>
        <h2 className='text-3xl font-bold py-2  '>{title}</h2>
        <p className='text-gray-700 border-b border-gray-200 whitespace-pre mb-10'>{`${author}   ${publisher}    ${pubDate}`}</p>
        <div className='flex flex-col md:flex-row'>
          <div className='w-full flex justify-center  basis-2/5'>
            <img className='w-50 h-60' src={cover} alt={title} />
          </div>
          <div className='basis-3/5'>
            <div className='flex justify-between items-center border-b border-gray-400'>
              <table>
                <tr>
                  <td className='px-3'>새상품</td>
                  <td className='px-3'>{priceStandard}원</td>
                </tr>
                <tr>
                  <td className='px-3'>판매가</td>
                  <td className='px-3'>
                    {' '}
                    {isSale ? (
                      <>
                        <span className='text-xl font-bold py-2 mr-2'>{price}원</span>
                        <span>({((price / priceStandard) * 100).toFixed(2)}% 할인)</span>
                      </>
                    ) : (
                      <p className='text-2xl font-bold py-2'>나눔</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className='px-3'>품질</td>
                  <td className='px-3'>{quality}</td>
                </tr>
              </table>
            </div>
            <div>
              <textarea rows={4} className='w-full p-1 text-gray-800 mb-2 resize-none border-none	focus:outline-0 ' readOnly value={description}></textarea>
            </div>
            <Button text={'채팅하기'} onClick={handleClick} />
          </div>
        </div>
      </section>
    </>
  );
}
