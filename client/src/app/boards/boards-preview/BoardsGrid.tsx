import Grid from '@/app/interfaces/components/Basic/Grid';
import BoardPreview from './BoardPreview';

interface Board {
  id: string;
  name: string;
  created_at: Date | string;
  pins_count: number;
  cover?: string;
  collage?: string[];
  its_yours?: boolean;
}

interface Props {
  boards: Board[];
}

const BoardsGrid = ({ boards }: Props) => {
  return (
    <Grid>
      {boards.map((board) => (
        <BoardPreview key={board.id} props={board} />
      ))}
    </Grid>
  );
};

export default BoardsGrid;
