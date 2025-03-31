import { useEffect } from 'react';
import Masonry from '../../interfaces/components/Basic/Masonry';
import CoverCard from './CoverCard';
import { useAppsStore } from '../../infrastructure/stores/useAppStore';
import { IBoardCover } from '../../domain/types/boards-interface';

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
  );
};

export default CoverList;
