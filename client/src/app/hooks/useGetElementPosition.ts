import { useState } from 'react';

export const useGetElementPosition = (elementRef: React.RefObject<any>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const element = elementRef.current;

  if (!element) return position;

  const rect = element.getBoundingClientRect();

  setPosition({
    x: rect.left,
    y: rect.top,
  });

  return position;
};
