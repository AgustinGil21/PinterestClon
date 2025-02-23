import { HoldableLink } from '../interfaces/layout/Header/Nav/HoldableLink';

export const MobileSavePinButtonsController = () => {
  const handleHold = () => console.log('Holding');
  const handleHoldCancel = () => console.log('End');

  return (
    <HoldableLink
      href='/explore'
      onHold={handleHold}
      onCancelHold={handleHoldCancel}
      holdTime={300}
      className='w-[100px] h-[10opx] m-5 bg-black text-white p-2'
    >
      <span>HOLD ME!</span>
    </HoldableLink>
  );
};
