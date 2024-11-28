import BoardListCard from './BoardListCard';

export interface ListOfBoards {
  name: string;
  cover?: string;
  collage?: string[];
  id: string;
}

interface Props {
  value?: string;
  lang?: string;
  boards: ListOfBoards[];
}

const BoardsListResults = ({ value, lang = 'en', boards }: Props) => {
  const filteredBoards = value
    ? boards.filter((board) =>
        board.name.toLowerCase().includes(value.toLowerCase())
      )
    : boards;

  return (
    <ul className='w-full'>
      {filteredBoards.map((board) => (
        <BoardListCard key={board.id} board={board} />
      ))}
    </ul>
  );
};

export default BoardsListResults;
