import { useState } from 'react';
import { IPosition } from '../global-interfaces/global-interfaces';

export const useGetHoldPosition = (
  setToStore?: (position: IPosition) => void
) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleHold = (e: React.MouseEvent | React.TouchEvent) => {
    let x = 0,
      y = 0;

    if ('touches' in e && e.touches.length > 0) {
      // Evento para celular
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else if ('clientX' in e) {
      // Evento de mouse
      x = e.clientX;
      y = e.clientY;
    }

    setPosition({ x, y });
    if (setToStore) setToStore({ x, y });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    if (setToStore) setToStore({ x: 0, y: 0 });
  };

  return { handleHold, position, resetPosition };
};
