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
  const { setMobileSavePinController, mobileControllerPinID } = useAppsStore();
  const { handleHold, position, resetPosition } = useGetHoldPosition();
  const rotation = useGetDynamicRotation({
    position,
    height: 150,
    width: 150,
  });

  useEffect(() => {
    setMobileSavePinController(position, rotation, pinID);
    console.log(position);
  }, [position]);

  return (
    <>
      <HoldableLink
        href={href}
        onHold={handleHold}
        onCancelHold={resetPosition}
        holdTime={300}
        className={`${className} ${
          mobileControllerPinID === pinID ? 'z-[80]' : ''
        }`}
        maxWidth={768}
      >
        {children}
      </HoldableLink>
    </>
  );
};
