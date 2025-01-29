import { Dispatch, SetStateAction } from 'react';
import useCloseModal from '@/app/interfaces/hooks/useCloseModal';
import ModalStyled from '../../../components/Basic/ModalStyled';
import LinkNavigate from '../Nav/LinkNavigate';
import SwitchMode from '../../SwitchMode';
import LogOutButton from './LogOutButton';
import UserData from './UserData';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface MoreOptionsModalInterface {
  setModal: Dispatch<SetStateAction<boolean>>;
}

export const MoreOptionsModal = ({ setModal }: MoreOptionsModalInterface) => {
  const { t } = useAppsStore();
  const { modalRef } = useCloseModal({ setModal });
  const handleClick = () => setModal(false);

  return (
    <ModalStyled
      classProps='right-5 top-[48px] max-w-[300px] py-2 px-0.5 rounded-xl '
      modalRef={modalRef}
    >
      <div className='p-1 flex flex-col '>
        <span className='text-[10px] text-black p-1 dark:text-white px-2'>
          {t?.header.modal['currently-in'] || 'Actualmente en'}
        </span>
        <UserData onClick={handleClick} />
        <div className='text-black dark:text-white flex flex-col text-sm'>
          <span className='text-[10px]  text-black dark:text-white  p-1 px-2 '>
            {t?.header.modal.options || 'Opciones'}
          </span>
          <hr />
          <LinkNavigate
            href={'/edit-user'}
            classProps='hover:bg-gray-200  dark:hover:bg-gray-900 p-1 my-1 rounded-lg cursor-pointer px-2 font-semibold'
            onClick={handleClick}
          >
            {t?.header.modal.settings || 'Configuración'}
          </LinkNavigate>
          <LinkNavigate
            href={'#'}
            classProps='hover:bg-gray-200  dark:hover:bg-gray-900 p-1 rounded-lg cursor-pointer px-2 font-semibold'
            onClick={handleClick}
          >
            {t?.header.modal['clone-info'] || 'Información del clo'}
          </LinkNavigate>
          <LogOutButton />
        </div>
        {/* <hr />
        <div className='flex items-center justify-between mt-2'>
          <span className='text-black dark:text-white text-sm  px-2 font-semibold'>
            Cambiar tema
          </span>

          <SwitchMode />
        </div> */}
      </div>
    </ModalStyled>
  );
};

export default MoreOptionsModal;
