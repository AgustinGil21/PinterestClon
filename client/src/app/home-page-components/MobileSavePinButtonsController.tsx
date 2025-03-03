import { HoldableLink } from '../interfaces/layout/Header/Nav/HoldableLink';
import { useEffect } from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useGetHoldPosition } from '../hooks/useGetHoldPosition';
import { useGetDynamicRotation } from '../hooks/useGetDynamicRotation';

interface Props {
  children: React.ReactNode;
  className?: string;
  href: string;
  pinID: string;
}

export const MobileSavePinButtonsController = ({
  children,
  className,
  href,
  pinID,
}: Props) => {
  const {
    setMobileSavePinController,
    mobileControllerPinID,
    setMobileControllerBtnCenterIsHovered,
    setMobileControllerUserIsHolding,
  } = useAppsStore();
  const { handleHold, position, resetPosition } = useGetHoldPosition();
  const rotation = useGetDynamicRotation({
    position,
    height: 150,
    width: 150,
    translateX: -65,
    translateY: -130,
    headerHeight: 64,
    footerHeight: 64,
  });

  const handleCancelHold = () => {
    resetPosition();
    setMobileControllerBtnCenterIsHovered(false);
  };

  useEffect(() => {
    setMobileSavePinController(position, rotation, pinID);
  }, [position]);

  return (
    <>
      <HoldableLink
        href={href}
        onHold={handleHold}
        onCancelHold={handleCancelHold}
        holdTime={300}
        className={`${className} ${
          mobileControllerPinID === pinID ? 'z-[80]' : ''
        }`}
        maxWidth={768}
        setIsHolding={setMobileControllerUserIsHolding}
      >
        {children}
      </HoldableLink>
    </>
  );
};
