import AvatarUser from '../interfaces/layout/Header/Avatar/AvatarUser';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import Follow from '../account-search/Follow';
import { FollowersInterface } from '../domain/types/data-users';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useRouter } from 'next/navigation';

interface UserFollowCardInterface {
  elem: FollowersInterface;
  openFollowersModal: () => void;
}

const UserFollowFollowingCard = ({
  elem,
  openFollowersModal,
}: UserFollowCardInterface) => {
  const { getSearchUserProfile, updateDataSearch } = useAppsStore();
  const router = useRouter();

  const handleClick = () => {
    getSearchUserProfile(elem.username);
    router.push(`/${elem.username}`);
    updateDataSearch('value', '');
    openFollowersModal();
  };

  return (
    <div
      key={elem.id}
      className='p-2 flex justify-between items-center flex-row cursor-pointer'
    >
      <div className='flex items-center gap-3 '>
        <AvatarUser
          data={elem}
          textSize='text-[15px]'
          classProps='w-[44px] h-[44px]'
        />

        <div
          className='group font-semibold text-[12.5px]'
          onClick={handleClick}
        >
          {elem.name ? (
            <span className='group-hover:underline group-hover:underline-offset-1 cursor-pointer'>
              {elem.name} {elem.surname}
            </span>
          ) : (
            <span className='group-hover:underline group-hover:underline-offset-1 cursor-pointer'>
              {elem.username}
            </span>
          )}
        </div>
      </div>
      <div>
        {elem.its_you ? (
          <ButtonStyled
            className='bg-gray-200 font-semibold text-[9.8px] cursor-pointer text-gray-400'
            disabled={true}
          >
            ¡Eres tú!
          </ButtonStyled>
        ) : (
          <Follow
            following={elem.following}
            id={elem.id}
            classPropsFalseIsFollowing='bg-redPinterestBg rounded-full hover:bg-red-800 text-white'
            classPropsTrueIsFollowing='bg-black rounded-full text-white'
          />
        )}
      </div>
    </div>
  );
};

export default UserFollowFollowingCard;
