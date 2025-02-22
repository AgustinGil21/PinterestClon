'use client';

import { useState } from 'react';
import Modal from '@/app/components/Basic/Modal';
import CoverList from './CoversList';
import { FaCross, FaTimes } from 'react-icons/fa';
import { useGetScreenSize } from '@/app/hooks/useGetScreenSize';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

const BoardCoverModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { width } = useGetScreenSize();
  const { t, setBoardCoversModalIsOpen, boardCoversModalIsOpen } =
    useAppsStore();
  const handleOpenModal = () => setIsModalOpen(true);
  const handleClose = () => setBoardCoversModalIsOpen();

  const data = {
    pins: [
      {
        id: '1',
        body: 'https://i.pinimg.com/236x/1a/46/e5/1a46e5dcea4f1cf9e5b5e71a4910d476.jpg',
      },
      {
        id: '2',
        body: 'https://i.pinimg.com/236x/2d/7b/20/2d7b20f02a2727819ed163b1d3cd489e.jpg',
      },
      {
        id: '3',
        body: 'https://i.pinimg.com/236x/83/c5/51/83c55155ec718f5575e688d0a9fe3c41.jpg',
      },
      {
        id: '4',
        body: 'https://i.pinimg.com/236x/cc/91/3d/cc913dd9129fbaea5cdd3dcd7c7e5a5b.jpg',
      },
      {
        id: '5',
        body: 'https://i.pinimg.com/236x/cc/91/3d/cc913dd9129fbaea5cdd3dcd7c7e5a5b.jpg',
      },
      {
        id: '6',
        body: 'https://i.pinimg.com/236x/83/c5/51/83c55155ec718f5575e688d0a9fe3c41.jpg',
      },
      {
        id: '7',
        body: 'https://i.pinimg.com/236x/cc/91/3d/cc913dd9129fbaea5cdd3dcd7c7e5a5b.jpg',
      },
      {
        id: '8',
        body: 'https://i.pinimg.com/236x/cc/91/3d/cc913dd9129fbaea5cdd3dcd7c7e5a5b.jpg',
      },
      {
        id: '9',
        body: 'https://i.pinimg.com/236x/cc/91/3d/cc913dd9129fbaea5cdd3dcd7c7e5a5b.jpg',
      },
      {
        id: '10',
        body: 'https://i.pinimg.com/236x/cc/91/3d/cc913dd9129fbaea5cdd3dcd7c7e5a5b.jpg',
      },
    ],
    results: 4,
  };

  return (
    <Modal
      props={{
        setModal: setBoardCoversModalIsOpen,
        isModalOpen: boardCoversModalIsOpen,
        className:
          'min-w-[300px] w-full max-w-[900px] bg-white rounded-lg fixed z-[71] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:max-h-[550px] overflow-y-auto h-full',
        blackFilter: true,
      }}
    >
      <header className='flex justify-center relative mt-6 mb-6'>
        <h2 className='font-semibold text-sm md:text-xl '>
          {t?.board.edit['covers-modal'].title ||
            'Cambiar la portada del tablero'}
        </h2>
        <button
          className='p-2 flex justify-center items-center hover:bg-slate-200 rounded-full absolute md:right-[16px] -top-[6px] md:-top-1.5 right-[16px]'
          onClick={handleClose}
        >
          <FaTimes size={width > 768 ? 25 : 20} />
        </button>
      </header>
      <CoverList pins={data.pins} />
    </Modal>
  );
};

export default BoardCoverModal;
