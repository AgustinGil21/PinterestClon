import { ArrowDownIcon } from '@/app/icons/ArrowDown';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRef } from 'react';
import BoardsListModal from '@/app/boards/boards-list/BoardsListModal';

const BoardsButtonPin = () => {
  const btnRef = useRef(null);
  const { setDynamicModal, dynamicModalIsOpen, closeDynamicModal } =
    useAppsStore();

  const handleClick = () => {
    if (dynamicModalIsOpen) {
      closeDynamicModal;
    } else {
      setDynamicModal(btnRef);
    }
  };

  return (
    <>
      <button
        ref={btnRef}
        className='flex items-center px-5 py-2 font-semibold text-sm rounded-3xl  border-black bg-white text-black hover:bg-gray-200 focus:bg-black focus:text-white focus:outline-none'
        onClick={handleClick}
      >
        Perfil
        <ArrowDownIcon classProps='ml-2' />
      </button>
      {/* {dynamicModalIsOpen && <BoardsListModal />} */}
    </>
  );
};

export default BoardsButtonPin;
