import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import Image from 'next/image';

const UserData = () => {
  const { userPublicData } = useAppsStore();

  return (
    <div className='flex flex-row items-center  hover:bg-gray-200 dark:hover:bg-gray-900 p-1 rounded-lg cursor-pointer'>
      <div
        className='p-2 rounded-full flex items-center justify-center'
        style={{ width: '67px', height: '67px' }}
      >
        {userPublicData?.avatar ? (
          <Image
            src={userPublicData?.avatar}
            alt='avatar'
            className='w-full h-full object-cover rounded-full'
            style={{ objectFit: 'cover' }}
            width={100}
            height={100}
          />
        ) : (
          <div
            className='flex justify-center items-center w-full h-full rounded-full'
            style={{ backgroundColor: `${userPublicData?.avatar_background}` }}
          >
            <span
              className='text-[18px]'
              style={{ color: `${userPublicData?.avatar_letter_color}` }}
            >
              {userPublicData?.avatar_letter}
            </span>
          </div>
        )}
      </div>

      <div className='flex flex-col text-black   dark:text-white'>
        <strong className='text-[12px]'>{userPublicData?.username}</strong>
        <span className='text-[11px] text-gray-500 dark:text-white'>
          Personal
        </span>
        <p className='text-[11px]  text-gray-500 dark:text-white'>
          {userPublicData?.email_address}
        </p>
      </div>
    </div>
  );
};

export default UserData;
