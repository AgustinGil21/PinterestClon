const UserData = () => {
  return (
    <div className='flex flex-row items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-900 p-1.5 rounded-lg cursor-pointer'>
      <div className='p-2 rounded-full w-[50px] h-[50px] bg-redPinterestBg text-black'></div>
      <div className='flex flex-col text-black   dark:text-white'>
        <strong className='text-[12px]'>Leo Messi</strong>
        <span className='text-[11px] text-gray-500 dark:text-white'>
          Personal
        </span>
        <p className='text-[11px]  text-gray-500 dark:text-white'>
          leoMessi@gmail.com
        </p>
      </div>
    </div>
  );
};

export default UserData;
