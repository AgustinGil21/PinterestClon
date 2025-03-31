import Modal from '../components/Basic/Modal';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useState, RefObject, useRef, CSSProperties } from 'react';
import { DynamicModal } from '../components/Basic/DynamicModal';
import { downloadImage } from '../libs/downloadImage';

interface ModalPlusOptionPinInterface {
  its_yours?: boolean;
}

const PinMoreOptionsModal = ({
  its_yours = false,
}: ModalPlusOptionPinInterface) => {
  const {
    openReportModal,
    t,
    closePinMoreOptionsModal,
    pinMoreOptionsBtnRef,
    isPinMoreOptionModalOpen,
    pinMoreOptionsBody: body,
  } = useAppsStore();

  const handleDownload = async () => {
    if (body) await downloadImage(body, 'pin-image');

    closePinMoreOptionsModal();
  };

  const handleClick = () => {
    openReportModal(body);
    closePinMoreOptionsModal();
  };

  return (
    <DynamicModal
      btnRef={pinMoreOptionsBtnRef}
      closeDynamicModal={closePinMoreOptionsModal}
      height={80}
      width={197}
      dynamicModalIsOpen={isPinMoreOptionModalOpen}
      className='bg-white rounded-lg shadow-lg'
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
    </DynamicModal>
  );
};

export default PinMoreOptionsModal;
