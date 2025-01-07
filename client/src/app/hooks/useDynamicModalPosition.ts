import { useEffect, useState } from 'react';
import { useGetElementBorderDistance } from './useGetElementBorderDistance';
import { isSpaceAvailable } from '../libs/is-space-available';

interface Props {
  btnRef: React.RefObject<HTMLButtonElement>;
  parentRef?: React.RefObject<any>;
  padding?: number;
  btnMargin?: number;
  modalHeight: number;
  modalWidth: number;
}

export const useDynamicModalPosition = ({
  btnRef,
  padding = 16,
  btnMargin = 8,
  modalHeight,
  modalWidth,
}: Props) => {
  const [position, setPosition] = useState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  });

  const {
    left: btnLeft,
    top: btnTop,
    bottom: btnBottom,
    right: btnRight,
  } = useGetElementBorderDistance(btnRef);

  useEffect(() => {
    if (!btnRef.current || !modalHeight || !modalWidth) return;

    const DistanceLeft = btnLeft - padding;
    const DistanceTop = btnTop - padding;
    const DistanceRight = window.innerWidth - btnRight - padding;
    const DistanceBottom = window.innerHeight - btnBottom - padding;

    const modalW = modalWidth + btnMargin;
    const modalH = modalHeight + btnMargin;

    const newPosition = {
      top: isSpaceAvailable(DistanceTop, modalH, padding),
      bottom: isSpaceAvailable(DistanceBottom, modalH, padding),
      left: isSpaceAvailable(DistanceLeft, modalW, padding),
      right: isSpaceAvailable(DistanceRight, modalW, padding),
    };

    // Si ninguna posición es viable, establece una posición por defecto
    if (!Object.values(newPosition).includes(true)) {
      newPosition.bottom = true;
    }

    setPosition(newPosition);
  }, [
    btnLeft,
    btnTop,
    btnBottom,
    btnRight,
    modalWidth,
    modalHeight,
    padding,
    btnMargin,
  ]);

  return position;
};
