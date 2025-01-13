import { useEffect, useState } from 'react';
import { useGetElementBorderDistance } from './useGetElementBorderDistance';
import { isSpaceAvailable } from '../libs/isSpaceAvailable';

interface Props {
  btnRef: React.RefObject<HTMLButtonElement>;
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
    x: 0,
    y: 0,
  });

  const {
    left: btnLeft,
    top: btnTop,
    bottom: btnBottom,
    right: btnRight,
  } = useGetElementBorderDistance(btnRef);

  useEffect(() => {
    if (!btnRef.current || !modalHeight || !modalWidth) return;

    let x = btnLeft;
    let y = btnBottom + btnMargin;

    // Si se sale por la derecha. El -14 del final
    // es para contemplar el scrollbar
    if (x + modalWidth > window.innerWidth) {
      x = window.innerWidth - modalWidth - padding - 14;
    }

    // Si se sale por la izquierda
    if (x < 0) {
      x = padding;
    }

    // Si se sale por abajo
    if (y + modalHeight > window.innerHeight) {
      y = btnTop - modalHeight - btnMargin;
    }

    // Si se sale por arriba
    if (y < 0) {
      y = padding;
    }

    setPosition({ x, y });
  }, [
    btnLeft,
    btnTop,
    btnBottom,
    btnRight,
    modalHeight,
    modalWidth,
    btnMargin,
  ]);

  return position;
};
