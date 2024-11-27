import BoardPreviewBottom from './BoardPreviewBottom';
import BoardPreviewTop from './BoardPreviewTop';

interface Data {
  id: string;
  name: string;
  created_at: Date | string;
  pins_count: number;
  cover?: string;
  collage?: string[];
  its_yours?: boolean;
}

interface BoardsPreviewProps {
  props: Data;
}

const BoardPreview = ({ props }: BoardsPreviewProps) => {
  const {
    id,
    name,
    created_at,
    pins_count,
    cover,
    collage,
    its_yours = false,
  } = props;

  return (
    <section className='w-[247.6px]'>
      <BoardPreviewTop
        cover={cover}
        collage={collage}
        itsYours={its_yours}
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
