import { useEffect, useState } from 'react';

export const useMobileHover = (id: string) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const { clientX, clientY } = e.touches[0];
        const element = document.elementFromPoint(clientX, clientY);

        if (element?.id === id) {
          setIsHovered(true);
        } else {
          setIsHovered(false);
        }
      }
    };

    document.addEventListener('touchmove', handleTouchMove);
    return () => document.removeEventListener('touchmove', handleTouchMove);
  }, []);

  return { isHovered, setIsHovered };
};
