import { useEffect } from 'react';
import BoardsList from '../boards/boards-list/BoardsList';
import Modal from '../components/Basic/Modal';
import { useGetScreenSize } from '../hooks/useGetScreenSize';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useLockScroll } from '../hooks/useLockScroll';

export const MobileControllerBoardsListModal = () => {
  const {
    mobileControllerBoardsListModalIsOpen,
    setMobileControllerBoardsListModalIsOpen,
    mobileControllerBoardsListModalPinID,
    boardsList,
    closeMobilePinController,
  } = useAppsStore();
  const { width } = useGetScreenSize();

  useLockScroll();

  const handleCloseModal = () => {
    closeMobilePinController();
    setMobileControllerBoardsListModalIsOpen();
  };

  useEffect(() => {
    if (width > 768) setMobileControllerBoardsListModalIsOpen();
  }, [width]);

  return (
    <>
      <div className='fixed inset-0 bg-black bg-opacity-50 z-[70]' />
      <Modal
        props={{
          setModal: handleCloseModal,
          isModalOpen: mobileControllerBoardsListModalIsOpen,
          blackFilter: true,
          className:
            'fixed z-[71] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[360px] rounded-2xl',
        }}
      >
        <BoardsList
          boards={boardsList}
          pinID={mobileControllerBoardsListModalPinID}
          closeBoardsList={handleCloseModal}
        />
      </Modal>
    </>
  );
};
