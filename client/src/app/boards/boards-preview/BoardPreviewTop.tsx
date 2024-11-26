import BoardCollage from './BoardCollage';
import BoardCover from './BoardCover';
import BoardPreviewEditButton from './BoardPreviewEditButton';

interface Props {
  cover?: string;
  collage?: string[];
  itsYours?: boolean;
  boardID: string;
}

const BoardPreviewTop = ({
  cover,
  collage,
  itsYours = true,
  boardID,
}: Props) => {
  return (
    <article className='rounded-md w-full board-preview-top relative hover:cursor-pointer'>
      {cover ? (
        <BoardCover cover={cover} />
      ) : (
        <BoardCollage collage={collage} />
      )}
      {itsYours && <BoardPreviewEditButton boardID={boardID} />}
    </article>
  );
};

export default BoardPreviewTop;
