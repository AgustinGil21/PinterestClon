import { useAppsStore } from '../../infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useGetLimit } from '../../hooks/useGetLimit';
import useInfiniteScroll from './useInfiniteScroll';

interface InterfaceUseSearch {
  getHomePins?: any;
}

const useSearchHome = ({ getHomePins }: InterfaceUseSearch) => {
  // const limit = 25;
  const limit = useGetLimit({
    parentPadding: 16,
    elementMaxWidth: 236,
    elementMinHeight: 239,
  });

  const pathname = usePathname();
  const { page, resetPage } = useAppsStore();

  useEffect(() => {
    if (page === 1) {
      return;
    }
    if (getHomePins) {
      if (pathname === '/') {
        getHomePins(page, limit);
      }
      return;
    }
  }, [page]);

  const handleSearchHome = async () => {
    resetPage();
    if (getHomePins && page === 1) {
      if (pathname === '/') {
        await getHomePins(page, limit);
      }
      return;
    }
  };

  return {
    handleSearchHome,
  };
};

export default useSearchHome;
