import { ListOfBoards } from './BoardsListResults';

interface Props {
  board: ListOfBoards;
}

const BoardListCard = ({ board }: Props) => {
  let url: string;

  if (board.cover) {
    url = board.cover;
  } else if (!board?.cover && board?.collage?.[0]) {
    url = board.collage[0];
  } else {
    url = '';
  }

  return (
    <li className='flex items-center p-2 hover:bg-[#e9e9e9] hover:cursor-pointer w-full justify-between rounded-xl gap-2 group'>
      <div className='flex items-center gap-2 overflow-hidden '>
        <div
          className='size-[48px] min-w-[48px] min-h-[48px] rounded-md bg-cover bg-center bg-no-repeat bg-[#e9e9e9] group-hover:bg-white'
          style={{
            backgroundImage: `url('${url}')`,
          }}
        ></div>
        <h3
          className='font-semibold text-ellipsis whitespace-nowrap overflow-hidden max-w-[175px] text-[0.93rem]'
          title={board.name}
        >
          {board.name}
        </h3>
      </div>
      <button className='p-[0.5rem_1rem] bg-[#e60023] rounded-3xl text-white font-bold text-[0.9rem]  hover:bg-[#b60000] transition-colors min-w-[67px]'>
        Guardar
      </button>
    </li>
  );
};

export default BoardListCard;
