'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../interfaces/components/Basic/Loader';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { Pin } from '../home-page-components/Pin';
import Masonry from '../interfaces/components/Basic/Masonry';
import AsideFilters from './AsideFilters';

const Search = () => {
  const {
    homePins,
    setPage,
    page,
    getSearchPinForCategory,
    value,
    getSearchPins,
    categoriesPin,
    categorySelect,
    updateDataSearch,
    getCategoriesPin,
    openFiltersModal,
    isOpenFiltersModal,
  } = useAppsStore();
  const [loading, setLoading] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const limit = 25;

  useEffect(() => {
    getCategoriesPin();
    setLoading(false);
  }, []);

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

  if (loading) {
    return (
      <section className='w-full flex justify-center '>
        <Loader />
      </section>
    );
  }

  return (
    <section className='relative flex flex-col '>
      <div className='flex flex-row '>
        <div className=' flex-col hidden md:flex'>
          {isOpenFiltersModal && <AsideFilters />}
        </div>

        <div className='flex-1 mt-[50px] '>
          <Masonry>
            {homePins.map((elem) => (
              <Pin elem={elem} key={elem.pin_id} />
            ))}
          </Masonry>
        </div>
      </div>
    </section>
  );
};

export default Search;
