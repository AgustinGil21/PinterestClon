import { FaPlus } from 'react-icons/fa';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useRef } from 'react';
import { CreatePinOrBoardModal } from './CreatePinOrBoardModal';
import CreateBoardModal from '../boards/create-board/CreateBoardModal';

export const CreatePinOrBoardBtn = () => {
  const { setCreatePinOrBoardModalIsOpen, createPinOrBoardModalIsOpen } =
    useAppsStore();
  const btnRef = useRef(null);

  const handleClick = () => {
    setCreatePinOrBoardModalIsOpen(btnRef);
  };

  return (
    <>
      <button
        className={`p-3 rounded-full transition-colors relative size-[44px] self-end mr-10 md:mr-24 ${
          createPinOrBoardModalIsOpen
            ? 'bg-black hover:bg-[#222222]'
            : 'hover:bg-searchBg'
        }`}
        onClick={handleClick}
        ref={btnRef}
      >
        <FaPlus
          size={20}
          fill={`${createPinOrBoardModalIsOpen ? '#ffffff' : '#000000'}`}
          className='transition-colors'
        />
        {createPinOrBoardModalIsOpen && <CreatePinOrBoardModal />}
      </button>
    </>
  );
};
