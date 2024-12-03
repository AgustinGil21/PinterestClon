'use client';

import { useState } from 'react';
import Modal from '@/app/components/Basic/Modal';
import CoverList from './CoversList';

interface Props {
  lang?: 'en' | 'es' | 'pt';
  setCover: (body: string) => void;
}

const BoardCoverModal = ({ lang = 'en', setCover }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleOpenModal = () => setIsModalOpen(true);

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
    ],
    results: 4,
  };

  return (
    <Modal
      props={{
        setModal: handleOpenModal,
        isModalOpen: isModalOpen,
        className: 'min-w-[300px] w-full max-w-[1000px]',
      }}
    >
      <header className=''></header>
      <CoverList pins={data.pins} setCover={setCover} />
    </Modal>
  );
};

export default BoardCoverModal;
