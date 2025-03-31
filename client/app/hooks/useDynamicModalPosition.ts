import { useEffect, useState } from 'react';
import { useGetElementBorderDistance } from './useGetElementBorderDistance';

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
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const {
    left: btnLeft,
    top: btnTop,
    bottom: btnBottom,
    right: btnRight,
  } = useGetElementBorderDistance(btnRef);

  const calculatePosition = () => {
    if (!btnRef.current || !modalHeight || !modalWidth) return;

    const scrollY = window.scrollY;
    const viewportBottom = scrollY + window.innerHeight;
    const viewportRight = window.innerWidth;

    let x = btnLeft;
    let y = btnBottom + btnMargin;

    // Verificar si entra en la derecha
    const fitsRight = btnRight + modalWidth + padding < viewportRight;
    // Verificar si entre en la izquierda
    const fitsLeft = btnLeft - modalWidth - padding > 0;

    // Si se sale por la derecha
    if (x + modalWidth > viewportRight) {
      x = viewportRight - modalWidth - padding - 24;
    }

    // Si se sale por la izquierda
    if (x < 0) {
      x = padding;
    }

    // Si se sale por abajo
    if (y + modalHeight > viewportBottom) {
      y = btnTop - modalHeight - btnMargin;
    }

    // Si no entra ni arriba ni abajo, intenta posicionarse
    // en alguno de los lados que tenga disponible.
    if (y < scrollY + padding || y + modalHeight > viewportBottom) {
      if (fitsRight) {
        x = btnRight + btnMargin;
        y = btnTop;
      } else if (fitsLeft) {
        x = btnLeft - modalWidth - btnMargin;
        y = btnTop;
      }
    }

    setPosition({ x, y });
  };

  useEffect(() => {
    calculatePosition();
    window.addEventListener('scroll', calculatePosition);
    return () => window.removeEventListener('scroll', calculatePosition);
  }, [
    btnLeft,
    btnTop,
    btnBottom,
    btnRight,
    modalHeight,
    modalWidth,
    btnMargin,
    padding,
  ]);

  return position;
};
