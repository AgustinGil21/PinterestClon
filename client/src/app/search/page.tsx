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
import { UsersProfileSearchContainer } from './UsersProfileSearchContainer';
import { useGetLimit } from '../hooks/useGetLimit';

const Search = () => {
  const {
    searchPins,
    value,
    filterState,
    searchedBoards,
    getCategoriesPin,
    isOpenFiltersModal,
    usersProfile,
    page,
    searchUsers,
    searchBoards,
    getSearchPins,
  } = useAppsStore();

  const [loading, setLoading] = useState(true);
  const [valueErrorSearch, setValueErrorSearch] = useState(value);
  const searchParams = useSearchParams();
  const queryValue: string | null = searchParams.get('query');
  const { handleScroll, lastScrollTop } = useInfiniteScroll();

  const pinsLimit = useGetLimit({
    parentPadding: 16,
    elementMaxWidth: 236,
    elementMinHeight: 239,
  });
  const boardsLimit = useGetLimit({
    parentPadding: 16,
    elementMaxWidth: 248,
    elementMinHeight: 212,
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  useEffect(() => {
    if (page === 1) return;

    if (filterState === 'tableros') {
      searchBoards({ value: value, page: page, limit: boardsLimit });
      return;
    }

    if (filterState === 'pines') {
      getSearchPins(value, page, pinsLimit);
      return;
    }

    if (filterState === 'perfiles') {
      searchUsers({ value: value, page: page, limit: 25 });
      return;
    }
  }, [page]);

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
        <div className='flex-col  md:flex relative '>
          {isOpenFiltersModal && <AsideFilters />}
        </div>
        <div className='flex-1 mt-[70px] responsivePx:mt-[50px] w-full relative'>
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
              (usersProfile.length > 0 ? (
                <UsersProfileSearchContainer users={usersProfile} />
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
