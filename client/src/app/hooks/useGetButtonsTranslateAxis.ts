import { useEffect, useState } from 'react';
import { IMobileControllerButtonsTranslate } from '../global-interfaces/global-interfaces';

interface Props {
  rotation: number;
  setToStore: (translate: IMobileControllerButtonsTranslate) => void;
}

export const useGetButtonsTranslateAxis = ({ rotation, setToStore }: Props) => {
  const [translate, setTranslate] = useState({
    like: {
      x: -7,
      y: 0,
    },
    save: {
      x: -3,
      y: -7,
    },
    share: {
      x: 3,
      y: -7,
    },
    shareWsp: {
      x: 7,
      y: 0,
    },
  });

  // 0 deg - Centrado mirando hacía arriba
  // 45 deg - Diagonal izq.
  // 90 deg - Lateral izq.
  // 180 deg - Centrado mirando hacía abajo
  // 225 deg - Diagonal Der.
  // 270 deg - Lateral Der.

  useEffect(() => {
    let newTranslate = translate;

    if (rotation === 180) {
      newTranslate = {
        like: { x: 7, y: 0 },
        save: { x: 3, y: 7 },
        share: { x: -3, y: 7 },
        shareWsp: { x: -7, y: 0 },
      };
    } else if (rotation === 45) {
      newTranslate = {
        like: { x: -3, y: -7 },
        save: { x: 3, y: -7 },
        share: { x: 7, y: -3 },
        shareWsp: { x: 3, y: 3 },
      };
    } else if (rotation === 90) {
      newTranslate = {
        like: { x: -3, y: -3 },
        save: { x: 7, y: -3 },
        share: { x: 7, y: 2 },
        shareWsp: { x: 3, y: 7 },
      };
    } else if (rotation === 225) {
      newTranslate = {
        like: { x: 3, y: 7 },
        save: { x: -3, y: 7 },
        share: { x: -7, y: 3 },
        shareWsp: { x: -3, y: -3 },
      };
    } else if (rotation === 270) {
      newTranslate = {
        like: { x: 3, y: 3 },
        save: { x: -7, y: 3 },
        share: { x: -7, y: -2 },
        shareWsp: { x: -3, y: -7 },
      };
    } else {
      newTranslate = {
        like: { x: -7, y: 0 },
        save: { x: -3, y: -7 },
        share: { x: 3, y: -7 },
        shareWsp: { x: 7, y: 0 },
      };
    }

    setTranslate(newTranslate);
    setToStore(newTranslate);
  }, [rotation, setToStore]);

  return translate;
};
