'use client';

import { useEffect } from 'react';
import Modal from '../components/Basic/Modal';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

interface Props {
  boardID: string;
  setModal: () => void;
  modalIsOpen: boolean;
}

export const DeleteBoardModal = ({ boardID, setModal, modalIsOpen }: Props) => {
  const { closeBoardMoreOptionsModal, deleteBoard } = useAppsStore();

  const handleDelete = () => {
    deleteBoard(boardID);
    setModal();
  };

  const handleCancel = () => {
    setModal();
  };

  useEffect(() => {
    closeBoardMoreOptionsModal();
  }, []);

  return (
    <Modal
      props={{
        setModal: setModal,
        isModalOpen: modalIsOpen,
        center: true,
        blackFilter: true,
        className:
          'bg-white py-4 px-6 rounded-xl flex flex-col gap-6 min-w-[355px] max-w-[600px] w-full',
      }}
    >
      <article className='flex flex-col gap-3 items-center'>
        <h2 className='font-bold md:text-2xl text-xl'>
          ¿Quieres eliminar este tablero?
        </h2>
        <p className='md:text-base text-sm text-justify'>
          Esta acción eliminará todos los datos del tablero y pins que contenga.
          Ya no podrás agregar mas pins en él ni acceder desde tu perfil a su
          contenido.
        </p>
      </article>
      <div className='flex justify-around items-center'>
        <button
          className='px-3 py-2 bg-slate-200 rounded-3xl hover:bg-slate-100 font-semibold transition-colors'
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button
          className='px-3 py-2 bg-redPinterestBg rounded-3xl hover:bg-red-500 font-semibold text-white transition-colors'
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </div>
    </Modal>
  );
};
