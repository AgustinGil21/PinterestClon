import React from 'react';
import ButtonStyled from '../../../Basic/ButtonStyled';
import { FcGoogle } from 'react-icons/fc';

const ButtonGoogleSession = () => {
  return (
    <ButtonStyled
      disabled={false}
      type='button'
      className='flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-[23px] shadow-sm bg-white hover:bg-gray-100 focus:outline-none'
    >
      <FcGoogle className='w-6 h-6 mr-2' />
      <span className='text-gray-700 font-medium'>
        Iniciar sesión con Google
      </span>
    </ButtonStyled>
  );
};

export default ButtonGoogleSession;
