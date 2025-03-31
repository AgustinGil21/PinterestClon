interface Props {
  ref1: React.RefObject<HTMLElement>;
  ref2: React.RefObject<HTMLElement>;
  axis: 'x' | 'y';
  variations?: number[];
}

const getElementPosition = (ref: React.RefObject<HTMLElement>) => {
  if (!ref.current) {
    return { x: 0, y: 0 };
  }

  const rect = ref.current.getBoundingClientRect();
  return { x: rect.left, y: rect.top };
};

export const getElementDistance = ({
  ref1,
  ref2,
  axis = 'x',
  variations = [],
}: Props): number => {
  const { x: ref1Left, y: ref1Top } = getElementPosition(ref1);
  const { x: ref2Left, y: ref2Top } = getElementPosition(ref2);

  if (!ref1.current || !ref2.current) {
    return 0;
  }

  let baseDistance = 0;
  if (axis.toLowerCase() === 'x') {
    baseDistance = Math.abs(ref1Left - ref2Left);
  } else if (axis.toLowerCase() === 'y') {
    baseDistance = Math.abs(ref1Top - ref2Top);
  }

  return variations.reduce(
    (total, variation) => total + variation,
    baseDistance
  );
};
