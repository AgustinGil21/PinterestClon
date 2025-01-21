import { useAppsStore } from '../infrastructure/stores/useAppStore';

interface Props {
  pinId?: string;
}

export const SavePinBtn = ({ pinId }: Props) => {
  const { lastBoard, addPinToBoard, savePinToProfile } = useAppsStore();

  const handleSavePin = () => {
    if (!pinId) return;

    if (lastBoard.id) {
      addPinToBoard({ pinId, boardId: lastBoard.id });
    } else {
      savePinToProfile(pinId);
    }
  };

  return (
    <button
      className='p-[0_1.5rem] h-[45px] save-button rounded-[24px] text-white bg-[#e60023] font-bold transition-colors hover:bg-[#b6031e]'
      onClick={handleSavePin}
    >
      Guardar
    </button>
  );
};
