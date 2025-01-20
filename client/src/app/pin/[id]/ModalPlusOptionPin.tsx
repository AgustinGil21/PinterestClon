import Modal from '@/app/components/Basic/Modal';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { RefObject } from 'react';

interface ModalPlusOptionPinInterface {
  btnRef: RefObject<HTMLButtonElement>;
}

const ModalPlusOptionPin = ({ btnRef }: ModalPlusOptionPinInterface) => {
  const { isThreePointsAccountOpen, openThreePointsAcountModal, pinData } =
    useAppsStore();

  const handleDownload = () => {
    if (pinData?.body) {
      const link = document.createElement('a');
      link.href = pinData.body;
      link.download = pinData.alt_text;
      link.click();
    }
  };

  return (
    <Modal
      props={{
        buttonRef: btnRef,
        isModalOpen: isThreePointsAccountOpen,
        setModal: openThreePointsAcountModal,
        styles: {
          position: 'absolute',
          top: '15.5%',
          left: '40%',

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
        <ButtonStyled className='font-semibold !p-2 !text-[12px] w-full  hover:bg-gray-200 rounded-lg text-start'>
          Reportar pin
        </ButtonStyled>
      </div>
    </Modal>
  );
};

export default ModalPlusOptionPin;
