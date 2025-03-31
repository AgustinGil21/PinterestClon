import LinkNavigate from '../../components/Header/LinkNavigate';
import BoardCollage from './BoardCollage';
import BoardCover from './BoardCover';
import BoardPreviewEditButton from './BoardPreviewEditButton';

interface Props {
  cover?: string;
  collage?: (string | undefined)[];
  itsYours?: boolean;
  boardID: string;
  boardName: string;
}

const BoardPreviewTop = ({
  cover,
  collage,
  itsYours = false,
  boardID,
  boardName,
}: Props) => {
  return (
    <LinkNavigate href={`/board/${boardID}`}>
      <article className='rounded-md w-full board-preview-top relative hover:cursor-pointer'>
        {cover ? (
          <BoardCover cover={cover} boardName={boardName} />
        ) : (
          <BoardCollage collage={collage} />
        )}
        {itsYours && <BoardPreviewEditButton boardID={boardID} />}
      </article>
    </LinkNavigate>
  );
};

export default BoardPreviewTop;
