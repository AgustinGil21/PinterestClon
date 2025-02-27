import { useMobileHover } from '@/app/hooks/useMobileHover';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

export const MobileControllerCenterCircle = () => {
  const { isHovered, setIsHovered } = useMobileHover(
    'controller-center-circle'
  );
  const { closeMobilePinController } = useAppsStore();

  const handleClick = () => {
    setIsHovered(false);
    closeMobilePinController();
  };

  return (
    <div
      className=' outline-3 outline outline-slate-400 min-w-[35px] min-h-[35px] w-[35px] h-[35px] rounded-full transition-opacity duration-300'
      id='controller-center-circle'
      style={{
        opacity: `${isHovered ? '0.55' : '0.4'}`,
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    ></div>
  );
};
