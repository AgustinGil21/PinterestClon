import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import { useState } from 'react';

interface FollowingInterface {
  following?: boolean;
  id: string;
  classPropsTrueIsFollowing: string;
  classPropsFalseIsFollowing: string;
}

const Follow = ({
  following,
  id,
  classPropsTrueIsFollowing,
  classPropsFalseIsFollowing,
}: FollowingInterface) => {
  const { postFollowUser, openRegisterModal, isAuth } = useAppsStore();

  const [isFollowing, setFollowing] = useState(following);

  const handleClick = () => {
    if (!isAuth) {
      openRegisterModal();
      return;
    }
    console.log(id);
    postFollowUser(id);
    setFollowing(!isFollowing);
  };

  return (
    <ButtonStyled
      className={`  font-semibold  py-2 px-4  ${
        isFollowing
          ? `${classPropsTrueIsFollowing}  `
          : `${classPropsFalseIsFollowing} `
      }  `}
      handleClick={handleClick}
    >
      {isFollowing ? 'Siguiendo' : 'Seguir'}
    </ButtonStyled>
  );
};

export default Follow;
