import React from 'react';

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button className='bg-primary text-white py-2 px-4 rounded-sm  hover:brightness-110 flex-shrink-0' onClick={onClick}>
      {text}
    </button>
  );
}
