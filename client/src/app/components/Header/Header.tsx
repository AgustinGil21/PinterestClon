'use client';
import { useState } from 'react';
import PinterestLogo from '../icons/PinterestLogo';
import MessageIcon from '../icons/MessageIcon';
import ArrowBottomUser from '../icons/ArrowBottomUser';
import Tooltip from './ToolTip';
import SearchInput from './SearchInput';
import ButtonStyled from '../Basic/ButtonStyled';
import NavUser from './NavUser';
import ModalStyled from '../Basic/ModalStyled';
import SwitchMode from './SwitchMode';
import LinkNavigate from './LinkNavigate';
import useCloseModal from '@/app/hooks/useCloseModal';
import UserData from './UserData';

export const Header = () => {
  const [loginAuth, setLoginAuth] = useState(true);
  const [modal, setModal] = useState(false);

  const { modalRef } = useCloseModal({ setModal });

  return (
    <header className='w-full  text-white py-3 flex gap-3 px-5 items-center header-big-screen'>
      <div className='flex items-center gap-2'>
        <PinterestLogo />
        <NavUser loginAuth={loginAuth} />
      </div>

      <SearchInput />

      {loginAuth ? (
        <>
          <div className='flex gap-2.5'>
            <Tooltip tooltipText='Mensajes'>
              <MessageIcon />
            </Tooltip>

            <div className='flex items-center gap-3 -m-2'>
              <div className='hover:bg-slate-200 p-2 rounded-full cursor-pointer '>
                <div className='text-white bg-UserBg p-3 rounded-full w-[6px] h-[6px] text-[12px] flex justify-center items-center cursor-pointer '>
                  <Tooltip tooltipText='Tu perfil'>a</Tooltip>
                </div>
              </div>

              <button
                className='hover:bg-slate-200 p-0.5 rounded-full cursor-pointer relative right-3 '
                onClick={() => setModal(!modal)}
              >
                <Tooltip tooltipText='Cuentas y mas opciones'>
                  <ArrowBottomUser />
                </Tooltip>
              </button>

              {modal && (
                <ModalStyled
                  classProps='right-5 top-[48px] max-w-[300px] py-2 px-1 '
                  modalRef={modalRef}
                >
                  <div className='p-1 flex flex-col '>
                    <span className='text-[10px] text-black p-1'>
                      Actualmente en
                    </span>
                    <UserData />
                    <div className='text-black flex flex-col text-sm  cursor-pointer'>
                      <span className='text-[10px]  text-black  p-1'>
                        Mas Opciones
                      </span>
                      <LinkNavigate
                        href={'#'}
                        classProps='hover:bg-gray-200 p-2 rounded-lg'
                      >
                        Configuración
                      </LinkNavigate>
                      <LinkNavigate
                        href={'#'}
                        classProps='hover:bg-gray-200 p-1 rounded-lg'
                      >
                        Info sobre el clon
                      </LinkNavigate>
                      <span className='hover:bg-gray-200 p-1 rounded-lg'>
                        Salir
                      </span>
                    </div>
                    <hr />
                    <div className='flex items-center justify-between mt-2'>
                      <span className='text-black text-sm'>
                        {' '}
                        Dark/Light mode
                      </span>

                      <SwitchMode />
                    </div>
                  </div>
                </ModalStyled>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className='flex flex-row items-center gap-4'>
          <div className='flex gap-2'>
            <ButtonStyled
              className={'bg-buttonGreyBg text-black hover:bg-gray-300'}
              disabled={true}
            >
              Iniciar sesión
            </ButtonStyled>
            <ButtonStyled
              className={'bg-redPinterestBg text-white hover:bg-red-700'}
              disabled={true}
            >
              Regístrate
            </ButtonStyled>
          </div>
          <ArrowBottomUser />
        </div>
      )}
    </header>
  );
};
