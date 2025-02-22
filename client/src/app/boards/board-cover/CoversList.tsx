import Masonry from '@/app/interfaces/components/Basic/Masonry';
import CoverCard from './CoverCard';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface BoardCover {
  id: string;
  body: string;
}

interface Props {
  pins: BoardCover[];
  results?: number;
}

const CoverList = ({ pins }: Props) => {
  const { setNewBoardCover, newBoardCover } = useAppsStore();

  const handleSelect = (body: string) => setNewBoardCover(body);

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
