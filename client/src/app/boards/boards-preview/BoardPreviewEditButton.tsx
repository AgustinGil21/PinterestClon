'use client';

import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

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
      <svg viewBox='0 0 24 24' fill='currentColor' className='size-[18px]'>
        <path d='M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z' />
      </svg>
    </button>
  );
};

export default BoardPreviewEditButton;
