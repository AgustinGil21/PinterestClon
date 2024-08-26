import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

const AvatarGenerateEdit = () => {
  const { userPublicData } = useAppsStore();
  return (
    <div
      className=' rounded-full w-[62px] h-[62px] flex items-center justify-center  relative overflow-hidden'
      style={{ backgroundColor: `${userPublicData?.avatar_background}` }}
    >
      <span
        className='text-[20px]'
        style={{ color: userPublicData?.avatar_letter_color }}
      >
        {userPublicData?.avatar_letter}
      </span>
    </div>
  );
};

export default AvatarGenerateEdit;
