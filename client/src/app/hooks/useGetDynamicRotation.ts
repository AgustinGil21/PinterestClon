import { useEffect, useState } from 'react';
import { IPosition } from '../global-interfaces/global-interfaces';
import { useGetScreenSize } from './useGetScreenSize';

interface Props {
  position: IPosition;
  width: number;
  height: number;
  padding?: number;
  setComponent?: (position: IPosition, rotation: number) => void;
  translateY?: number;
  translateX?: number;
  headerHeight?: number;
  footerHeight?: number;
}

export const useGetDynamicRotation = ({
  position,
  padding = 16,
  height: componentHeight,
  width: componentWidth,
  setComponent,
  translateY = 0,
  translateX = 0,
  headerHeight = 0,
  footerHeight = 0,
}: Props) => {
  const [rotation, setRotation] = useState(0);
  const { width: windowWidth, height: windowHeight } = useGetScreenSize();
  const { x: posX, y: posY } = position;

  const x = posX + translateX;
  const y = posY + translateY;

  const MARGIN_THRESHOLD = 10;

  // Corrección de cálculos:
  const componentRight = x + componentWidth;
  const componentBottom = y + componentHeight;

  const isTop = y <= padding + headerHeight + MARGIN_THRESHOLD;
  const isBottom =
    componentBottom >= windowHeight - padding - footerHeight - MARGIN_THRESHOLD;
  const isLeft = x <= padding + MARGIN_THRESHOLD;
  const isRight =
    x + componentWidth >= windowWidth - padding - MARGIN_THRESHOLD;

  const isCenterX = !isLeft && !isRight;
  const isCenterY = !isTop && !isBottom;

  const calculateRotation = (): number => {
    if (isTop && isLeft) return 90;
    if (isTop && isCenterX) return 180;
    if (isTop && isRight) return 225;
    if (isLeft && isCenterY) return 90;
    if (isRight && isCenterY) return 270;
    if (isBottom && isLeft) return 45;
    if (isBottom && isCenterX) return 0;
    if (isBottom && isRight) return 315;

    if (isRight) return 270;
    if (isLeft) return 90;
    if (isTop) return 180;
    if (isBottom) return 0;

    return 0;
  };

  useEffect(() => {
    const newRotation = calculateRotation();
    setRotation(newRotation);
    if (setComponent) setComponent(position, newRotation);
  }, [
    x,
    y,
    padding,
    componentHeight,
    componentWidth,
    position,
    translateX,
    translateY,
    headerHeight,
    footerHeight,
    windowWidth,
    windowHeight,
  ]);

  return rotation;
};
