import { useState } from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { IPinBoard } from '../domain/types/pins-structure';

interface Props {
  pinId?: string;
  alreadySaved: boolean;
  board?: IPinBoard;
  savedInProfile: boolean;
}

export const SavePinBtn = ({
  pinId,
  alreadySaved,
  board,
  savedInProfile,
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
  const [saved, setSaved] = useState(alreadySaved);

  const handleSavePin = () => {
    if (!isAuth) {
      openRegisterModal;
      return;
    }
    if (!pinId) return;

    if (saved) {
      if (savedInProfile) {
        removePinFromProfile(pinId);
      } else {
        if (!board?.id) return;
        removePinFromBoard({ pinId, boardId: board.id });
        setToastNotification({
          status: 'success',
          type: 'pin',
          action: 'remove',
        });
      }
    } else {
      if (lastBoard.id) {
        addPinToBoard({ pinId, boardId: lastBoard.id });
      } else {
        savePinToProfile(pinId);
      }
      setToastNotification({
        status: 'success',
        type: 'pin',
        action: 'save',
      });
    }
    setSaved(!saved);
  };

  return (
    <button
      className={`p-[0_1.5rem] h-[45px] save-button rounded-[24px] text-white text-sm ${
        saved
          ? 'bg-[#111111] hover:bg-[#222222]'
          : 'bg-[#e60023] hover:bg-[#b6031e]'
      } font-bold transition-colors `}
      onClick={handleSavePin}
    >
      {saved
        ? t?.pin['saved-btn'] || 'Guardado'
        : t?.pin['save-btn'] || 'Guardar'}
    </button>
  );
};
