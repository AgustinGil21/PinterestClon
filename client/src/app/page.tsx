'use client';
import { useEffect, useState } from 'react';
import { useAppsStore } from './infrastructure/stores/useAppStore';
import { Pin } from './home-page-components/Pin';
import Loader from './interfaces/components/Basic/Loader';
import useInfiniteScroll from './interfaces/hooks/useInfiniteScroll';
import { usePathname } from 'next/navigation';
import useSearchHome from './interfaces/hooks/useSearchHome';
import Masonry from './interfaces/components/Basic/Masonry';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  const {
    t,
    homePins,
    getHomePins,
    previousPin,
    isHeaderLoaded,
    setIsHeaderLoaded,
    updateDataSearch,
  } = useAppsStore();

  const { handleSearchHome } = useSearchHome({ getHomePins: getHomePins });

  const { handleScroll } = useInfiniteScroll();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    updateDataSearch('filterState', 'pines');
    localStorage.removeItem('valueFilter');
  }, []);

  useEffect(() => {
    updateDataSearch('page', 1);
  }, [pathname]);

  useEffect(() => {
    if (isHeaderLoaded) {
      setIsHeaderLoaded(true);
      handleSearchHome();

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [previousPin, isHeaderLoaded]);

  if (isHeaderLoaded && isLoading) {
    return (
      <section className='w-full flex justify-center items-center flex-col my-[20px]  '>
        <div className=' max-w-[400px] flex justify-center flex-col items-center dark:text-white'>
          <Loader />
          <p className='text-center font-bold text-2xl   mt-2'>
            {t?.loading ||
              '¡Estamos agregando nuevas ideas a tu feed de inicio!'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <Masonry>
      {homePins.map((elem) => (
        <Pin elem={elem} key={elem.pin_id} />
      ))}
    </Masonry>
  );
}
