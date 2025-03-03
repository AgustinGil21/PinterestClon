import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import BoardsList from './BoardsList';
import { DynamicModal } from '@/app/components/Basic/DynamicModal';

const BoardsListModal = () => {
  const {
    boardsList,
    closeDynamicModal,
    btnRef,
    dynamicModalIsOpen,
    dataOpenBoardModal,
  } = useAppsStore();

  const { pinId } = dataOpenBoardModal;

  return (
    <>
      {dynamicModalIsOpen && (
        <DynamicModal
          className='w-[360px] rounded-2xl bg-white'
          width={360}
          height={502}
          dynamicModalIsOpen={dynamicModalIsOpen}
          btnRef={btnRef}
          closeDynamicModal={closeDynamicModal}
        >
          <BoardsList
            boards={boardsList}
            pinID={pinId}
            closeBoardsList={closeDynamicModal}
          />
        </DynamicModal>
      )}
    </>
  );
};

export default BoardsListModal;
