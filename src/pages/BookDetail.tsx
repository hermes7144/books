import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { db, getUser } from '../api/firebase';
import User from '../components/User';
import Toast from '../components/ui/Toast';
import { doc, onSnapshot } from 'firebase/firestore';

export default function BookDetail() {
  const {
    state: {
      book,
      book: { id, uid, cover, title, priceStandard, price, quality, description, isSale, author, publisher, pubDate },
    },
  } = useLocation();
  const { user, login } = useAuthContext();
  const { dispatch } = useChatContext();
  const navigate = useNavigate();
  const [writer, setWriter] = useState<any>();
  const [showToast, setShowToast] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = (await getUser(uid)).data();
      setWriter(res);
    };

    fetchData();
  }, [uid]);

  const handleClick = () => {
    try {
      dispatch({ type: 'CHANGE_USER', payload: { ...writer, id } });
    } catch (err) {
      console.log(err);
    }

    if (uid === user.uid) {
      onSnapshot(doc(db, 'userChats', uid), (doc) => {
        const chats = Object.entries(doc.data()).filter((chat) => chat[1].id === params.id);

        if (chats.length === 0) {
          setShowToast(true);
        } else {
          navigate(`/chats/${id}`, { state: { book } });
        }
      });
    } else {
      navigate(`/chat/${id}`, { state: { book } });
    }
  };

  const handleToastClose = () => {
    setShowToast(false);
  };
  return (
    <>
      <section className='w-full p-4'>
        <div>
          <h2 className='text-2xl font-bold line-clamp-2'>{title}</h2>
        </div>
        <div className='flex gap-2 border-b border-gray-300 my-5'>
          <span className='text-gray-700'>{`${author} | ${publisher} | ${pubDate}`}</span>
        </div>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='w-full flex basis-1/5 justify-center'>
            <img className='w-40 h-60 md:w-60 md:h-80 border border-gray-100 shadow-sm' src={cover} alt={title} />
          </div>
          <div className='basis-4/5'>
            <div className='flex flex-col justify-between h-full'>
              <div>
                {writer && (
                  <div className='flex items-center shrink-0 gap-2'>
                    <div className='h-8 w-8 bg-avatar' />
                    <div className='flex flex-col'>
                      <span className='font-medium'>{writer.displayName}</span>
                      {<span className='text-sm text-gray-400'>{writer.neighborhood}</span>}
                    </div>
                  </div>
                )}
                <div className='flex flex-col'>
                  <table className='border-b border-t border-gray-300 my-2'>
                    <colgroup>
                      <col className='w-20' />
                    </colgroup>
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
                              <span>({(100 - (price / priceStandard) * 100).toFixed(2)}% 할인)</span>
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
                  <div className='min-h-[50px]'>
                    {description.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < description.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
              {user ? <Button text={uid === user.uid ? '대화중인 채팅방' : '채팅하기'} onClick={handleClick} /> : <Button text='Login to buy' onClick={login} />}
            </div>
          </div>
        </div>

        {showToast && <Toast message='채팅한 이웃이 없어요.' onClose={handleToastClose} />}
      </section>
    </>
  );
}
