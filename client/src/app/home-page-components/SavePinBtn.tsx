import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { IButtonsPinSaved, IPinBoard } from '../domain/types/pins-structure';

interface Props {
  pinId?: string;
  alreadySaved: boolean;
  board?: IPinBoard;
  savedInProfile: boolean;
  saved: IButtonsPinSaved;
  setSaved: (object: IButtonsPinSaved) => void;
}

export const SavePinBtn = ({
  pinId,
  alreadySaved,
  board,
  savedInProfile,
  saved,
  setSaved,
}: Props) => {
  const {
    lastBoard,
    addPinToBoard,
    savePinToProfile,
    isAuth,
    openRegisterModal,
    t,
    setToastNotification,
    removePinFromProfile,
    removePinFromBoard,
  } = useAppsStore();

  const handleSavePin = () => {
    if (!isAuth) {
      openRegisterModal;
      return;
    }
    if (!pinId) return;

    if (saved.alreadySaved) {
      if (savedInProfile) {
        removePinFromProfile(pinId);
        setSaved({
          alreadySaved: false,
          savedInProfile: false,
        });
      } else {
        if (!board?.id) return;
        removePinFromBoard({ pinId, boardId: board.id });
        setSaved({
          alreadySaved: false,
          savedInProfile: false,
        });
        setToastNotification({
          status: 'success',
          type: 'pin',
          action: 'remove',
        });
      }
    } else {
      if (lastBoard.id) {
        addPinToBoard({ pinId, boardId: lastBoard.id });
        setSaved({
          alreadySaved: true,
          board: {
            id: lastBoard.id,
            name: lastBoard.name,
          },
          savedInProfile: false,
        });
      } else {
        savePinToProfile(pinId);
        setSaved({
          alreadySaved: true,
          savedInProfile: true,
        });
      }
      setToastNotification({
        status: 'success',
        type: 'pin',
        action: 'save',
      });
    }
  };

  return (
    <button
      className={`p-[0_1.5rem] h-[45px] save-button rounded-[24px] text-white text-sm ${
        saved.alreadySaved
          ? 'bg-[#111111] hover:bg-[#222222]'
          : 'bg-[#e60023] hover:bg-[#b6031e]'
      } font-bold transition-colors `}
      onClick={handleSavePin}
    >
      {saved.alreadySaved
        ? t?.pin['saved-btn'] || 'Guardado'
        : t?.pin['save-btn'] || 'Guardar'}
    </button>
  );
};
