import LinkNavigate from '@/app/components/Header/LinkNavigate';
import BoardCollage from './BoardCollage';
import BoardCover from './BoardCover';
import BoardPreviewEditButton from './BoardPreviewEditButton';

interface Props {
  cover?: string;
  collage?: (string | undefined)[];
  itsYours?: boolean;
  boardID: string;
}

const BoardPreviewTop = ({
  cover,
  collage,
  itsYours = false,
  boardID,
}: Props) => {
  return (
    <LinkNavigate href={`/board/${boardID}`}>
      <article className='rounded-md w-full board-preview-top relative hover:cursor-pointer'>
        {cover ? (
          <BoardCover cover={cover} />
        ) : (
          <BoardCollage collage={collage} />
        )}
        {itsYours && <BoardPreviewEditButton boardID={boardID} />}
      </article>
    </LinkNavigate>
  );
};

export default BoardPreviewTop;
