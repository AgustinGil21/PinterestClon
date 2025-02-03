import { IBoardPreview } from '@/app/domain/types/boards-interface';
import BoardPreviewBottom from './BoardPreviewBottom';
import BoardPreviewTop from './BoardPreviewTop';

interface Data {
  id: string;
  name: string;
  created_at: Date | string;
  pins_count: number;
  cover?: string;
  collage?: (string | undefined)[];
  its_yours?: boolean;
}

interface BoardsPreviewProps {
  props: IBoardPreview;
}

const BoardPreview = ({ props }: BoardsPreviewProps) => {
  const { id, name, created_at, pins_count, cover, collage, its_yours } = props;

  return (
    <section className='w-full h-fit'>
      <BoardPreviewTop
        cover={cover}
        collage={collage}
        itsYours={its_yours ? true : false}
        boardID={id}
      />
      <BoardPreviewBottom
        name={name}
        createdAt={created_at}
        pins={pins_count}
      />
    </section>
  );
};

export default BoardPreview;
