import { DynamicModal } from '../components/Basic/DynamicModal';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { BoardItsNotYours } from './BoardItsNotYours';
import { BoardItsYours } from './BoardItsYours';

export const DynamicMoreOptionsBoardModal = () => {
  const {
    closeBoardMoreOptionsModal,
    boardMoreOptionsUserID,
    boardMoreOptionsModalIsOpen,
    boardMoreOptionsBtnRef,
    boardItsYours,
    boardMoreOptionsBoardID,
  } = useAppsStore();

  return (
    <DynamicModal
      dynamicModalIsOpen={boardMoreOptionsModalIsOpen}
      closeDynamicModal={closeBoardMoreOptionsModal}
      btnRef={boardMoreOptionsBtnRef}
      width={190}
      height={112}
      className='p-1.5 bg-white rounded-lg w-[190px] pt-2'
    >
      {boardItsYours ? (
        <BoardItsYours boardID={boardMoreOptionsBoardID} />
      ) : (
        <BoardItsNotYours userID={boardMoreOptionsUserID} />
      )}
    </DynamicModal>
  );
};
