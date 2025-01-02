import { useEffect, useState } from 'react';

export const useGetElementPosition = (
  elementRef: React.RefObject<HTMLElement>
) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = () => {
      const element = elementRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        setPosition({
          x: rect.left,
          y: rect.top,
        });
      }
    };

    updatePosition();
  }, [elementRef]);

  return position;
};
