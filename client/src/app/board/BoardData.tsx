import InteractionSummary from '../components/Basic/InteractionSummary';
import { IBoard } from '../domain/types/boards-interface';
import { CommentTextExtend } from '../pin/[id]/CommentTextExtend';
import { BoardUserData } from './BoardUserData';

interface Props {
  board: IBoard;
}

export const BoardData = ({ board }: Props) => {
  return (
    <div className='flex flex-col gap-2  max-w-[640px] whitespace-normal min-w-[300px] w-full items-start '>
      <div className='flex gap-2 items-center'>
        <h2 className='text-xl md:text-3xl font-medium max-w-[180px] md:max-w-[400px] text-nowrap overflow-hidden text-ellipsis'>
          {board.name}
        </h2>
        <span className='text-[#8d8d8d] text-sm md:text-lg'>●</span>
        <InteractionSummary
          value={board.pins_count}
          type='pins'
          numberFirst
          sentenceCase
          className='flex gap-1 text-[#8d8d8d] md:text-lg items-center text-sm'
        />
      </div>
      {board.description && <CommentTextExtend text={board.description} />}
    </div>
  );
};
