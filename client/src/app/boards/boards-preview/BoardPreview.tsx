import BoardPreviewBottom from './BoardPreviewBottom';
import BoardPreviewTop from './BoardPreviewTop';

interface Data {
  id?: string;
  name: string;
  created_at: Date | string;
  pins_count: number;
  cover?: string;
  collage?: string[];
  its_yours?: boolean;
}

interface BoardsPreviewProps {
  data: Data;
}

const BoardPreview = ({ data }: BoardsPreviewProps) => {
  const { id, name, created_at, pins_count, cover, collage, its_yours } = data;

  return (
    <section className='w-[247.6px]'>
      <BoardPreviewTop
        cover={cover}
        collage={collage}
        itsYours={its_yours}
        boardID='dadadak'
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
