import React, { useState } from 'react';
import Allbooks from './Allbooks';
import { useNavigate } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import { useAuthContext } from '../context/AuthContext';
import Toast from '../components/ui/Toast';

export default function Home() {
  const { user } = useAuthContext();
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (user?.neighborhood) {
      navigate('/books/new');
    } else {
      setShowToast(true);
    }
  };

  const handleToastClose = () => {
    setShowToast(false);
  };
  return (
    <>
      <Allbooks />
      {user && (
        <div onClick={handleClick} className='fixed bottom-14 right-4 bg-primary rounded-full p-4 cursor-pointer text-white hover:brightness-110'>
          <BsFillPencilFill />
        </div>
      )}

      {showToast && <Toast message='동네를 먼저 인증해주세요.' onClose={handleToastClose} />}
    </>
  );
}
