'use client';

import { useEffect } from 'react';
import Modal from '../../components/Basic/Modal';
import CoverList from './CoversList';
import { FaTimes } from 'react-icons/fa';
import { useGetScreenSize } from '../../hooks/useGetScreenSize';
import { useAppsStore } from '../../infrastructure/stores/useAppStore';

const BoardCoverModal = () => {
  const { width } = useGetScreenSize();
  const {
    t,
    setBoardCoversModalIsOpen,
    boardCoversModalIsOpen,
    boardCovers,
    getBoardCovers,
    editBoardID,
  } = useAppsStore();

  const handleClose = () => setBoardCoversModalIsOpen();

  useEffect(() => {
    getBoardCovers({ id: editBoardID, page: 1, limit: 100 });
  }, [editBoardID]);

  return (
    <Modal
      props={{
        setModal: setBoardCoversModalIsOpen,
        isModalOpen: boardCoversModalIsOpen,
        className: `min-w-[300px] w-full max-w-[900px] bg-white rounded-lg fixed z-[71] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:max-h-[550px] overflow-y-auto h-full`,
        blackFilter: true,
      }}
    >
      <header className='flex justify-center relative mt-6 sticky top-0 bg-white py-4'>
        <h2 className='font-semibold text-sm md:text-xl '>
          {t?.board.edit['covers-modal'].title ||
            'Cambiar la portada del tablero'}
        </h2>
        <button
          className='p-2 flex justify-center items-center hover:bg-slate-200 rounded-full absolute md:right-[16px] top-2 md:top-2 right-[16px]'
          onClick={handleClose}
        >
          <FaTimes size={width > 768 ? 25 : 20} />
        </button>
      </header>
      <CoverList pins={boardCovers || []} />
    </Modal>
  );
};

export default BoardCoverModal;
