import { useEffect, useState } from 'react';

export const useMobileIsScrolling = (
  setStopScrolling: (isScrolling: boolean) => void
) => {
  const [userIsScrolling, setUserIsScrolling] = useState(false);
  const [isTouchEnd, setIsTouchEnd] = useState(true);
  let lastY = 0;

  // Detecta si el usuario está haciendo
  // scroll
  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;

    // Detecta si hay movimiento en el eje Y
    if (Math.abs(currentY - lastY) > 5) {
      if (!userIsScrolling) {
        setUserIsScrolling(true);
      }
    }

    lastY = currentY;
  };

  // Detecta cuando el usuario levanta el dedo
  const handleTouchEnd = () => {
    // Se resetea el estado de scroll
    // después de levantar el dedo del
    // celular
    setUserIsScrolling(false);
    setIsTouchEnd(true);
  };

  useEffect(() => {
    if (!userIsScrolling && isTouchEnd) {
      setStopScrolling(true);
    } else {
      setStopScrolling(false);
    }
  }, [userIsScrolling, isTouchEnd]);

  return {
    handleTouchEnd,
    handleTouchMove,
  };
};
