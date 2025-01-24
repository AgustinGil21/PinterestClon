'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../interfaces/components/Basic/Loader';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { Pin } from '../home-page-components/Pin';
import Masonry from '../interfaces/components/Basic/Masonry';
import AsideFilters from './AsideFilters';
import BoardsGrid from '../boards/boards-preview/BoardsGrid';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const Search = () => {
  const {
    homePins,
    setPage,
    page,
    getSearchPinForCategory,
    value,
    filterState,
    getSearchPins,
    searchedBoards,
    categorySelect,
    getCategoriesPin,
    searchBoards,
    openFiltersModal,
    isOpenFiltersModal,
  } = useAppsStore();
  const [loading, setLoading] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const pathname = usePathname();
  const [valueErrorSearch, setValueErrorSearch] = useState(value);
  const searchParams = useSearchParams();
  const queryValue: string | null = searchParams.get('query');

  useEffect(() => {
    if (queryValue) setValueErrorSearch(queryValue);
  }, [queryValue]);

  const limit = 25;

  useEffect(() => {
    console.log(page);
    if (page === 1 || value.length === 0) return;
    getSearchPins(value, page, limit);
  }, [page]);

  useEffect(() => {
    console.log(page);
    if (page === 1 || categorySelect.length === 0) return;

    getSearchPinForCategory(categorySelect, page, limit);
  }, [page, categorySelect]);

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

  useEffect(() => {
    getCategoriesPin();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section className='w-full flex justify-center '>
        <Loader />
      </section>
    );
  }

  return (
    <section className='relative flex flex-col min-h-screen '>
      <div className='flex flex-row'>
        <div className='flex-col hidden md:flex '>
          {isOpenFiltersModal && <AsideFilters />}
        </div>
        <div className='flex-1 mt-[50px]'>
          <>
            {filterState === 'pines' &&
              (homePins.length > 0 ? (
                <Masonry>
                  {homePins.map((elem) => (
                    <Pin elem={elem} key={elem.pin_id} />
                  ))}
                </Masonry>
              ) : (
                !loading && (
                  <div className='fixed top-[220px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full p-4 max-w-[700px]'>
                    <p className='text-[15px] text-black text-center'>
                      Lo sentimos, no encontramos ningún pin sobre{' '}
                      <strong className='font-semibold'>
                        {valueErrorSearch}
                      </strong>
                      . Prueba con otra búsqueda.
                    </p>
                  </div>
                )
              ))}

            {filterState === 'tableros' &&
              (searchedBoards.length > 0 ? (
                <BoardsGrid boards={searchedBoards} />
              ) : (
                !loading && (
                  <div className='fixed top-[220px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full p-4 max-w-[700px]'>
                    <p className='text-[15px] text-black text-center'>
                      Lo sentimos, no encontramos ningún tablero sobre{' '}
                      <strong className='font-semibold'>
                        {valueErrorSearch}
                      </strong>
                      . Prueba con otra búsqueda.
                    </p>
                  </div>
                )
              ))}
          </>
        </div>
      </div>
    </section>
  );
};
export default Search;
