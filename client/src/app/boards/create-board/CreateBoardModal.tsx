'use client';

import { useRef } from 'react';
import ModalStyled from '@/app/components/Basic/ModalStyled';

const CreateBoardModal = () => {
  const modal = useRef(null);

  return (
    <ModalStyled modalRef={modal}>
      <span>Create board</span>
    </ModalStyled>
  );
};

export default CreateBoardModal;
