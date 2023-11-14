import react, { useState, useEffect } from 'react';

export default function Toast({ message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // 3초 후에 토스트 메시지를 숨깁니다. (0.3초로 설정하려면 300으로 변경)

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <div className={`fixed left-36 md:left-1/2 bottom-1/2 bg-gray-800 text-white px-4 py-2 rounded-md transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>{message}</div>;
}
