import Modal from '@/app/components/Basic/Modal';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useState, RefObject, useRef, CSSProperties } from 'react';
import { DynamicModal } from '../components/Basic/DynamicModal';

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
    if (body) {
      const response = await fetch(body);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'pin-image';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }

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
