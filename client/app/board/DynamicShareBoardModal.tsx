import { DynamicModal } from '../components/Basic/DynamicModal';
import { ShareComponent } from '../components/Basic/ShareComponent';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

export const DynamicShareBoardModal = () => {
  const {
    shareBoardModalIsOpen,
    shareBoardID,
    closeShareBoardModal,
    shareBoardBtnRef,
  } = useAppsStore();

  return (
    <DynamicModal
      dynamicModalIsOpen={shareBoardModalIsOpen}
      btnRef={shareBoardBtnRef}
      closeDynamicModal={closeShareBoardModal}
      width={325}
      height={230}
      className='p-4 rounded-xl z-50 bg-white'
    >
      <ShareComponent data={shareBoardID} endpoint='/board' />
    </DynamicModal>
  );
};
