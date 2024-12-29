import DownloadShare from '@/app/account-search/DownloadShare';
import Tooltip from '@/app/components/Header/ToolTip';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import LikeIcon from '@/app/interfaces/components/icons/LikeIcon';
import ThreePointsIcon from '@/app/interfaces/components/icons/ThreePointsIcon';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';

const ActionsPin = () => {
  const { isThreePointsAccountOpen, pinData } = useAppsStore();
  return (
    <div className='flex justify-between flex-row'>
      <div className='flex flex-row gap-1 items-center'>
        <div className='flex flex-row gap-1 items-center'>
          <Tooltip tooltipText='Reaccionar'>
            <div className='p-2 hover:bg-gray-200 rounded-full cursor-pointer'>
              <LikeIcon classProps='w-[20px] h-[20px]' />
            </div>
          </Tooltip>
          {pinData.likes !== '0' && <span>{pinData.likes}</span>}
        </div>
        <DownloadShare classProps='p-2' dataShare={`pin/${pinData.id}`} />
        <Tooltip tooltipText='Más opciones'>
          <div className='p-2 hover:bg-gray-200 rounded-full cursor-pointer'>
            <ThreePointsIcon
              isThreePointsAccountOpen={isThreePointsAccountOpen}
            />
          </div>
        </Tooltip>
      </div>
      <ButtonStyled className='bg-redPinterestBg text-white font-semibold py-3 hover:bg-red-800 '>
        Guardar
      </ButtonStyled>
    </div>
  );
};

export default ActionsPin;
