'use client';
import { Suspense, useEffect, useState } from 'react';
import { useAppsStore } from './infrastructure/stores/useAppStore';
import { Pin } from './home-page-components/Pin';
import Loader from './interfaces/components/Basic/Loader';
import { Skeleton } from './components/Basic/Skeleton';
import getDarkColor from './interfaces/helpers/getColorDark';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0); // Para rastrear la posición anterior del scroll

  const limit = 25;

  const {
    page,
    setPage,
    homePins,
    getHomePins,
    previousPin,
    isHeaderLoaded,
    setIsHeaderLoaded,
    updateDataSearch,
  } = useAppsStore();

  useEffect(() => {
    if (page === 1) return;
    updateDataSearch('page', 1);
  }, []);

  useEffect(() => {
    if (isHeaderLoaded) {
      const fetchPins = async () => {
        await getHomePins(page, limit);

        setIsHeaderLoaded(true);

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      };

      fetchPins();
    }
  }, [page, previousPin, isHeaderLoaded]);

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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  if (isHeaderLoaded && isLoading) {
    return (
      <section className='w-full flex justify-center items-center flex-col my-[20px]  '>
        <div className=' max-w-[400px] flex justify-center flex-col items-center dark:text-white'>
          <Loader />
          <p className='text-center font-bold text-2xl   mt-2'>
            ¡Estamos agregando nuevas ideas a tu feed de inicio!
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className='masonry'>
        {homePins.map((elem) => (
          <Pin elem={elem} key={elem.pin_id} />
        ))}
      </section>
    </>
  );
}
