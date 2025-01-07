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
    centerX: false,
    centerY: false,
  });

  const {
    left: btnLeft,
    top: btnTop,
    bottom: btnBottom,
    right: btnRight,
  } = useGetElementBorderDistance(btnRef);

  useEffect(() => {
    if (!btnRef.current || (!modalHeight && modalWidth)) return;

    // El espacio disponible respecto a cada
    // lado teniendo en cuenta el padding.
    const DistanceLeft = btnLeft - padding;
    const DistanceTop = btnTop - padding;
    const DistanceRight = btnRight - padding;
    const DistanceBottom = btnBottom - padding;

    const modalW = modalWidth + btnMargin;
    const modalH = modalHeight + btnMargin;

    const newPosition = {
      top: isSpaceAvailable(DistanceTop, modalH, padding),
      right: isSpaceAvailable(DistanceRight, modalW, padding),
      bottom: isSpaceAvailable(DistanceBottom, modalH, padding),
      left: isSpaceAvailable(DistanceLeft, modalW, padding),
      centerX: DistanceRight < modalW && DistanceLeft < modalW,
      centerY: DistanceBottom < modalH && DistanceTop < modalH,
    };

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
