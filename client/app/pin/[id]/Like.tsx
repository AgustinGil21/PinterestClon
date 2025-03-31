import { useState } from 'react';
import Tooltip from '../../components/Header/ToolTip';
import Counter from '../../components/Basic/Counter';
import LikeActiveIcon from '../../interfaces/components/icons/LikeActiveIcon';
import LikeIcon from '../../interfaces/components/icons/LikeIcon';
import { useAppsStore } from '../../infrastructure/stores/useAppStore';

const Like = () => {
  const { pinData, isAuth, postLikeOrUnlike, openRegisterModal, t } =
    useAppsStore();

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
    <div className='flex flex-row items-center'>
      {/* <Tooltip tooltipText={t?.pin.like || 'Reaccionar'}> */}
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
      {/* </Tooltip> */}
      {likes > 0 && (
        <Counter
          value={likes}
          className='text-[12px] font-semibold ml-[-3px] mr-2'
        />
      )}
    </div>
  );
};

export default Like;
