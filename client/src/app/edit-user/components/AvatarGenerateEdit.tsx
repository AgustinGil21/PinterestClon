import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

const AvatarGenerateEdit = () => {
  const { userSettingsEditProfile } = useAppsStore();
  return (
    <div
      className=' rounded-full w-[62px] h-[62px] flex items-center justify-center  relative overflow-hidden'
      style={{
        backgroundColor: `${userSettingsEditProfile?.avatar_background}`,
      }}
    >
      <span
        className='text-[20px]'
        style={{ color: userSettingsEditProfile?.avatar_letter_color }}
      >
        {userSettingsEditProfile?.avatar_letter}
      </span>
    </div>
  );
};

export default AvatarGenerateEdit;
