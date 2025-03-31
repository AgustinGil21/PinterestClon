const UserData = () => {
  return (
    <div className='flex flex-row items-center gap-2 hover:bg-gray-200 p-1.5 rounded-lg cursor-pointer'>
      <div className='p-2 rounded-full w-[50px] h-[50px] bg-redPinterestBg text-black'></div>
      <div className='flex flex-col  text-black'>
        <strong className='text-[12px]'>Leo Messi</strong>
        <span className='text-[11px] text-gray-500'>Personal</span>
        <p className='text-[11px]  text-gray-500'>leoMessi@gmail.com</p>
      </div>
    </div>
  );
};

export default UserData;
