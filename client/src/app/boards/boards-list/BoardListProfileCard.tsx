import ClockIcon from '@/app/components/icons/ClockIcon';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

const BoardListProfileCard = () => {
  const { dataOpenBoardModal, savePinToProfile, closeDynamicModal } =
    useAppsStore();
  const { pinId } = dataOpenBoardModal;

  const handleSavePinToProfile = () => {
    savePinToProfile(pinId);
    closeDynamicModal();
  };

  return (
    <li className='flex items-center p-2 hover:bg-[#e9e9e9] hover:cursor-pointer w-full justify-between rounded-xl gap-2 group '>
      <div className='flex items-center gap-2 overflow-hidden '>
        <div className='size-[48px] rounded-md flex justify-center items-center bg-[#e9e9e9] group-hover:bg-white'>
          <ClockIcon svgClassName='size-[1.35rem]' />
        </div>
        <h3 className='font-semibold text-ellipsis whitespace-nowrap overflow-hidden max-w-[175px] text-[0.93rem]'>
          Perfil
        </h3>
      </div>
      <button
        className='p-[0.5rem_1rem] bg-[#e60023] rounded-3xl text-white font-bold text-[0.9rem]  hover:bg-[#b60000] transition-colors min-w-[67px]'
        onClick={handleSavePinToProfile}
      >
        Guardar
      </button>
    </li>
  );
};

export default BoardListProfileCard;
