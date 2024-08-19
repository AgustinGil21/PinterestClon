import { Dispatch, SetStateAction } from 'react';
import useCloseModal from '@/app/interfaces/hooks/useCloseModal';
import ModalStyled from '../../../components/Basic/ModalStyled';
import LinkNavigate from '../Nav/LinkNavigate';
import SwitchMode from '../../SwitchMode';
import LogOutButton from './LogOutButton';
import UserData from './UserData';

interface MoreOptionsModalInterface {
  setModal: Dispatch<SetStateAction<boolean>>;
}

export const MoreOptionsModal = ({ setModal }: MoreOptionsModalInterface) => {
  const { modalRef } = useCloseModal({ setModal });

  return (
    <ModalStyled
      classProps='right-5 top-[48px] max-w-[300px] py-2 px-0.5 rounded-xl '
      modalRef={modalRef}
    >
      <div className='p-1 flex flex-col '>
        <span className='text-[10px] text-black p-1 dark:text-white px-2'>
          Actualmente en
        </span>
        <UserData />
        <div className='text-black dark:text-white flex flex-col text-sm'>
          <span className='text-[10px]  text-black dark:text-white  p-1 px-2 '>
            Opciones
          </span>
          <hr />
          <LinkNavigate
            href={'/edit-user'}
            classProps='hover:bg-gray-200  dark:hover:bg-gray-900 p-1 my-1 rounded-lg cursor-pointer px-2'
          >
            Configuracion
          </LinkNavigate>
          <LinkNavigate
            href={'#'}
            classProps='hover:bg-gray-200  dark:hover:bg-gray-900 p-1 rounded-lg cursor-pointer px-2'
          >
            Información sobre el clon
          </LinkNavigate>
          <LogOutButton />
        </div>
        <hr />
        <div className='flex items-center justify-between mt-2'>
          <span className='text-black dark:text-white text-sm  px-2'>
            {' '}
            Light/Dark mode
          </span>

          <SwitchMode />
        </div>
      </div>
    </ModalStyled>
  );
};

export default MoreOptionsModal;
