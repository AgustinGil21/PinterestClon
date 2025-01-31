import { IPinBoard } from '../domain/types/pins-structure';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { PinAlreadySaved } from './PinAlreadySaved';

interface Props {
  pinId?: string;
  pinBody: string;
  btnRef: React.RefObject<HTMLButtonElement>;
  pinCard?: boolean;
  savedInProfile?: boolean;
  board?: IPinBoard;
}

export const SavePinToBoardBtn = ({
  pinId,
  pinBody,
  btnRef,
  pinCard = false,
  savedInProfile = false,
  board,
}: Props) => {
  const {
    updateDataOpenBoardModal,
    lastBoard,
    setDynamicModal,
    isAuth,
    openRegisterModal,
    t,
    userPublicData,
  } = useAppsStore();

  const handleModalOpen = () => {
    if (!isAuth) {
      openRegisterModal();
      return;
    }
    if (pinId) updateDataOpenBoardModal(pinId, pinBody);

    setDynamicModal(btnRef, pinId || '');
  };

  return (
    <>
      {savedInProfile || board?.id ? (
        <PinAlreadySaved
          savedInProfile={savedInProfile}
          board={board}
          username={userPublicData?.username}
          pinCard={pinCard}
        />
      ) : (
        <button
          className={`save-to-board-button flex items-center justify-center h-[45px] p-[0_1rem] w-fit max-w-[110px] font-bold  bg-[rgba(0,0,0,0)] rounded-[24px] g-[0.3rem] transition-[colors,transform] hover:bg-[rgba(0,0,0,0.05)] focus:bg-black ${
            pinCard
              ? 'text-black focus:text-white'
              : ' focus:scale-[1.06] text-white'
          }`}
          onClick={handleModalOpen}
          ref={btnRef}
        >
          <span className='text-sm overflow-hidden whitespace-nowrap text-ellipsis'>
            {lastBoard.name
              ? lastBoard.name
              : t?.['boards-list'].profile || 'Perfil'}
          </span>
          <svg
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-4 h-4 ml-1'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m19.5 8.25-7.5 7.5-7.5-7.5'
            />
          </svg>
        </button>
      )}
    </>
  );
};
