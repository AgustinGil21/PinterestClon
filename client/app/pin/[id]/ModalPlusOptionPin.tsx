import Modal from '../../components/Basic/Modal';
import ButtonStyled from '../../interfaces/components/Basic/ButtonStyled';
import { useAppsStore } from '../../infrastructure/stores/useAppStore';
import { useState, RefObject, useRef, CSSProperties } from 'react';
import ModalReport from './ModalReport';

interface ModalPlusOptionPinInterface {
  btnRef: RefObject<HTMLButtonElement>;
  isModalOpen: boolean;
  setModal: () => void;
  body: string;
  styles?: CSSProperties;
  its_yours?: boolean;
}

const ModalPlusOptionPin = ({
  btnRef,
  setModal,
  isModalOpen,
  body,
  styles,
  its_yours = false,
}: ModalPlusOptionPinInterface) => {
  const { openReportModal, t } = useAppsStore();

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
    openReportModal('pin');
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
            ...styles,
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
            {t?.pin['more-options'].download || 'Descargar imagen'}
          </ButtonStyled>
          {!its_yours && (
            <ButtonStyled
              className='font-semibold !p-2 !text-[12px] w-full  hover:bg-gray-200 rounded-lg text-start'
              handleClick={handleClick}
            >
              {t?.pin['more-options'].report || 'Reportar pin'}
            </ButtonStyled>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalPlusOptionPin;
