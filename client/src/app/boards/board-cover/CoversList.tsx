import Masonry from '@/app/interfaces/components/Basic/Masonry';
import CoverCard from './CoverCard';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { IBoardCover } from '@/app/domain/types/boards-interface';

interface Props {
  pins: IBoardCover[];
  results?: number;
}

const CoverList = ({ pins }: Props) => {
  const { setNewBoardCover, newBoardCover, setBoardCoversModalIsOpen } =
    useAppsStore();

  const handleSelect = (body: string) => {
    setNewBoardCover(body);
    setBoardCoversModalIsOpen();
  };

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
        <span>NO HAY COVERS DISPONIBLES</span>
      )}
    </>
  );
};

export default CoverList;
