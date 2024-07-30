import { useState } from 'react';
import ArrowBottomUser from '../../icons/ArrowBottomUser';
import ModalStyled from '../../Basic/ModalStyled';
import LinkNavigate from '../Nav/LinkNavigate';
import SwitchMode from '../../SwitchMode';
import useCloseModal from '@/app/hooks/useCloseModal';
import StartLog from './StartLog';
import StartRegister from './StartRegister';

export const HeaderAuth = () => {
  const [modal, setModal] = useState(false);
  const { modalRef } = useCloseModal({ setModal });

  return (
    <div className='flex flex-row items-center gap-4'>
      <div className='flex gap-2'>
        <StartLog />
        <StartRegister />
      </div>
      <button onClick={() => setModal(true)}>
        <ArrowBottomUser />
      </button>
      {modal && (
        <ModalStyled
          classProps='right-5 top-[54px] max-w-[300px] py-2 px-1 rounded-xl '
          modalRef={modalRef}
        >
          <div className='p-1 flex flex-col '>
            <div className='text-black dark:text-white flex flex-col text-sm'>
              <LinkNavigate
                href={'#'}
                classProps='hover:bg-gray-200  dark:hover:bg-gray-900 p-1 my-1 px-2 rounded-lg cursor-pointer'
              >
                Información sobre el clon
              </LinkNavigate>
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
      )}
    </div>
  );
};

export default HeaderAuth;
