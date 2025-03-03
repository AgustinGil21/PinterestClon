import { useEffect } from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useMobileHover } from '../hooks/useMobileHover';

export const MobileControllerFilter = () => {
  const { isHovered, setIsHovered } = useMobileHover('controller-filter');
  const { closeMobilePinController, mobileControllerUserIsHolding } =
    useAppsStore();

  useEffect(() => {
    if (isHovered && !mobileControllerUserIsHolding) closeMobilePinController();
  }, [mobileControllerUserIsHolding]);

  return (
    <div
      id='controller-filter'
      className={`fixed inset-0 bg-black bg-opacity-90 z-[70] `}
      onClick={closeMobilePinController}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};
