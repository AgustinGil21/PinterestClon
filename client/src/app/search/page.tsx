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
import { EmptyMsg } from './EmptyMsg';

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
    <section className='flex flex-col min-h-screen '>
      <div className='flex flex-row'>
        <div className='flex-col hidden md:flex '>
          {isOpenFiltersModal && <AsideFilters />}
        </div>
        <div className='flex-1 mt-[50px] w-full'>
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
                  <EmptyMsg searchValue={valueErrorSearch} type='pin' />
                )
              ))}

            {filterState === 'tableros' &&
              (searchedBoards.length > 0 ? (
                <BoardsGrid boards={searchedBoards} />
              ) : (
                !loading && (
                  <EmptyMsg searchValue={valueErrorSearch} type='board' />
                )
              ))}
          </>
        </div>
      </div>
    </section>
  );
};
export default Search;
