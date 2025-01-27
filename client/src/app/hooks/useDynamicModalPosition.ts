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

  const calculatePosition = () => {
    if (!btnRef.current || !modalHeight || !modalWidth) return;

    const scrollY = window.scrollY;
    const viewportBottom = scrollY + window.innerHeight;

    let x = btnLeft;
    let y = btnBottom + btnMargin;

    // Si se sale por la derecha
    if (x + modalWidth > window.innerWidth) {
      // Para considerar el scrollbar
      x = window.innerWidth - modalWidth - padding - 14;
    }

    // Si se sale por la izquierda
    if (x < 0) {
      x = padding;
    }

    // Si se sale por abajo
    if (y + modalHeight > viewportBottom) {
      y = btnTop - modalHeight - btnMargin;
    }

    // Si se sale por arriba o queda fuera del viewport por el scroll
    if (y < scrollY + padding) {
      y = scrollY + padding;
    }

    setPosition({ x, y });
  };

  useEffect(() => {
    // Posición inicial
    calculatePosition();

    const handleScroll = () => calculatePosition();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
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
