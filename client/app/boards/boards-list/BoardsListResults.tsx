import BoardListCard from './BoardListCard';

export interface ListOfBoards {
  name: string;
  cover?: string;
  collage?: string;
  id: string;
}

interface Props {
  value?: string;
  boards: ListOfBoards[];
  pinID: string;
  closeBoardsList: () => void;
}

const BoardsListResults = ({
  value,
  boards,
  pinID,
  closeBoardsList,
}: Props) => {
  const filteredBoards = value
    ? boards.filter((board) =>
        board.name.toLowerCase().includes(value.toLowerCase())
      )
    : boards;

  return (
    <ul className='w-full'>
      {filteredBoards.map((board) => (
        <BoardListCard
          key={board.id}
          board={board}
          pinID={pinID}
          closeBoardsList={closeBoardsList}
        />
      ))}
    </ul>
  );
};

export default BoardsListResults;
