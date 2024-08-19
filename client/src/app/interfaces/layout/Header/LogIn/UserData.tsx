import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

const UserData = () => {
  const { user } = useAppsStore();

  return (
    <div className='flex flex-row items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-900 p-1.5 rounded-lg cursor-pointer'>
      <div
        className='p-2 rounded-full w-[50px] h-[50px] text-black flex justify-center items-center '
        style={{ backgroundColor: `${user?.avatar_background}` }}
      >
        <span
          className='text-[23px]'
          style={{ color: `${user?.avatar_letter_color}` }}
        >
          {user?.avatar_letter}
        </span>
      </div>
      <div className='flex flex-col text-black   dark:text-white'>
        <strong className='text-[12px]'>{user?.username}</strong>
        <span className='text-[11px] text-gray-500 dark:text-white'>
          Personal
        </span>
        <p className='text-[11px]  text-gray-500 dark:text-white'>
          {user?.email_address}
        </p>
      </div>
    </div>
  );
};

export default UserData;
