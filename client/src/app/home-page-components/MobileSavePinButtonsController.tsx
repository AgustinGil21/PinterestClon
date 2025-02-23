import { HoldableLink } from '../interfaces/layout/Header/Nav/HoldableLink';
import { useGetHoldPosition } from '../hooks/useGetHoldPosition';

export const MobileSavePinButtonsController = () => {
  const { handleHold, position, resetPosition } = useGetHoldPosition();

  const handleHoldCancel = () => resetPosition();

  return (
    <HoldableLink
      href='/explore'
      onHold={handleHold}
      onCancelHold={handleHoldCancel}
      holdTime={300}
      className='w-[100px] h-[100px] m-5 bg-black text-white p-2'
    >
      <span>HOLD ME!</span>
    </HoldableLink>
  );
};
