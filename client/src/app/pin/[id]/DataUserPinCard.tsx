import AvatarUser from '@/app/interfaces/layout/Header/Avatar/AvatarUser';
import Follow from '@/app/account-search/Follow';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRouter } from 'next/navigation';
import LabelsPin from './LabelsPin';

const DataUserPinCard = () => {
  const { pinData, dataSearchUserProfile, getSearchUserProfile } =
    useAppsStore();

  const router = useRouter();

  const handleClickSearchUser = () => {
    getSearchUserProfile(pinData.username);
    router.push(`/${pinData.username}`);
  };

  return (
    <div className='p-2 mt-12'>
      <div>
        <h2 className='text-[22px] font-bold'>
          {pinData.title ? `${pinData.title}` : `${pinData.alt_text}`}{' '}
        </h2>
        <div className='flex flex-row justify-between mt-2 '>
          <div
            className={`flex flex-row gap-2  w-full ${
              pinData.followers === '0' && 'items-center'
            }`}
          >
            <div onClick={handleClickSearchUser}>
              <AvatarUser
                textSize='15'
                data={pinData}
                classProps='w-[45px] h-[45px]'
              />
            </div>
            <div>
              <h4
                className='font-semibold text-sm cursor-pointer'
                onClick={handleClickSearchUser}
              >
                {pinData.username
                  ? `${pinData.username}`
                  : `${pinData.name} ${pinData.surname}`}
              </h4>
              {pinData.followers !== '0' && (
                <span className='text-[13px]'>
                  {pinData.followers}{' '}
                  {pinData.followers === '1' ? 'Seguidor' : 'Seguidores'}
                </span>
              )}
            </div>
          </div>
          <Follow
            classPropsFalseIsFollowing='bg-white  border-[1px] text-black  hover:bg-transparent'
            classPropsTrueIsFollowing='bg-white text-black  border-[1px] '
            id={dataSearchUserProfile.id}
            following={dataSearchUserProfile.following}
          />
        </div>
        <p className='text-[13px] mt-2'>{pinData.description}</p>
      </div>
      <LabelsPin />
      <hr className='w-full h-[1px] mt-5' />
    </div>
  );
};

export default DataUserPinCard;
