import React from 'react';
import useCloseModal from '@/app/hooks/useCloseModal';
import ModalStyled from '@/app/interfaces/components/Basic/ModalStyled';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { CommentInterface } from '@/app/domain/types/pins-structure';

interface ModalCommentInterface {
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  elem: CommentInterface;
  handleCommentsCount: () => void;
}

const ModalComment = ({
  onClose,
  buttonRef,
  elem,
  handleCommentsCount,
}: ModalCommentInterface) => {
  const { postDeleteComment, updateStateCommentsThenDelete, commentsState } =
    useAppsStore();
  const { modalRef } = useCloseModal({ setModal: onClose, buttonRef });

  const handleDelete = () => {
    postDeleteComment(elem.id);
    const updatedComments = commentsState.comments.filter(
      (comment) => comment.id !== elem.id
    );
    updateStateCommentsThenDelete(updatedComments);
    handleCommentsCount();
    onClose();
  };

  return (
    <ModalStyled
      modalRef={modalRef}
      classProps='absolute top-[20px] left-[35px] transform -translate-x-1/2 bg-white shadow-md rounded-lg z-50 border w-20 '
    >
      {elem.its_yours ? (
        <ButtonStyled
          handleClick={handleDelete}
          className='text-black p-1 w-full rounded-lg text-xs font-semibold hover:bg-gray-100 '
        >
          Eliminar
        </ButtonStyled>
      ) : (
        <ButtonStyled className='text-black p-1 w-full rounded-lg text-xs font-semibold hover:bg-gray-100 '>
          Reportar
        </ButtonStyled>
      )}
    </ModalStyled>
  );
};

export default ModalComment;
