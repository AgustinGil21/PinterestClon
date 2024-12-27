import { useState } from 'react';

export const useGetElementBorderDistance = (
  elementRef: React.RefObject<any>
) => {
  const [distance, setDistance] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const element = elementRef.current;

  if (!element) return distance;

  const rect = element.getBoundingClientRect();

  setDistance({
    left: rect.left,
    top: rect.top,
    bottom: rect.bottom,
    right: rect.right,
  });

  return distance;
};
