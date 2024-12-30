import DownloadShare from '@/app/account-search/DownloadShare';
import Tooltip from '@/app/components/Header/ToolTip';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import LikeIcon from '@/app/interfaces/components/icons/LikeIcon';
import ThreePointsIcon from '@/app/interfaces/components/icons/ThreePointsIcon';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import LikeActiveIcon from '@/app/interfaces/components/icons/LikeActiveIcon';
import { useState } from 'react';

const ActionsPin = () => {
  const {
    isThreePointsAccountOpen,
    pinData,
    postLikeOrUnlike,
    isAuth,
    openRegisterModal,
  } = useAppsStore();

  const [likes, setLikes] = useState(Number(pinData.likes));
  const [alreadyLiked, setAlreadyLiked] = useState(pinData.already_liked);

  const toggleLike = () => {
    if (!isAuth) {
      openRegisterModal();
      return;
    }
    setAlreadyLiked(!alreadyLiked);
    setLikes((prev) => prev + (alreadyLiked ? -1 : 1));

    postLikeOrUnlike(pinData.id);
  };

  return (
    <div className='flex justify-between flex-row'>
      <div className='flex flex-row gap-1 items-center'>
        <div className='flex flex-row items-center'>
          <Tooltip tooltipText='Reaccionar'>
            <div
              className='p-2 hover:bg-gray-200 rounded-full cursor-pointer'
              onClick={toggleLike}
            >
              {alreadyLiked ? (
                <LikeActiveIcon classProps='w-[20px] h-[20px]' />
              ) : (
                <LikeIcon classProps='w-[20px] h-[20px]' />
              )}
            </div>
          </Tooltip>
          {likes > 0 && (
            <span className='text-[12px] font-semibold ml-[-3px]'>{likes}</span>
          )}
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
