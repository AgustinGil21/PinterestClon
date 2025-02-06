import Grid from '@/app/interfaces/components/Basic/Grid';
import BoardPreview from './BoardPreview';
import { IBoardPreview } from '@/app/domain/types/boards-interface';

interface Props {
  boards: IBoardPreview[];
}

const BoardsGrid = ({ boards }: Props) => {
  return (
    <Grid className='boards-grid mt-4'>
      {boards.map((board: IBoardPreview) => (
        <BoardPreview key={board.id} props={board} />
      ))}
    </Grid>
  );
};

export default BoardsGrid;
