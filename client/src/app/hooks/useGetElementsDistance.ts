import { useEffect, useState } from 'react';
import { useGetElementPosition } from './useGetElementPosition';
import { useGetElementSize } from './useGetElementSize';
import useGetElementStyles from './useGetElementStyle';

interface Props {
  ref1: React.RefObject<HTMLElement>;
  ref2: React.RefObject<HTMLElement>;
  axis: 'x' | 'y';
  variations?: number[];
  dependencies?: any[];
}

export const useGetElementDistance = ({
  ref1,
  ref2,
  axis = 'x',
  variations = [],
  dependencies = [],
}: Props) => {
  const [distance, setDistance] = useState(0);

  const { x: ref1Left, y: ref1Top } = useGetElementPosition(ref1);
  const { x: ref2Left, y: ref2Top } = useGetElementPosition(ref2);
  const { width: ref1Width, height: ref1Height } = useGetElementSize(ref1);
  const { width: ref2Width, height: ref2Height } = useGetElementSize(ref2);

  useEffect(() => {
    const calculateDistance = (baseDistance: number, variations: number[]) => {
      return variations.reduce(
        (total, variation) => total + variation,
        baseDistance
      );
    };

    let baseDistance = 0;

    if (axis.toLowerCase() === 'x') {
      baseDistance = Math.abs(ref1Left - ref2Left);
    } else if (axis.toLowerCase() === 'y') {
      baseDistance = Math.abs(ref1Top - ref2Top);
    }

    setDistance(calculateDistance(baseDistance, variations));
  }, [
    ref1Left,
    ref1Top,
    ref2Left,
    ref2Top,
    axis,
    variations,
    ref1Width,
    ref1Height,
    ref2Width,
    ref2Height,
    ...dependencies,
  ]);

  return distance;
};
