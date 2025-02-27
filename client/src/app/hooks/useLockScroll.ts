import { useEffect } from 'react';

export const useLockScroll = () => {
  useEffect(() => {
    const scrollY = window.scrollY;

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    };

    const handleWheel = (e: WheelEvent) => e.preventDefault();

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      window.scrollTo(0, scrollY);

      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);
};
