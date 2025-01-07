import AvatarUser from '@/app/interfaces/layout/Header/Avatar/AvatarUser';
import Follow from '@/app/account-search/Follow';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useRouter } from 'next/navigation';
import LabelsPin from './LabelsPin';
import { useEffect } from 'react';
import SingularOrPlural from '@/app/components/Basic/SingularOrPlural';
import InteractionSummary from '@/app/components/Basic/InteractionSummary';

const DataUserPinCard = () => {
  const { pinData, getSearchUserProfile, getPinView } = useAppsStore();

  const router = useRouter();

  const handleClickSearchUser = () => {
    getSearchUserProfile(pinData.username);
    router.push(`/${pinData.username}`);
  };

  return (
    <div className='py-2 '>
      <div className='flex flex-col gap-1'>
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
                {pinData.name
                  ? `${pinData.name} ${pinData.surname || ''}`
                  : `${pinData.username}`}
              </h4>
              {pinData.followers !== '0' && pinData.followers && (
                <InteractionSummary
                  value={pinData.followers}
                  className='text-[13px] flex gap-1'
                  lang='es'
                  type='followers'
                  numberFirst
                />
              )}
            </div>
          </div>
          {pinData.user_id && !pinData.its_you && (
            <Follow
              classPropsFalseIsFollowing='bg-white border-[1px] text-black  hover:bg-transparent p-2 flex justify-center items-center '
              classPropsTrueIsFollowing='bg-black text-white  border-[1px] p-2 flex justify-center items-center'
              id={pinData.user_id}
              following={pinData.following}
            />
          )}
        </div>
        <p className='text-[13px] mt-2'>{pinData.description}</p>
      </div>
      <LabelsPin />
      <hr className='w-full h-[1px] mt-5' />
    </div>
  );
};

export default DataUserPinCard;
