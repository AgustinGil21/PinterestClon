import React from 'react';

interface InputAvatar {
  children: React.ReactNode;
}

const InputAvatar = ({ children }: InputAvatar) => {
  return (
    <label className={`cursor-pointer`}>
      <input
        type='file'
        className='absolute opacity-0 w-full   cursor-pointer'
      />
      {children}
    </label>
  );
};

export default InputAvatar;
