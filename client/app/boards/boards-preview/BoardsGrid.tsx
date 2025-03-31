import Grid from '../../interfaces/components/Basic/Grid';
import BoardPreview from './BoardPreview';
import { IBoardPreview, IUserBoard } from '../../domain/types/boards-interface';

interface Props {
  boards: IUserBoard[];
}

const BoardsGrid = ({ boards }: Props) => {
  return (
    <Grid className='boards-grid mt-4'>
      {boards.map((board: IUserBoard) => (
        <BoardPreview key={board.id} props={board} />
      ))}
    </Grid>
  );
};

export default BoardsGrid;
