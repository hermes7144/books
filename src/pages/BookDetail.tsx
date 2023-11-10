import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { getUser } from '../api/firebase';
import User from '../components/User';

export default function BookDetail() {
  const {
    state: {
      book: { id, uid, cover, title, priceStandard, price, quality, description, isSale, author, publisher, pubDate },
    },
  } = useLocation();
  const { user, login } = useAuthContext();
  const { dispatch } = useChatContext();
  const navigate = useNavigate();
  const [writer, setWriter] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const res = (await getUser(uid)).data();
      setWriter(res);
    };

    fetchData();
  }, [uid, writer]);

  const handleClick = () => {
    try {
      dispatch({ type: 'CHANGE_USER', payload: { ...writer, id } });
    } catch (err) {
      console.log(err);
    }

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
          <div className='w-full flex justify-center basis-2/5 mb-10'>
            <img className='w-60 h-80' src={cover} alt={title} />
          </div>
          <div className='basis-3/5'>
            {writer && <User user={writer} />}
            <div className='flex flex-col'>
              <table className='border-b border-t border-gray-300 my-2'>
                <tbody>
                  <tr>
                    <td>새상품</td>
                    <td>{priceStandard}원</td>
                  </tr>
                  <tr>
                    <td>판매가</td>
                    <td>
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
                    <td>품질</td>
                    <td>{quality}</td>
                  </tr>
                </tbody>
              </table>
              <textarea className='w-full p-1 text-gray-800 mb-20 resize-none border-none focus:outline-0' readOnly value={description}></textarea>
              {user ? <Button text={uid === user.uid ? '채팅목록 보기' : '채팅하기'} onClick={handleClick} /> : <Button text={'Login to buy'} onClick={login} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
