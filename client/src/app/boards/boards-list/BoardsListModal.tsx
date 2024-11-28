'use client';

import { useState } from 'react';
import Modal from '@/app/components/Basic/Modal';
import BoardsList from './BoardsList';
import { ListOfBoards } from './BoardsListResults';

interface Props {
  boards: ListOfBoards[];
}

const BoardsListModal = ({ boards }: Props) => {
  const [isOpen, setModalIsOpen] = useState(true);

  return (
    <Modal
      props={{
        setModal: setModalIsOpen,
        isModalOpen: isOpen,
        className: 'w-[360px] rounded-2xl',
      }}
    >
      <BoardsList boards={boards} />
    </Modal>
  );
};

export default BoardsListModal;
