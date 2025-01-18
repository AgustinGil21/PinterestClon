import useCloseModal from '@/app/hooks/useCloseModal';
import React from 'react';
import ModalStyled from '@/app/interfaces/components/Basic/ModalStyled';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { CommentInterface } from '@/app/domain/types/pins-structure';

interface ModalCommentInterface {
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  elem: CommentInterface;
}

const ModalComment = ({ onClose, buttonRef, elem }: ModalCommentInterface) => {
  const {
    postDeleteComment,
    updateStateCommentsThenDelete,
    commentsState,
    pinData,
  } = useAppsStore();
  const { modalRef } = useCloseModal({
    setModal: onClose,
    buttonRef: buttonRef,
  });

  const handleClick = () => {
    console.log(elem.id);

    postDeleteComment(elem.id);
    const commentsFrontFilter = commentsState.comments.filter(
      (comment) => comment.id !== elem.id
    );

    console.log(commentsFrontFilter);

    updateStateCommentsThenDelete(commentsFrontFilter);

    onClose();
  };

  return (
    <ModalStyled
      modalRef={modalRef}
      classProps='absolute top-5 right-[-45px] bg-white shadow-lg rounded-lg z-50 border hover:bg-gray-200  w-[70px]'
    >
      {elem.its_yours ? (
        <ButtonStyled
          handleClick={handleClick}
          className=' text-black !p-2  rounded-lg transition font-semibold !text-[12px] '
        >
          Eliminar
        </ButtonStyled>
      ) : (
        <ButtonStyled
          handleClick={handleClick}
          className=' text-black !p-2  rounded-lg transition font-semibold !text-[12px] '
        >
          Reportar
        </ButtonStyled>
      )}
    </ModalStyled>
  );
};

export default ModalComment;
