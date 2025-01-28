import { PinInterface } from '../domain/types/pins-structure';
import { PinBodyControlsTop } from './PinBodyControlsTop';
import { PinBodyControlsBottom } from './PinBodyControlsBottom';

interface Props {
  elem: PinInterface;
}

export const PinBodyControls = ({ elem }: Props) => {
  return (
    <>
      <PinBodyControlsTop elem={elem} />
      <PinBodyControlsBottom elem={elem} />
    </>
  );
};
