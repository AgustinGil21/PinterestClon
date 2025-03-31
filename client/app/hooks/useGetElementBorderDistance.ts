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
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
        right: rect.right + window.scrollX,
      });
    };

    updateDistance();
    window.addEventListener('resize', updateDistance);
    window.addEventListener('scroll', updateDistance);

    return () => {
      window.removeEventListener('resize', updateDistance);
      window.removeEventListener('scroll', updateDistance);
    };
  }, [elementRef]);

  return distance;
};
