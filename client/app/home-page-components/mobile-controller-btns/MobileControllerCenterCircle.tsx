import { useMobileHover } from '../../hooks/useMobileHover';
import { useAppsStore } from '../../infrastructure/stores/useAppStore';
import { useEffect } from 'react';

export const MobileControllerCenterCircle = () => {
  const { isHovered, setIsHovered } = useMobileHover(
    'controller-center-circle'
  );
  const {
    closeMobilePinController,
    setMobileControllerBtnCenterIsHovered,
    mobileControllerUserIsHolding,
  } = useAppsStore();

  const handleClick = () => {
    setIsHovered(false);
    closeMobilePinController();
  };

  useEffect(() => {
    setMobileControllerBtnCenterIsHovered(isHovered);
  }, [isHovered]);

  useEffect(() => {
    if (isHovered && !mobileControllerUserIsHolding) closeMobilePinController();
  }, [mobileControllerUserIsHolding]);

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
