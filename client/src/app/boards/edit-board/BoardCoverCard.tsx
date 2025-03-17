import { useEffect } from 'react';
import PlusIcon from '@/app/components/icons/PlusIcon';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

export const BoardCoverCard = () => {
  const {
    setBoardCoversModalIsOpen,
    newBoardCover: cover,
    editBoardPrevData,
    setNewBoardCover,
  } = useAppsStore();
  const handleOpenModal = () => setBoardCoversModalIsOpen();

  useEffect(() => {
    if (editBoardPrevData.cover) setNewBoardCover(editBoardPrevData.cover);
  }, [editBoardPrevData.cover]);

  return (
    <div
      className={`w-[100px] h-[115px] min-w-[100px] min-h-[115px] rounded-lg bg-searchBg flex justify-center items-center bg-cover bg-center bg-no-repeat group hover:bg-gray-100 hover:cursor-pointer outline transition-colors outline-1 ${
        cover
          ? 'hover:outline-[#111111] outline-transparent'
          : 'outline-[#111111] hover:outline-[#555555]'
      }`}
      style={{
        backgroundImage: `url(${cover || editBoardPrevData?.cover})`,
      }}
      onClick={handleOpenModal}
    >
      <span
        className={`${
          cover || editBoardPrevData?.cover
            ? 'group-hover:block hidden'
            : 'block'
        }`}
      >
        <PlusIcon
          svgClassName={`stroke-[#111111] ${
            !cover && !editBoardPrevData?.cover
              ? 'group-hover:stroke-[#555555]'
              : 'group-hover:stroke-[#111111]'
          } transition-colors`}
        />
      </span>
    </div>
  );
};
