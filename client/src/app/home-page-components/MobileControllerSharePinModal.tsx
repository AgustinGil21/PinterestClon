import { useEffect } from 'react';
import Modal from '../components/Basic/Modal';
import { ShareComponent } from '../components/Basic/ShareComponent';
import { useGetScreenSize } from '../hooks/useGetScreenSize';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useLockScroll } from '../hooks/useLockScroll';

export const MobileControllerSharePinModal = () => {
  const {
    mobileControllerPinID,
    mobileControllerSharePinModal,
    setMobileControllerSharePinModal,
    closeMobilePinController,
  } = useAppsStore();

  const { width } = useGetScreenSize();

  useLockScroll();

  const handleCloseModal = () => {
    closeMobilePinController();
    setMobileControllerSharePinModal();
  };

  useEffect(() => {
    if (width > 768) setMobileControllerSharePinModal();
  }, [width]);

  return (
    <>
      <div className='fixed inset-0 bg-black bg-opacity-50 z-[70]' />
      <Modal
        props={{
          isModalOpen: mobileControllerSharePinModal,
          setModal: handleCloseModal,
          blackFilter: true,
          className:
            'fixed z-[71] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 w-fit rounded-lg min-w-[288.75px] w-[288.75px]',
        }}
      >
        <ShareComponent
          data={mobileControllerPinID}
          endpoint='/pin'
          iconsContainerClassName='gap-2'
        />
      </Modal>
    </>
  );
};
