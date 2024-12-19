import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import { useState } from 'react';

interface FollowingInterface {
  following?: boolean;
  id: string;
}

const Follow = ({ following, id }: FollowingInterface) => {
  const {
    postFollowUser,
    dataSearchUserProfile,
    isFollowingsModalOpen,
    isFollowerModalOpen,
  } = useAppsStore();

  const [isFollowing, setFollowing] = useState(following);

  const handleClick = () => {
    if (id) {
      postFollowUser(id);
      setFollowing(!isFollowing);
    } else {
      // console.log(id);
      // console.log(following);
      postFollowUser(dataSearchUserProfile.id);
      setFollowing(!isFollowing);
    }
  };

  return (
    <ButtonStyled
      className={`  font-semibold  py-2 px-4 text-white ${
        isFollowing
          ? 'bg-black rounded-full   '
          : 'bg-redPinterestBg rounded-full hover:bg-red-800'
      }`}
      handleClick={handleClick}
    >
      {isFollowing ? 'Siguiendo' : 'Seguir'}
    </ButtonStyled>
  );
};

export default Follow;
