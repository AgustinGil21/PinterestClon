import { HoldableLink } from '../interfaces/layout/Header/Nav/HoldableLink';
import { useEffect } from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useGetHoldPosition } from '../hooks/useGetHoldPosition';

export const MobileSavePinButtonsController = () => {
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
      className='m-5 bg-black text-white py-2 rounded-lg px-4'
      maxWidth={768}
    >
      <span>HOLD ME!</span>
    </HoldableLink>
  );
};
