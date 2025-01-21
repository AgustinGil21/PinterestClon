import Modal from '@/app/components/Basic/Modal';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { RefObject } from 'react';

interface ModalReportInterface {
  btnRefReportModal?: RefObject<HTMLButtonElement>;
}

const ModalReport = ({ btnRefReportModal }: ModalReportInterface) => {
  const { openReportModal, isOpenReportModal } = useAppsStore();
  const confirmReport = () => {
    openReportModal();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-2'>
      <Modal
        props={{
          isModalOpen: isOpenReportModal,
          setModal: openReportModal,
          buttonRef: btnRefReportModal,
          styles: {
            position: 'relative',
            zIndex: 90,
          },
          className: 'bg-white rounded-lg shadow-lg p-4 ',
        }}
      >
        <div className='w-full text-center'>
          <p className='mb-4'>
            ¿Estás seguro que quieres reportar este pin? Un administrador se
            encargará de analizarlo.
          </p>
          <div className='flex justify-center gap-4'>
            <ButtonStyled
              className='bg-redPinterestBg text-white px-4 py-2 rounded-lg font-semibold'
              handleClick={confirmReport}
            >
              Confirmar
            </ButtonStyled>
            <ButtonStyled
              className='bg-gray-300 text-black px-4 py-2 rounded-lg font-semibold'
              handleClick={confirmReport}
            >
              Cancelar
            </ButtonStyled>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalReport;
