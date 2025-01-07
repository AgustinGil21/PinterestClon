import { useEffect, useState } from 'react';

export const useGetElementBorderDistance = (
  elementRef: React.RefObject<HTMLElement>
) => {
  const [distance, setDistance] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateDistance = () => {
      const rect = element.getBoundingClientRect();
      setDistance({
        left: rect.left,
        top: rect.top,
        bottom: rect.bottom,
        right: rect.right,
      });
    };

    updateDistance();

    window.addEventListener('resize', updateDistance);

    return () => {
      window.removeEventListener('resize', updateDistance);
    };
  }, [elementRef]);

  return distance;
};
