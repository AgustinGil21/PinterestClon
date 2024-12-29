import { useEffect, useState } from 'react';
import { useGetElementBorderDistance } from './useGetElementBorderDistance';
import { useGetElementSize } from './useGetElementSize';
import { isSpaceAvailable } from '../libs/is-space-available';

interface Props {
  btnRef: React.RefObject<HTMLButtonElement>;
  modalRef: React.RefObject<HTMLButtonElement>;
  parentRef?: React.RefObject<any>;
  parentPadding?: number;
  btnMargin?: number;
}

export const useDynamicModalPosition = ({
  btnRef,
  modalRef,
  parentPadding = 16,
  btnMargin = 8,
}: Props) => {
  const [position, setPosition] = useState({
    top: false,
    right: false,
    bottom: false,
    left: false,
    centerX: false,
    centerY: false,
  });

  const { width: modalWidth, height: modalHeight } =
    useGetElementSize(modalRef);

  const {
    left: btnLeft,
    top: btnTop,
    bottom: btnBottom,
    right: btnRight,
  } = useGetElementBorderDistance(btnRef);

  useEffect(() => {
    if (!btnRef.current || !modalRef.current) return;

    // El espacio disponible respecto a cada
    // lado teniendo en cuenta el padding.
    const DL = btnLeft - parentPadding; // DistanceLeft
    const DT = btnTop - parentPadding; // DistanceTop
    const DR = btnRight - parentPadding; // DistanceRight
    const DB = btnBottom - parentPadding; // DistanceBottom

    const modalW = modalWidth + btnMargin;
    const modalH = modalHeight + btnMargin;

    const newPosition = {
      top: isSpaceAvailable(DT, modalH, parentPadding),
      right: isSpaceAvailable(DR, modalW, parentPadding),
      bottom: isSpaceAvailable(DB, modalH, parentPadding),
      left: isSpaceAvailable(DL, modalW, parentPadding),
      centerX: DR < modalW && DL < modalW,
      centerY: DB < modalH && DT < modalH,
    };

    setPosition(newPosition);
  }, [
    btnLeft,
    btnTop,
    btnBottom,
    btnRight,
    modalWidth,
    modalHeight,
    parentPadding,
    btnMargin,
  ]);

  return position;
};
