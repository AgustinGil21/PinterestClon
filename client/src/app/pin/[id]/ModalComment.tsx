import useCloseModal from '@/app/hooks/useCloseModal';
import React from 'react';
import ModalStyled from '@/app/interfaces/components/Basic/ModalStyled';

interface ModalCommentInterface {
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const ModalComment = ({ onClose, buttonRef }: ModalCommentInterface) => {
  const { modalRef } = useCloseModal({
    setModal: onClose,
    buttonRef: buttonRef,
  });

  return (
    <ModalStyled
      modalRef={modalRef}
      classProps='absolute top-8 right-0 w-40 bg-white shadow-md rounded-md z-50 border border-gray-200'
    >
      <button
        onClick={() => {
          onClose();
        }}
        className='block w-full text-left text-sm text-red-500 hover:bg-red-100 px-4 py-2 rounded-md transition'
      >
        Eliminar comentario
      </button>
    </ModalStyled>
  );
};

export default ModalComment;
