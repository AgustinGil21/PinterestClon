import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import AvatarUser from '../Avatar/AvatarUser';
import Link from 'next/link';

interface Props {
  onClick?: () => void;
}

const UserData = ({ onClick }: Props) => {
  const { userPublicData } = useAppsStore();

  return (
    <Link href={`/${userPublicData?.username}`} onClick={onClick}>
      <div className='flex flex-row items-center  hover:bg-gray-200 dark:hover:bg-gray-900 p-1 rounded-lg cursor-pointer'>
        <div
          className='p-2 rounded-full flex items-center justify-center'
          style={{ width: '67px', height: '67px' }}
        >
          <AvatarUser
            data={userPublicData}
            classProps='w-full h-full'
            textSize='text-[18px]'
          />
        </div>

        <div className='flex flex-col text-black   dark:text-white'>
          {userPublicData?.name ? (
            <strong className='text-[12px]'>
              {`${userPublicData?.name}${' ' + userPublicData?.surname || ''}`}
            </strong>
          ) : (
            <strong className='text-[12px]'>{userPublicData?.username}</strong>
          )}
          <span className='text-[11px] text-gray-500 dark:text-white'>
            Personal
          </span>
          <p className='text-[11px]  text-gray-500 dark:text-white'>
            {userPublicData?.email_address}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserData;
