import Modal from '@/app/components/Basic/Modal';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { EditBoardFooter } from './EditBoardFooter';
import { EditBoardForm } from './EditBoardForm';
import { useEffect } from 'react';
import { BoardCoverCard } from './BoardCoverCard';
import { BoardCoverExplanation } from './BoardCoverExplanation';

export const EditBoardModal = () => {
  const {
    editBoardModalIsOpen,
    setEditBoardModal,
    editBoardID,
    closeBoardMoreOptionsModal,
  } = useAppsStore();

  const { t } = useAppsStore();

  const handleCloseModal = () => setEditBoardModal(editBoardID);

  useEffect(() => {
    closeBoardMoreOptionsModal();
  }, []);

  return (
    <Modal
      props={{
        className:
          'bg-white rounded-lg fixed z-[71] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto w-full min-w-[350px] max-w-[450px] ',
        setModal: handleCloseModal,
        isModalOpen: true,
        blackFilter: true,
      }}
    >
      <div
        className={`bg-white shadow-uniform flex flex-col p-4 gap-4 rounded-lg justify-center items-start min-w-[350px] max-w-[450px] min-h-[400px] w-full`}
      >
        <h2
          className='text-lg md:text-xl font-semibold text-center'
          style={{ alignSelf: 'center' }}
        >
          {t?.board.edit.title || 'Editar tablero'}
        </h2>
        <BoardCoverExplanation />
        <section className='w-full flex flex-col sm:flex-row gap-3 h-auto'>
          <EditBoardForm />
        </section>
        <EditBoardFooter />
      </div>
    </Modal>
  );
};
