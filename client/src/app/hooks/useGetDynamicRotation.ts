import { useEffect, useState } from 'react';
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
}

export const useGetDynamicRotation = ({
  position,
  padding = 16,
  height,
  width,
  setComponent,
}: Props) => {
  const [rotation, setRotation] = useState(0);
  const { x, y } = position;

  const calculateRotation = (): number => {
    const isTop = y <= padding;
    const isBottom = y >= height - padding;
    const isLeft = x <= padding;
    const isRight = x >= width - padding;
    const isCenterX = x > padding && x < width - padding;
    const isCenterY = y > padding && y < height - padding;

    // Si se encuentra arriba a la izquierda

    if (isTop && isLeft) return 90;

    // Si se encuentra arriba centrado
    if (isTop && isCenterX) return 180;

    // Si se encuentra arriba a la derecha

    if (isTop && isRight) return 225;

    // Si se encuentra pegado a la izquierda,
    // pero no se esta cerca de abajo ni arriba

    if (isLeft && isCenterY) return 90;

    // Si se encuentra pegado a la derecha,
    // pero no se esta cerca de abajo ni arriba

    if (isRight && isCenterY) return 270;

    // Si se encuentra abajo a la izquierda

    if (isBottom && isLeft) return 45;

    // Si se encuentra abajo centrado

    if (isBottom && isCenterX) return 0;

    // Si se encuentra abajo a la derecha

    if (isBottom && isRight) return 225;

    return 0;
  };

  useEffect(() => {
    const newRotation = calculateRotation();
    setRotation(newRotation);
    if (setComponent) setComponent(position, rotation);
  }, [x, y, padding, height, width]);

  return rotation;
};
