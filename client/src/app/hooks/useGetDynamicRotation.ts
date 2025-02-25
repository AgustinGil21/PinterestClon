import { useState } from 'react';
import {
  IMobileControllerButtonsTranslate,
  IPosition,
} from '../global-interfaces/global-interfaces';

interface Props {
  position: IPosition;
  width: number;
  height: number;
  padding?: number;
  setComponent?: (position: IPosition, rotation: number) => void;
  setButtonsTranslateAxis?: (
    translate: IMobileControllerButtonsTranslate
  ) => void;
}

export const useGetDynamicRotation = ({
  position,
  padding,
  height,
  width,
  setComponent,
}: Props) => {
  const [rotation, setRotation] = useState(0);
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

  // setRotation(45) - Diagonal izq
  // setRotation(90) - Lateral izq
  // setRotation(225) - Diagonal Der
  // setRotation(270) - Lateral Der
  // setRotation(0) - Centrado

  /* 0
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
    }
  */

  /* 45
  like: {
      x: -3,
      y: -7,
    },
    save: {
      x: 3,
      y: -7,
    },
    share: {
      x: 7,
      y: -3,
    },
    shareWsp: {
      x: 3,
      y: 3,
    }
  */
};
