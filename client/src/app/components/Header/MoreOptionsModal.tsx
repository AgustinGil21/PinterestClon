import { useState } from 'react';
import useCloseModal from '@/app/hooks/useCloseModal';
import ModalStyled from '../Basic/ModalStyled';
import LinkNavigate from './LinkNavigate';
import SwitchMode from './SwitchMode';
import LogOutButton from './LogOutButton';
import UserData from './UserData';

interface MoreOptionsModalInterface {
  setModal: () => void;
}

export const MoreOptionsModal = ({ setModal }: MoreOptionsModalInterface) => {
  const { modalRef } = useCloseModal({ setModal });

  return (
    <ModalStyled
      classProps='right-5 top-[48px] max-w-[300px] py-2 px-1'
      modalRef={modalRef}
    >
      <div className='p-1 flex flex-col'>
        <span className='text-[10px] text-black p-1'>Actualmente en</span>
        <UserData />
        <div className='text-black flex flex-col text-sm'>
          {/* <span className='text-[10px]  text-black  p-1'>Opciones</span> */}
          <hr />
          <LinkNavigate
            href={'#'}
            classProps='hover:bg-gray-200 p-1 rounded-lg cursor-pointer'
          >
            Configuracion
          </LinkNavigate>
          <LinkNavigate
            href={'#'}
            classProps='hover:bg-gray-200 p-1 rounded-lg cursor-pointer'
          >
            Información sobre el clon
          </LinkNavigate>
          <LogOutButton />
        </div>
        {/* <hr /> */}
        {/* <div className='flex items-center justify-between mt-2'>
          <span className='text-black text-sm pl-1'> Dark/Light mode</span>

          <SwitchMode />
        </div> */}
      </div>
    </ModalStyled>
  );
};

export default MoreOptionsModal;
