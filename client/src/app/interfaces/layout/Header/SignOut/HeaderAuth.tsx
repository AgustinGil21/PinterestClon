import { useState } from 'react';
import ArrowBottomUser from '../../../components/icons/ArrowBottomUser';
import ModalStyled from '../../../components/Basic/ModalStyled';
import LinkNavigate from '../Nav/LinkNavigate';
import SwitchMode from '../../SwitchMode';
import useCloseModal from '@/app/interfaces/hooks/useCloseModal';
import StartLog from './StartLog';
import StartRegister from './StartRegister';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

export const HeaderAuth = () => {
  const { t } = useAppsStore();
  const [modal, setModal] = useState(false);
  const { modalRef } = useCloseModal({ setModal });

  return (
    <div className='flex flex-row items-center gap-4'>
      <div className='flex gap-2'>
        <StartLog />
        <StartRegister />
      </div>
      <button onClick={() => setModal(true)} className='md:block hidden '>
        <ArrowBottomUser />
      </button>
      {modal && (
        <ModalStyled
          classProps='right-5 top-[54px] max-w-[300px] py-2 px-1 rounded-xl md:block hidden   '
          modalRef={modalRef}
        >
          <div className='p-1 flex flex-col '>
            <div className='text-black dark:text-white flex flex-col text-sm'>
              <LinkNavigate
                href={'#'}
                classProps='hover:bg-gray-200  dark:hover:bg-gray-900 p-1 my-1 px-2 rounded-lg cursor-pointer font-semibold'
              >
                {t?.header.modal['clone-info'] || 'Información del clon'}
              </LinkNavigate>
            </div>
            <hr />
            <div className='flex items-center justify-between mt-2'>
              <span className='text-black dark:text-white text-sm  px-2 font-semibold'>
                {' '}
                Light/Dark mode
              </span>

              <SwitchMode />
            </div>
          </div>
        </ModalStyled>
      )}
    </div>
  );
};

export default HeaderAuth;
