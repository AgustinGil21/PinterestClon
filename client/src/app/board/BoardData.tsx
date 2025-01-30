import InteractionSummary from '../components/Basic/InteractionSummary';
import { IBoard } from '../domain/types/boards-interface';
import { CommentTextExtend } from '../pin/[id]/CommentTextExtend';

interface Props {
  board: IBoard;
}

export const BoardData = ({ board }: Props) => {
  return (
    <div className='flex flex-col gap-2  max-w-[640px] whitespace-normal min-w-[300px] w-full md:items-start items-center'>
      <h2 className='text-xl md:text-3xl font-medium'>{board.name}</h2>
      {board.description && <CommentTextExtend text={board.description} />}
      <InteractionSummary
        value={board.pins_count}
        type='pins'
        numberFirst
        sentenceCase
        className='flex gap-1 text-[#8d8d8d] mt-0 md:mt-2'
      />
    </div>
  );
};
