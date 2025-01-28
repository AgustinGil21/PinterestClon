'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../interfaces/components/Basic/Loader';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { Pin } from '../home-page-components/Pin';
import Masonry from '../interfaces/components/Basic/Masonry';
import AsideFilters from './AsideFilters';
import BoardsGrid from '../boards/boards-preview/BoardsGrid';
import { useSearchParams } from 'next/navigation';
import { EmptyMsg } from './EmptyMsg';
import useInfiniteScroll from '../interfaces/hooks/useInfiniteScroll';

const Search = () => {
  const {
    searchPins,
    value,
    filterState,
    searchedBoards,
    getCategoriesPin,
    isOpenFiltersModal,
  } = useAppsStore();

  const [loading, setLoading] = useState(true);
  const [valueErrorSearch, setValueErrorSearch] = useState(value);
  const searchParams = useSearchParams();
  const queryValue: string | null = searchParams.get('query');

  const { handleScroll, lastScrollTop } = useInfiniteScroll();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  useEffect(() => {
    if (queryValue) setValueErrorSearch(queryValue);
  }, [queryValue]);

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
    <section className='flex flex-col min-h-screen w-full'>
      <div className='flex flex-row'>
        <div className='flex-col hidden md:flex '>
          {isOpenFiltersModal && <AsideFilters />}
        </div>
        <div className='flex-1 mt-[50px] w-full relative'>
          <>
            {filterState === 'pines' &&
              (searchPins.length > 0 ? (
                <Masonry>
                  {searchPins.map((elem) => (
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

            {filterState === 'perfiles' &&
              (searchedBoards.length > 0 ? (
                <BoardsGrid boards={searchedBoards} />
              ) : (
                !loading && (
                  <EmptyMsg searchValue={valueErrorSearch} type='user' />
                )
              ))}
          </>
        </div>
      </div>
    </section>
  );
};
export default Search;
