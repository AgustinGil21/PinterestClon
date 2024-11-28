import Masonry from '@/app/interfaces/components/Basic/Masonry';
import CoverCard from './CoverCard';

interface BoardCover {
  id: string;
  body: string;
}

interface Props {
  pins: BoardCover[];
  results: number;
}

const CoverList = ({ pins }: Props) => {
  return (
    <Masonry>
      {pins.map(({ body, id }) => (
        <CoverCard key={id} cover={body} />
      ))}
    </Masonry>
  );
};

export default CoverList;
