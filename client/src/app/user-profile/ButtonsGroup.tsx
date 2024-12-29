'use client';

import { useRef } from 'react';
import useCloseModal from '../hooks/useCloseModal';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import Link from 'next/link';
import ModalShareAccount from './ModalShareAccount';

interface ButtonGroupInterface {
  username: string;
}

const ButtonsGroup = ({ username }: ButtonGroupInterface) => {
  const { openDownloadAccountModal, isDownloadAccountOpen } = useAppsStore();
  const buttonRef = useRef(null);

  const { modalRef } = useCloseModal({
    setModal: openDownloadAccountModal,
    buttonRef,
  });

  return (
    <div className='mt-4 flex gap-2 flex-row'>
      <ButtonStyled
        type='button'
        className={`font-semibold py-[12px] relative ${
          isDownloadAccountOpen
            ? 'bg-black text-white'
            : 'bg-buttonGreyBg text-black hover:bg-gray-300'
        }`}
        handleClick={openDownloadAccountModal}
        btnRef={buttonRef}
      >
        Compartir
        {isDownloadAccountOpen && (
          <ModalShareAccount
            classProps='bottom-[90px] max-w-[390px] w-full absolute top-14 -left-16 min-w-[325px] share-account-modal'
            modalRef={modalRef}
            dataShare={username}
          />
        )}
      </ButtonStyled>

      <Link href={'/edit-user'}>
        <ButtonStyled
          type='button'
          className='bg-buttonGreyBg font-semibold py-[12px] hover:bg-gray-300'
        >
          Editar perfil
        </ButtonStyled>
      </Link>
    </div>
  );
};

export default ButtonsGroup;
