import { PinInterface } from '../domain/types/pins-structure';
import { PinBodyControlsTop } from './PinBodyControlsTop';
import { PinBodyControlsBottom } from './PinBodyControlsBottom';
import { useGetScreenSize } from '../hooks/useGetScreenSize';

interface Props {
  elem: PinInterface;
}

export const PinBodyControls = ({ elem }: Props) => {
  const { width } = useGetScreenSize();

  return (
    <>
      <PinBodyControlsTop elem={elem} />
      <PinBodyControlsBottom elem={elem} />
    </>
  );
};
