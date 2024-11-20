import { useAppsStore } from '../infrastructure/stores/useAppStore';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';

const Follow = () => {
  const { postFollowUser, dataSearchUserProfile } = useAppsStore();

  const handleClick = () => {
    postFollowUser(dataSearchUserProfile.id);
  };

  return (
    <ButtonStyled
      className={` ${
        dataSearchUserProfile.following
          ? 'bg-black rounded-full text-white font-semibold py-3 px-4'
          : 'bg-redPinterestBg rounded-full text-white font-semibold py-3 px-4 hover:bg-red-800'
      }`}
      handleClick={handleClick}
    >
      {dataSearchUserProfile.following ? 'Siguiendo' : 'Seguir'}
    </ButtonStyled>
  );
};

export default Follow;
