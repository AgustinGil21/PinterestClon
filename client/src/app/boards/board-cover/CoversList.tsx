import Masonry from '@/app/interfaces/components/Basic/Masonry';
import CoverCard from './CoverCard';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { IBoardCover } from '@/app/domain/types/boards-interface';
import { useEffect } from 'react';

interface Props {
  pins: IBoardCover[];
  results?: number;
}

const CoverList = ({ pins }: Props) => {
  const {
    setNewBoardCover,
    newBoardCover,
    setBoardCoversModalIsOpen,
    editBoardPrevData,
  } = useAppsStore();

  const handleSelect = (body: string) => {
    setNewBoardCover(body);
    setBoardCoversModalIsOpen();
  };

  useEffect(() => {
    if (editBoardPrevData.cover) {
      setNewBoardCover(editBoardPrevData.cover);
    }
  }, [editBoardPrevData.cover]);

  return (
    <>
      {pins.length ? (
        <Masonry small>
          {pins.map(({ body, id }) => (
            <CoverCard
              key={id}
              cover={body}
              isSelected={newBoardCover === body}
              onSelect={() => handleSelect(body)}
            />
          ))}
        </Masonry>
      ) : (
        <span className='self-center justify-self-center mt-10 text-xl font-semibold text-[#b3b3b3]'>
          No hay pines disponibles
        </span>
      )}
    </>
  );
};

export default CoverList;
