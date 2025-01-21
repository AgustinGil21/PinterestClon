import Modal from '@/app/components/Basic/Modal';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useState, RefObject, useRef } from 'react';
import ModalReport from './ModalReport';

interface ModalPlusOptionPinInterface {
  btnRef: RefObject<HTMLButtonElement>;
  isModalOpen: boolean;
  setModal: () => void;
  body: string;
}

const ModalPlusOptionPin = ({
  btnRef,
  setModal,
  isModalOpen,
  body,
}: ModalPlusOptionPinInterface) => {
  const { openReportModal } = useAppsStore();

  const handleDownload = () => {
    if (body) {
      const link = document.createElement('a');
      link.href = body;
      link.target = '_blank';
      link.download = 'pin-image';
      link.click();
    }
  };

  const handleClick = () => {
    openReportModal();
    setModal();
  };

  return (
    <>
      <Modal
        props={{
          buttonRef: btnRef,
          isModalOpen: isModalOpen,
          setModal: setModal,
          styles: {
            position: 'absolute',
            right: '0',
            bottom: '7px',
            zIndex: 50,
          },
          className: ' bg-white rounded-lg shadow-lg',
        }}
      >
        <div className='w-full p-1 max-w-[380px]'>
          <ButtonStyled
            className='font-semibold !p-2 !text-[12px] w-full  hover:bg-gray-200 rounded-lg text-start'
            handleClick={handleDownload}
          >
            Descargar imagen
          </ButtonStyled>
          <ButtonStyled
            className='font-semibold !p-2 !text-[12px] w-full  hover:bg-gray-200 rounded-lg text-start'
            handleClick={handleClick}
          >
            Reportar pin
          </ButtonStyled>
        </div>
      </Modal>
    </>
  );
};

export default ModalPlusOptionPin;
