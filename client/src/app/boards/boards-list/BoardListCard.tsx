import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { ListOfBoards } from './BoardsListResults';
import LinkNavigate from '@/app/components/Header/LinkNavigate';

interface Props {
  board: ListOfBoards;
}

const BoardListCard = ({ board }: Props) => {
  const {
    dataOpenBoardModal,
    addPinToBoard,
    closeDynamicModal,
    getLastBoard,
    setToastNotification,
    t,
  } = useAppsStore();
  const { pinId } = dataOpenBoardModal;

  let url: string;

  if (board.cover) {
    url = board.cover;
  } else if (!board?.cover && board?.collage) {
    url = board.collage;
  } else {
    url = '';
  }

  const handleSavePinToBoard = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addPinToBoard({ pinId, boardId: board.id });
    closeDynamicModal();
    getLastBoard();
    setToastNotification({
      status: 'success',
      type: 'pin',
      action: 'save',
    });
  };

  const handleLinkOnClick = () => {
    closeDynamicModal();
  };

  return (
    <LinkNavigate href={`/board/${board.id}`} handleClick={handleLinkOnClick}>
      <div className='flex items-center p-2 hover:bg-[#e9e9e9] hover:cursor-pointer w-full justify-between rounded-xl gap-2 group'>
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
        <button
          className='p-[0.5rem_1rem] bg-[#e60023] rounded-3xl text-white font-bold text-[0.9rem] hover:bg-[#b60000] transition-colors min-w-[67px] hidden group-hover:block'
          onClick={(e: React.MouseEvent) => handleSavePinToBoard(e)}
        >
          {t?.['boards-list'].save || 'Guardar'}
        </button>
      </div>
    </LinkNavigate>
  );
};

export default BoardListCard;
