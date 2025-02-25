import { HoldableLink } from '../interfaces/layout/Header/Nav/HoldableLink';
import { useEffect } from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useGetHoldPosition } from '../hooks/useGetHoldPosition';
import { useGetDynamicRotation } from '../hooks/useGetDynamicRotation';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const MobileSavePinButtonsController = ({
  children,
  className,
}: Props) => {
  const { setMobileSavePinController } = useAppsStore();
  const { handleHold, position, resetPosition } = useGetHoldPosition();
  const rotation = useGetDynamicRotation({
    position,
    height: 150,
    width: 150,
  });

  useEffect(() => {
    setMobileSavePinController(position, rotation);
  }, [position]);

  return (
    <HoldableLink
      href='/explore'
      onHold={handleHold}
      onCancelHold={resetPosition}
      holdTime={300}
      className={`${className}`}
      maxWidth={768}
    >
      {children}
    </HoldableLink>
  );
};
