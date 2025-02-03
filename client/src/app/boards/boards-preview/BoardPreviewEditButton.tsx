'use client';

import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { FaPen } from 'react-icons/fa';

interface Props {
  boardID: string;
  className?: string;
}

const BoardPreviewEditButton = ({ boardID, className }: Props) => {
  const { setEditBoardModal } = useAppsStore();
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setEditBoardModal(boardID);
  };

  return (
    <button
      className={`opacity-0 bg-white hover:bg-[#e9e9e9] rounded-full invisible absolute bottom-[10px] right-[10px] size-[34px] p-2 flex justify-center items-center transition-[background-color,opacity] hover:cursor-pointer z-10 board-preview-edit-btn ${className}`}
      onClick={(e: React.MouseEvent) => handleClick(e)}
    >
      <FaPen size={13} />
    </button>
  );
};

export default BoardPreviewEditButton;
