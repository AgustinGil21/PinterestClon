import LinkNavigate from '@/app/components/Header/LinkNavigate';
import ClockIcon from '@/app/components/icons/ClockIcon';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface Props {
  pinID: string;
  closeBoardsList: () => void;
}

const BoardListProfileCard = ({ pinID, closeBoardsList }: Props) => {
  const {
    savePinToProfile,
    t,
    setToastNotification,
    userPublicData,
    setSavedPinObj,
  } = useAppsStore();

  const handleSavePinToProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    savePinToProfile(pinID);
    if (setSavedPinObj) {
      setSavedPinObj({
        alreadySaved: true,
        savedInProfile: true,
      });
    }
    closeBoardsList();
    setToastNotification({
      status: 'success',
      type: 'pin',
      action: 'save',
    });
  };

  const handleLinkOnClick = () => {
    closeBoardsList();
  };

  return (
    <LinkNavigate
      href={`/${userPublicData?.username}`}
      handleClick={handleLinkOnClick}
    >
      <div className='flex items-center p-2 hover:bg-[#e9e9e9] hover:cursor-pointer w-full justify-between rounded-xl gap-2 group '>
        <div className='flex items-center gap-2 overflow-hidden '>
          <div className='size-[48px] rounded-md flex justify-center items-center bg-[#e9e9e9] group-hover:bg-white'>
            <ClockIcon svgClassName='size-[1.35rem]' />
          </div>
          <h3 className='font-semibold text-ellipsis whitespace-nowrap overflow-hidden max-w-[175px] text-[0.93rem]'>
            {t?.['boards-list'].profile || 'Perfil'}
          </h3>
        </div>
        <button
          className='p-[0.5rem_1rem] bg-[#e60023] rounded-3xl text-white font-bold text-[0.9rem] hover:bg-[#b60000] transition-colors min-w-[67px] hidden group-hover:block'
          onClick={(e: React.MouseEvent) => handleSavePinToProfile(e)}
        >
          {t?.['boards-list'].save || 'Guardar'}
        </button>
      </div>
    </LinkNavigate>
  );
};

export default BoardListProfileCard;
