import DownloadShare from '@/app/account-search/DownloadShare';
import Tooltip from '@/app/components/Header/ToolTip';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import LikeIcon from '@/app/interfaces/components/icons/LikeIcon';
import ThreePointsIcon from '@/app/interfaces/components/icons/ThreePointsIcon';
import LikeActiveIcon from '@/app/interfaces/components/icons/LikeActiveIcon';
import { useState } from 'react';
import Counter from '@/app/components/Basic/Counter';
import SavePin from './SavePin';

const ActionsPin = () => {
  const {
    isThreePointsAccountOpen,
    pinData,
    postLikeOrUnlike,
    isAuth,
    openRegisterModal,
    postSavePin,
  } = useAppsStore();

  const [likes, setLikes] = useState(Number(pinData.likes));
  const [renders, setRenders] = useState(1);
  const [alreadyLiked, setAlreadyLiked] = useState(pinData.already_liked);

  const toggleLike = () => {
    if (!isAuth) {
      openRegisterModal();
      return;
    }
    setAlreadyLiked(!alreadyLiked);
    setLikes((prev) => prev + (alreadyLiked ? -1 : 1));

    postLikeOrUnlike(pinData.id);
    setRenders((prev) => prev + 1);
  };

  return (
    <div className='flex justify-between flex-row'>
      <div className='flex flex-row gap-1 items-center'>
        <div className='flex flex-row items-center'>
          <Tooltip tooltipText='Reaccionar'>
            <div
              className='p-2 hover:bg-gray-200 rounded-full cursor-pointer h-[35px] w-[35px] flex justify-center items-center'
              onClick={toggleLike}
            >
              {alreadyLiked ? (
                <LikeActiveIcon
                  classProps={`${
                    renders > 1 ? 'like-btn-active-animated' : ''
                  } w-[20px] h-[20px]`}
                />
              ) : (
                <LikeIcon
                  classProps={` ${
                    renders > 1 ? 'like-btn-animated' : ''
                  } w-[20px] h-[20px]`}
                />
              )}
            </div>
          </Tooltip>
          {likes > 0 && (
            <Counter
              value={likes}
              className='text-[12px] font-semibold ml-[-3px] mr-2'
            />
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
      <SavePin />
    </div>
  );
};

export default ActionsPin;
