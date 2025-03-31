import React from 'react';
import ButtonStyled from '../../interfaces/components/Basic/ButtonStyled';
import { useAppsStore } from '../../infrastructure/stores/useAppStore';
import { CommentInterface } from '../../domain/types/pins-structure';
import Modal from '../../components/Basic/Modal';

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
    t,
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

  const handleReportModal = () => openReportModal('comment');

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
          {t?.comment['more-options'].delete || 'Eliminar'}
        </ButtonStyled>
      ) : (
        <ButtonStyled
          className='text-black p-2 w-full rounded-lg !text-[12px] font-semibold hover:bg-gray-100'
          handleClick={handleReportModal}
        >
          {t?.comment['more-options'].report || 'Reportar'}
        </ButtonStyled>
      )}
    </Modal>
  );
};

export default ModalComment;
