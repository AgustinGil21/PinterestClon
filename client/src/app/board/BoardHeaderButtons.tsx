'use client';

import { useRef } from 'react';
import DownloadIcon from '../interfaces/components/icons/DownloadIcon';
import { FaEllipsisH } from 'react-icons/fa';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

interface Props {
  boardID: string;
  userID: string;
  itsYours: boolean;
}

export const BoardHeaderButtons = ({ boardID, userID, itsYours }: Props) => {
  const {
    setShareBoardModal,
    shareBoardBtnRef,
    shareBoardModalIsOpen,
    setBoardMoreOptionsModal,
    boardMoreOptionsModalIsOpen,
  } = useAppsStore();
  const shareBtnRef = useRef(null);
  const moreOptionsBtnRef = useRef(null);
  const handleClickShareModal = () => setShareBoardModal(shareBtnRef, boardID);

  const handleClickMoreOptionsModal = () =>
    setBoardMoreOptionsModal(moreOptionsBtnRef, userID, boardID, itsYours);

  return (
    <div className='flex items-center gap-4 '>
      <button
        className={`rounded-full cursor-pointer transition-colors md:p-3 p-2 duration-300 dark:bg-gray-400 ${
          shareBoardModalIsOpen
            ? 'bg-black hover:bg-black'
            : 'hover:bg-gray-200'
        }`}
        onClick={handleClickShareModal}
        ref={shareBoardBtnRef}
      >
        <DownloadIcon isDownloadAccountOpen={shareBoardModalIsOpen} />
      </button>
      <button
        className={`rounded-full cursor-pointer transition-colors md:p-3 p-2 duration-300 dark:bg-gray-400 ${
          boardMoreOptionsModalIsOpen
            ? 'bg-black hover:bg-black'
            : 'hover:bg-gray-200'
        }`}
        onClick={handleClickMoreOptionsModal}
        ref={moreOptionsBtnRef}
      >
        <FaEllipsisH
          size={20}
          fill={boardMoreOptionsModalIsOpen ? 'white' : 'black'}
        />
      </button>
    </div>
  );
};
