import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import Tooltip from '@/app/interfaces/components/Basic/ToolTip';

const AvatarGenerateLogIn = () => {
  const { userPublicData } = useAppsStore();
  return (
    <div
      className='text-white bg-UserBg p-3 rounded-full w-[6px] h-[6px] text-[12px] flex justify-center items-center cursor-pointer '
      style={{ backgroundColor: `${userPublicData?.avatar_background}` }}
    >
      <Tooltip tooltipText='Tu perfil'>
        <span style={{ color: `${userPublicData?.avatar_letter_color}` }}>
          {userPublicData?.avatar_letter}
        </span>
      </Tooltip>
    </div>
  );
};

export default AvatarGenerateLogIn;
