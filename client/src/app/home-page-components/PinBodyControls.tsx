import { PinInterface } from '../domain/types/pins-structure';
import { PinBodyControlsTop } from './PinBodyControlsTop';
import { PinBodyControlsBottom } from './PinBodyControlsBottom';

export const PinBodyControls = ({ elem }: { elem: PinInterface }) => {
  return (
    <>
      <PinBodyControlsTop elem={elem} />

      <PinBodyControlsBottom elem={elem} />
    </>
  );
};
