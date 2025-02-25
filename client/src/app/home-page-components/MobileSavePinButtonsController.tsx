import { HoldableLink } from '../interfaces/layout/Header/Nav/HoldableLink';
import { useEffect } from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useGetHoldPosition } from '../hooks/useGetHoldPosition';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const MobileSavePinButtonsController = ({
  children,
  className,
}: Props) => {
  const { setMobileSavePinController } = useAppsStore();
  const { handleHold, position, resetPosition } = useGetHoldPosition(
    setMobileSavePinController
  );

  const handleHoldCancel = () => resetPosition();

  useEffect(() => {
    console.log(position);
  }, [position]);

  return (
    <HoldableLink
      href='/explore'
      onHold={handleHold}
      onCancelHold={handleHoldCancel}
      holdTime={300}
      className={`${className}`}
      maxWidth={768}
    >
      {children}
    </HoldableLink>
  );
};
