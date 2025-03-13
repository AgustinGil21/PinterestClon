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
  pinBody?: string;
}

export const MobileSavePinButtonsController = ({
  children,
  className,
  href,
  pinID,
  pinBody,
}: Props) => {
  const {
    setMobileSavePinController,
    mobileControllerPinID,
    setMobileControllerBtnCenterIsHovered,
    setMobileControllerUserIsHolding,
    updateDataOpenBoardModal,
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

  const handleLinkHold = (e: React.MouseEvent | React.TouchEvent) => {
    handleHold(e);
    if (pinID) updateDataOpenBoardModal(pinID, pinBody);
  };

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
        onHold={handleLinkHold}
        onCancelHold={handleCancelHold}
        holdTime={400}
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
