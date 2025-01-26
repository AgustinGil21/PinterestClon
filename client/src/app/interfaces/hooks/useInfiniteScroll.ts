import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useState } from 'react';

const useInfiniteScroll = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const { setPage } = useAppsStore();
  const handleScroll = () => {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > lastScrollTop) {
      if (
        window.innerHeight + currentScrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage(1);
      }
    }

    setLastScrollTop(currentScrollTop);
  };

  return {
    lastScrollTop,
    handleScroll,
  };
};

export default useInfiniteScroll;
