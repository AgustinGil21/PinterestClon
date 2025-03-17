import { IUserBoard } from '@/app/domain/types/boards-interface';
import BoardPreviewBottom from './BoardPreviewBottom';
import BoardPreviewTop from './BoardPreviewTop';

interface BoardsPreviewProps {
  props: IUserBoard;
}

const BoardPreview = ({ props }: BoardsPreviewProps) => {
  const { id, name, created_at, pins_count, cover, collage, its_yours } = props;

  return (
    <section className='min-w-[190px] max-w-[247.6px] w-full h-fit'>
      <BoardPreviewTop
        cover={cover}
        collage={collage}
        itsYours={its_yours ? true : false}
        boardID={id}
        boardName={name}
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
