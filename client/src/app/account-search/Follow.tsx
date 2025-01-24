import { useState } from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';

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
  const { postFollowUser, openRegisterModal, isAuth, t } = useAppsStore();

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
      className={` min-w-[76px] follow-btn font-semibold  py-2 px-4 transition-colors ${
        isFollowing
          ? `${classPropsTrueIsFollowing}  `
          : `${classPropsFalseIsFollowing} `
      }  `}
      handleClick={handleClick}
    >
      {isFollowing
        ? t?.user.buttons.following || 'Siguiendo'
        : t?.user.buttons.follow || 'Seguir'}
    </ButtonStyled>
  );
};

export default Follow;
