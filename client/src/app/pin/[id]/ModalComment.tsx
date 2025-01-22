import React from 'react';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { CommentInterface } from '@/app/domain/types/pins-structure';
import Modal from '@/app/components/Basic/Modal';

interface ModalCommentInterface {
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  elem: CommentInterface;
  handleCommentsCount: () => void;
  isModalOpen: boolean;
  top?: boolean;
}

const ModalComment = ({
  onClose,
  buttonRef,
  elem,
  handleCommentsCount,
  isModalOpen,
  top = false,
}: ModalCommentInterface) => {
  const {
    postDeleteComment,
    updateStateCommentsThenDelete,
    commentsState,
    openReportModal,
  } = useAppsStore();

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
    <Modal
      props={{
        setModal: onClose,
        buttonRef: buttonRef,
        isModalOpen: isModalOpen,
        className: 'rounded-lg',
        styles: {
          position: 'absolute',
          top: `${top ? '' : '25px'}`,
          right: `${top ? '' : '0'}`,
          left: `${top ? '0' : ''}`,
          bottom: `${top ? '25px' : ''}`,
          zIndex: 50,
          backgroundColor: 'white',
        },
      }}
    >
      {elem.its_yours ? (
        <ButtonStyled
          handleClick={handleDelete}
          className='text-black p-2 w-full rounded-lg text-sm font-semibold !text-[12px] hover:bg-gray-100'
        >
          Eliminar
        </ButtonStyled>
      ) : (
        <ButtonStyled
          className='text-black p-2 w-full rounded-lg !text-[12px] font-semibold hover:bg-gray-100'
          handleClick={openReportModal}
        >
          Reportar
        </ButtonStyled>
      )}
    </Modal>
  );
};

export default ModalComment;
