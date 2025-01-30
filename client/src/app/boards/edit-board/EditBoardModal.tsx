import Modal from '@/app/components/Basic/Modal';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { EditBoardFooter } from './EditBoardFooter';
import { EditBoardForm } from './EditBoardForm';
import { useEffect } from 'react';

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
        center: true,
        setModal: handleCloseModal,
        isModalOpen: editBoardModalIsOpen,
        blackFilter: true,
      }}
    >
      <div
        className={`bg-white shadow-uniform flex flex-col p-4 gap-4 rounded-lg justify-center items-center min-w-[350px] max-w-[500px] min-h-[400px] w-full`}
      >
        <h2 className='text-md font-semibold text-center'>
          {t?.board.edit.title || 'Editar tablero'}
        </h2>
        <section className='w-full flex flex-col sm:flex-row gap-3 h-auto'>
          <EditBoardForm />
        </section>
        <EditBoardFooter />
      </div>
    </Modal>
  );
};
